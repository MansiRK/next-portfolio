'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const icoGeo = new THREE.IcosahedronGeometry(1.8, 0);
    const edgesGeo = new THREE.EdgesGeometry(icoGeo);
    const positions = edgesGeo.attributes.position;

    const group = new THREE.Group();

    for (let i = 0; i < positions.count; i += 2) {
      const start = new THREE.Vector3(
        positions.getX(i),     positions.getY(i),     positions.getZ(i)
      );
      const end = new THREE.Vector3(
        positions.getX(i + 1), positions.getY(i + 1), positions.getZ(i + 1)
      );

      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();
      const midpoint = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);

      const axis = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(
        axis,
        direction.clone().normalize()
      );

      // 1. Wide subtle teal halo
      const halo = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, length, 8),
        new THREE.MeshBasicMaterial({
          color: '#ffffff',
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      halo.position.copy(midpoint);
      halo.quaternion.copy(quat);
      group.add(halo);

      // 2. Mid teal glow
      const midGlow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.028, 0.028, length, 8),
        new THREE.MeshBasicMaterial({
          color: '#ffffff',
          transparent: true,
          opacity: 0.20,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      midGlow.position.copy(midpoint);
      midGlow.quaternion.copy(quat);
      group.add(midGlow);

      // 3. Thin dark slate outer shell — main visible line
      const outer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, length, 8),
        new THREE.MeshStandardMaterial({
          color: 0x3a7a8a,
          metalness: 0.9,
          roughness: 0.1,
        })
      );
      outer.position.copy(midpoint);
      outer.quaternion.copy(quat);
      group.add(outer);

      // 4. Very thin soft white-teal core
      const core = new THREE.Mesh(
        new THREE.CylinderGeometry(0.004, 0.004, length, 8),
        new THREE.MeshBasicMaterial({
          color: '#ffffff',
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      core.position.copy(midpoint);
      core.quaternion.copy(quat);
      group.add(core);
    }

    scene.add(group);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x88ccff, 4, 20);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 3, 20);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    camera.position.z = 5;

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      group.rotation.x += 0.003;
      group.rotation.y += 0.005;
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
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: '0',
        right: '2%',
        width: 'clamp(380px, 35vw, 560px)',
        height: 'clamp(380px, 35vw, 560px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}