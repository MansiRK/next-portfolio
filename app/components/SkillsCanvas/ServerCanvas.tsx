'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ServerCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // ── Helper: tube edge ────────────────────────────────────────────
    const addEdge = (
      from: THREE.Vector3,
      to: THREE.Vector3,
      radius = 0.018,
      color = 0xffffff
    ) => {
      const dir = new THREE.Vector3().subVectors(to, from);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);

      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, len, 8),
        new THREE.MeshStandardMaterial({ color, metalness: 0.9, roughness: 0.1 })
      );
      mesh.position.copy(mid);
      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );
      group.add(mesh);

      // Glow halo
      const halo = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 3.5, radius * 3.5, len, 8),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.10,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      halo.position.copy(mid);
      halo.quaternion.copy(mesh.quaternion);
      group.add(halo);
    };

    // ── Helper: draw a box wireframe ─────────────────────────────────
    const addBox = (
      cx: number, cy: number, cz: number,
      w: number, h: number, d: number,
      r = 0.018, color = 0xffffff
    ) => {
      const x = w / 2, y = h / 2, z = d / 2;
      const v = (dx: number, dy: number, dz: number) =>
        new THREE.Vector3(cx + dx, cy + dy, cz + dz);

      const f = [v(-x,-y, z), v( x,-y, z), v( x, y, z), v(-x, y, z)];
      const b = [v(-x,-y,-z), v( x,-y,-z), v( x, y,-z), v(-x, y,-z)];

      for (let i = 0; i < 4; i++) addEdge(f[i], f[(i+1)%4], r, color);
      for (let i = 0; i < 4; i++) addEdge(b[i], b[(i+1)%4], r, color);
      for (let i = 0; i < 4; i++) addEdge(f[i], b[i], r, color);
    };

    // ── Helper: glowing LED dot ──────────────────────────────────────
    const addLED = (x: number, y: number, z: number, color: number, opacity = 0.9) => {
      const dot = new THREE.Mesh(
        new THREE.CircleGeometry(0.045, 16),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      dot.position.set(x, y, z);
      group.add(dot);

      // Glow bloom around LED
      const bloom = new THREE.Mesh(
        new THREE.CircleGeometry(0.10, 16),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      bloom.position.set(x, y, z - 0.001);
      group.add(bloom);
    };

    // ── Helper: screen panel inside a rack unit ──────────────────────
    const addPanel = (
      cx: number, cy: number, cz: number,
      w: number, h: number,
      color = 0x0a2a35,
      opacity = 0.5
    ) => {
      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          depthWrite: false,
        })
      );
      panel.position.set(cx, cy, cz);
      group.add(panel);
    };

    // ════════════════════════════════════════════════════════════════
    // SERVER RACK — outer cabinet
    // ════════════════════════════════════════════════════════════════
    const RW = 1.8;   // rack width
    const RH = 2.8;   // rack height
    const RD = 0.55;  // rack depth

    // Outer cabinet frame
    addBox(0, 0, 0, RW, RH, RD, 0.022);

    // ── Rack units (4 server slabs stacked) ─────────────────────────
    const unitH   = 0.44;   // height of one rack unit
    const unitGap = 0.06;   // gap between units
    const startY  = RH / 2 - 0.22;

    const unitColors = [0x33ddee, 0xffffff, 0x33ddee, 0xffffff];

    for (let i = 0; i < 4; i++) {
      const uy = startY - i * (unitH + unitGap);
      const uz = RD / 2 + 0.001;

      // Unit box wireframe (slightly inset)
      addBox(0, uy, 0, RW - 0.08, unitH - 0.02, RD - 0.04, 0.012);

      // Dark panel face
      addPanel(0, uy, uz, RW - 0.12, unitH - 0.06, 0x061820, 0.6);

      // LEDs on left side
      addLED(-RW / 2 + 0.18, uy + 0.06,  uz + 0.01, unitColors[i], 0.95);
      addLED(-RW / 2 + 0.18, uy - 0.06,  uz + 0.01, 0xffffff, 0.4);

      // Horizontal stripe / activity bar
      const bar = new THREE.Mesh(
        new THREE.PlaneGeometry(RW * 0.55, 0.025),
        new THREE.MeshBasicMaterial({
          color: unitColors[i],
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      bar.position.set(RW * 0.12, uy, uz + 0.01);
      group.add(bar);

      // Vent lines (small horizontal slits on right side)
      for (let v = -2; v <= 2; v++) {
        const vent = new THREE.Mesh(
          new THREE.PlaneGeometry(0.22, 0.018),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.08,
            depthWrite: false,
          })
        );
        vent.position.set(RW / 2 - 0.22, uy + v * 0.068, uz + 0.01);
        group.add(vent);
      }
    }

    // ── Middle divider strip ─────────────────────────────────────────
    const divider = new THREE.Mesh(
      new THREE.PlaneGeometry(RW - 0.08, 0.018),
      new THREE.MeshBasicMaterial({
        color: 0x33ddee,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    divider.position.set(0, 0, RD / 2 + 0.01);
    group.add(divider);

    // ── Cable management bar (bottom) ────────────────────────────────
    addEdge(
      new THREE.Vector3(-RW / 2 + 0.05, -RH / 2 + 0.12, RD / 2),
      new THREE.Vector3( RW / 2 - 0.05, -RH / 2 + 0.12, RD / 2),
      0.025
    );

    // ── Rack feet ────────────────────────────────────────────────────
    const footY = -RH / 2 - 0.08;
    [[-RW/2 + 0.12, footY], [RW/2 - 0.12, footY]].forEach(([fx, fy]) => {
      addEdge(
        new THREE.Vector3(fx as number, fy as number, -RD/2 + 0.05),
        new THREE.Vector3(fx as number, fy as number,  RD/2 - 0.05),
        0.04
      );
    });

    scene.add(group);

    // ── Lighting ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const pl1 = new THREE.PointLight(0xffffff, 4, 20);
    pl1.position.set(4, 4, 4);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x88ccff, 2, 20);
    pl2.position.set(-3, -2, 3);
    scene.add(pl2);

    // ── Floating animation ────────────────────────────────────────────
    let animationId: number;
    let t = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      t += 0.012;
      group.position.y  = Math.sin(t) * 0.10;
      group.rotation.y  = Math.sin(t * 0.6) * 0.28;
      group.rotation.x  = Math.sin(t * 0.4) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '220px',
        pointerEvents: 'none',
      }}
    />
  );
}