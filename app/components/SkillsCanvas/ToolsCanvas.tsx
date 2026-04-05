'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ToolsCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    // Camera straight ahead — gear will face us flat
    camera.position.set(0, 0, 6);

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

    // Ring on XY plane (vertical, faces camera)
    const addRingXY = (r: number, segments = 48, radius = 0.018) => {
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        addEdge(
          new THREE.Vector3(Math.cos(a1) * r, Math.sin(a1) * r, 0),
          new THREE.Vector3(Math.cos(a2) * r, Math.sin(a2) * r, 0),
          radius
        );
      }
    };

    // Solid disc to hide inside
    const addSolidDisc = (r: number, z: number, color = 0x040e14) => {
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(r, 64),
        new THREE.MeshBasicMaterial({ color, depthWrite: true, side: THREE.DoubleSide })
      );
      disc.position.z = z;
      group.add(disc);
    };

    // Solid ring (donut) to hide body interior
    const addSolidRing = (innerR: number, outerR: number, z: number) => {
      const geo = new THREE.RingGeometry(innerR, outerR, 64);
      const mat = new THREE.MeshBasicMaterial({ color: 0x040e14, depthWrite: true, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = z;
      group.add(mesh);
    };

    const innerR  = 0.42;
    const outerR  = 1.05;
    const toothR  = 1.40;
    const teeth   = 10;
    const depth   = 0.32;
    const half    = depth / 2;
    const toothW  = (Math.PI * 2 / teeth) * 0.42;

    // ── Solid fills first (behind wires) ─────────────────────────
    addSolidRing(innerR * 0.40, outerR * 0.99,  half + 0.001);  // front face body
    addSolidRing(innerR * 0.40, outerR * 0.99, -half - 0.001);  // back face body
    addSolidDisc(innerR * 0.38, half + 0.001);                   // front hub fill
    addSolidDisc(innerR * 0.38, -half - 0.001);                  // back hub fill

    // Tooth solid fills
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const aL = a - toothW;
      const aR = a + toothW;
      // Front tooth face
      const shape = new THREE.Shape();
      shape.moveTo(Math.cos(aL) * outerR, Math.sin(aL) * outerR);
      shape.lineTo(Math.cos(aL) * toothR, Math.sin(aL) * toothR);
      shape.lineTo(Math.cos(aR) * toothR, Math.sin(aR) * toothR);
      shape.lineTo(Math.cos(aR) * outerR, Math.sin(aR) * outerR);
      shape.closePath();
      const geo = new THREE.ShapeGeometry(shape);
      const frontTooth = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x040e14, depthWrite: true }));
      frontTooth.position.z = half + 0.001;
      group.add(frontTooth);
      const backTooth = frontTooth.clone();
      backTooth.position.z = -half - 0.001;
      group.add(backTooth);

      // Tooth side wall (depth)
      const pts = [
        new THREE.Vector3(Math.cos(aL) * outerR, Math.sin(aL) * outerR,  half),
        new THREE.Vector3(Math.cos(aL) * toothR, Math.sin(aL) * toothR,  half),
        new THREE.Vector3(Math.cos(aL) * toothR, Math.sin(aL) * toothR, -half),
        new THREE.Vector3(Math.cos(aL) * outerR, Math.sin(aL) * outerR, -half),
      ];
      addEdge(pts[0], pts[1], 0.014);
      addEdge(pts[1], pts[2], 0.014);
      addEdge(pts[2], pts[3], 0.014);

      const pts2 = [
        new THREE.Vector3(Math.cos(aR) * outerR, Math.sin(aR) * outerR,  half),
        new THREE.Vector3(Math.cos(aR) * toothR, Math.sin(aR) * toothR,  half),
        new THREE.Vector3(Math.cos(aR) * toothR, Math.sin(aR) * toothR, -half),
        new THREE.Vector3(Math.cos(aR) * outerR, Math.sin(aR) * outerR, -half),
      ];
      addEdge(pts2[0], pts2[1], 0.014);
      addEdge(pts2[1], pts2[2], 0.014);
      addEdge(pts2[2], pts2[3], 0.014);

      // Tooth tip wall
      addEdge(
        new THREE.Vector3(Math.cos(aL) * toothR, Math.sin(aL) * toothR,  half),
        new THREE.Vector3(Math.cos(aR) * toothR, Math.sin(aR) * toothR,  half),
        0.016
      );
      addEdge(
        new THREE.Vector3(Math.cos(aL) * toothR, Math.sin(aL) * toothR, -half),
        new THREE.Vector3(Math.cos(aR) * toothR, Math.sin(aR) * toothR, -half),
        0.016
      );
      addEdge(
        new THREE.Vector3(Math.cos(aL) * toothR, Math.sin(aL) * toothR,  half),
        new THREE.Vector3(Math.cos(aL) * toothR, Math.sin(aL) * toothR, -half),
        0.014
      );
      addEdge(
        new THREE.Vector3(Math.cos(aR) * toothR, Math.sin(aR) * toothR,  half),
        new THREE.Vector3(Math.cos(aR) * toothR, Math.sin(aR) * toothR, -half),
        0.014
      );
    }

    // ── Wire outlines on top ──────────────────────────────────────
    addRingXY(outerR, 48, 0.018);   // outer ring front
    addRingXY(outerR, 48, 0.018);   // (same, back handled by depth edges)
    addRingXY(innerR, 32, 0.014);   // inner ring
    addRingXY(innerR * 0.38, 24, 0.014); // hub hole

    // Depth edges on outer ring
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      addEdge(
        new THREE.Vector3(Math.cos(a) * outerR, Math.sin(a) * outerR,  half),
        new THREE.Vector3(Math.cos(a) * outerR, Math.sin(a) * outerR, -half),
        0.013
      );
    }

    // Hub depth edges
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const hr = innerR * 0.38;
      addEdge(
        new THREE.Vector3(Math.cos(a) * hr, Math.sin(a) * hr,  half),
        new THREE.Vector3(Math.cos(a) * hr, Math.sin(a) * hr, -half),
        0.012
      );
    }

    // Spokes
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const hr = innerR * 0.38;
      addEdge(
        new THREE.Vector3(Math.cos(a) * hr, Math.sin(a) * hr, half + 0.001),
        new THREE.Vector3(Math.cos(a) * outerR, Math.sin(a) * outerR, half + 0.001),
        0.013
      );
      addEdge(
        new THREE.Vector3(Math.cos(a) * hr, Math.sin(a) * hr, -half - 0.001),
        new THREE.Vector3(Math.cos(a) * outerR, Math.sin(a) * outerR, -half - 0.001),
        0.013
      );
      addEdge(
        new THREE.Vector3(Math.cos(a) * (hr + outerR) / 2, Math.sin(a) * (hr + outerR) / 2,  half),
        new THREE.Vector3(Math.cos(a) * (hr + outerR) / 2, Math.sin(a) * (hr + outerR) / 2, -half),
        0.013
      );
    }

    // Hub center glow
    const hubGlow = new THREE.Mesh(
      new THREE.CircleGeometry(innerR * 0.35, 32),
      new THREE.MeshBasicMaterial({ color: 0x33ddee, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    hubGlow.position.z = half + 0.02;
    group.add(hubGlow);

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
      t += 0.010;
      group.position.y = Math.sin(t) * 0.10;
      group.rotation.z += 0.006;                    // spin in place vertically
      group.rotation.x = Math.sin(t * 0.5) * 0.20; // gentle tilt forward/back
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