'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DesktopCanvas() {
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

    // ── Helper: make a tube edge between two points ──────────────────
    const addEdge = (
      from: THREE.Vector3,
      to: THREE.Vector3,
      radius = 0.018,
      color = 0xffffff
    ) => {
      const dir = new THREE.Vector3().subVectors(to, from);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const geo = new THREE.CylinderGeometry(radius, radius, len, 8);
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.9,
        roughness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(mid);
      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );
      group.add(mesh);

      // Glow halo
      const haloGeo = new THREE.CylinderGeometry(radius * 3.5, radius * 3.5, len, 8);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.10,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(mid);
      halo.quaternion.copy(mesh.quaternion);
      group.add(halo);
    };

    // ── Monitor screen frame ─────────────────────────────────────────
    // Front face corners  (x, y, z)
    const W = 2.2, H = 1.5, D = 0.12;
    const fl = [
      new THREE.Vector3(-W, -H, D),
      new THREE.Vector3( W, -H, D),
      new THREE.Vector3( W,  H, D),
      new THREE.Vector3(-W,  H, D),
    ];
    const bl = [
      new THREE.Vector3(-W, -H, -D),
      new THREE.Vector3( W, -H, -D),
      new THREE.Vector3( W,  H, -D),
      new THREE.Vector3(-W,  H, -D),
    ];
    // Front rectangle
    for (let i = 0; i < 4; i++) addEdge(fl[i], fl[(i + 1) % 4]);
    // Back rectangle
    for (let i = 0; i < 4; i++) addEdge(bl[i], bl[(i + 1) % 4]);
    // Connecting edges
    for (let i = 0; i < 4; i++) addEdge(fl[i], bl[i]);

    // ── Screen inner glow panel ───────────────────────────────────────
    const screenGeo = new THREE.PlaneGeometry(W * 1.7, H * 1.65);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x0a2a35,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0, D + 0.01);
    group.add(screen);

    // Screen scanlines effect (thin horizontal strips)
    for (let i = -6; i <= 6; i++) {
      const lineGeo = new THREE.PlaneGeometry(W * 1.68, 0.03);
      const lineMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.set(0, i * 0.22, D + 0.02);
      group.add(line);
    }

    // Screen center glow dot
    const dotGeo = new THREE.CircleGeometry(0.18, 32);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0x33ddee,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(0, 0, D + 0.02);
    group.add(dot);

    // ── Stand neck ────────────────────────────────────────────────────
    const neckBot = new THREE.Vector3(0, -H - 0.6, 0);
    const neckTop = new THREE.Vector3(0, -H,       0);
    addEdge(neckBot, neckTop, 0.045);

    // ── Stand base ────────────────────────────────────────────────────
    const baseL = new THREE.Vector3(-0.9, -H - 0.62, 0);
    const baseR = new THREE.Vector3( 0.9, -H - 0.62, 0);
    addEdge(baseL, baseR, 0.035);

    // Base front/back depth
    const baseFrontL = new THREE.Vector3(-0.9, -H - 0.62,  0.3);
    const baseFrontR = new THREE.Vector3( 0.9, -H - 0.62,  0.3);
    const baseBackL  = new THREE.Vector3(-0.9, -H - 0.62, -0.3);
    const baseBackR  = new THREE.Vector3( 0.9, -H - 0.62, -0.3);
    addEdge(baseFrontL, baseFrontR, 0.025);
    addEdge(baseBackL,  baseBackR,  0.025);
    addEdge(baseFrontL, baseBackL,  0.025);
    addEdge(baseFrontR, baseBackR,  0.025);

    scene.add(group);

    // ── Lighting ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const pl1 = new THREE.PointLight(0xffffff, 4, 20);
    pl1.position.set(4, 4, 4);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xffffff, 2, 20);
    pl2.position.set(-3, -2, 3);
    scene.add(pl2);

    // ── Floating animation ────────────────────────────────────────────
    let animationId: number;
    let t = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      t += 0.012;

      // Gentle float up/down
      group.position.y = Math.sin(t) * 0.12;

      // Slow Y rotation (left-right sway)
      group.rotation.y = Math.sin(t * 0.6) * 0.25;

      // Very slight tilt
      group.rotation.x = Math.sin(t * 0.4) * 0.06;

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