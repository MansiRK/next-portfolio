'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DatabaseCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.8, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const addEdge = (from: THREE.Vector3, to: THREE.Vector3, radius = 0.018, color = 0xffffff) => {
      const dir = new THREE.Vector3().subVectors(to, from);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, len, 8),
        new THREE.MeshStandardMaterial({ color, metalness: 0.9, roughness: 0.1 })
      );
      mesh.position.copy(mid);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      group.add(mesh);
      const halo = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 3.5, radius * 3.5, len, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.10, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      halo.position.copy(mid);
      halo.quaternion.copy(mesh.quaternion);
      group.add(halo);
    };

    const addEllipse = (cy: number, rx: number, rz: number, segments = 48, r = 0.020) => {
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        addEdge(
          new THREE.Vector3(Math.cos(a1) * rx, cy, Math.sin(a1) * rz),
          new THREE.Vector3(Math.cos(a2) * rx, cy, Math.sin(a2) * rz),
          r
        );
      }
    };

    const addColumns = (topY: number, botY: number, rx: number, rz: number, count = 16) => {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        addEdge(
          new THREE.Vector3(Math.cos(a) * rx, topY, Math.sin(a) * rz),
          new THREE.Vector3(Math.cos(a) * rx, botY, Math.sin(a) * rz),
          0.014
        );
      }
    };

    const RX = 1.1, RZ = 0.42, CH = 0.60, GAP = 0.06;
    const TOTAL = 3 * CH + 2 * GAP;
    const BASE_Y = -TOTAL / 2;

    for (let i = 0; i < 3; i++) {
      const botY = BASE_Y + i * (CH + GAP);
      const topY = botY + CH;
      const midY = (topY + botY) / 2;

      // ── Solid body first (renders behind wires) ───────────────────
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(RX * 0.97, RX * 0.97, CH, 48, 1, true),
        new THREE.MeshBasicMaterial({ color: 0x040e14, side: THREE.FrontSide, depthWrite: true })
      );
      body.scale.set(1, 1, RZ / RX);
      body.position.set(0, midY, 0);
      group.add(body);

      // ── Solid top cap ─────────────────────────────────────────────
      const topCap = new THREE.Mesh(
        new THREE.CircleGeometry(RX * 0.97, 48),
        new THREE.MeshBasicMaterial({ color: 0x040e14, depthWrite: true, side: THREE.FrontSide })
      );
      topCap.rotation.x = -Math.PI / 2;
      topCap.scale.set(1, RZ / RX, 1);
      topCap.position.set(0, topY + 0.001, 0);
      group.add(topCap);

      // ── Solid bottom cap ──────────────────────────────────────────
      const botCap = new THREE.Mesh(
        new THREE.CircleGeometry(RX * 0.97, 48),
        new THREE.MeshBasicMaterial({ color: 0x040e14, depthWrite: true, side: THREE.BackSide })
      );
      botCap.rotation.x = -Math.PI / 2;
      botCap.scale.set(1, RZ / RX, 1);
      botCap.position.set(0, botY - 0.001, 0);
      group.add(botCap);

      // ── Wire edges on top ─────────────────────────────────────────
      addEllipse(topY, RX, RZ, 48, 0.022);
      addEllipse(botY, RX, RZ, 48, 0.016);
      addColumns(topY, botY, RX, RZ, 16);
      addEllipse(midY, RX, RZ, 48, 0.012);

      // Top glow disc
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(RX * 0.82, 48),
        new THREE.MeshBasicMaterial({ color: 0x33ddee, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.y = topY + 0.01;
      group.add(disc);

      // LED dot
      const led = new THREE.Mesh(
        new THREE.CircleGeometry(0.055, 16),
        new THREE.MeshBasicMaterial({ color: i === 1 ? 0xffffff : 0x33ddee, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      led.position.set(-RX * 0.72, midY, RZ + 0.02);
      group.add(led);

      const bloom = new THREE.Mesh(
        new THREE.CircleGeometry(0.13, 16),
        new THREE.MeshBasicMaterial({ color: i === 1 ? 0xffffff : 0x33ddee, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      bloom.position.set(-RX * 0.72, midY, RZ + 0.015);
      group.add(bloom);
    }

    // Connecting pipes
    for (let i = 0; i < 2; i++) {
      const y1 = BASE_Y + i * (CH + GAP) + CH;
      const y2 = y1 + GAP;
      addEdge(new THREE.Vector3(0, y1, 0), new THREE.Vector3(0, y2, 0), 0.04);
    }

    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const pl1 = new THREE.PointLight(0xffffff, 4, 20);
    pl1.position.set(4, 4, 4);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x88ccff, 2, 20);
    pl2.position.set(-3, -2, 3);
    scene.add(pl2);

    let animationId: number;
    let t = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      t += 0.012;
      group.position.y = Math.sin(t) * 0.10;
      group.rotation.y = Math.sin(t * 0.6) * 0.28;
      group.rotation.x = Math.sin(t * 0.4) * 0.05;
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

  return <div ref={mountRef} style={{ width: '100%', height: '220px', pointerEvents: 'none' }} />;
}