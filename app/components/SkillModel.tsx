"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

type Props = {
  type: "frontend" | "backend" | "database" | "tools"
}

const SkillModel = ({ type }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1.5, 4)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    )
    mountRef.current.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.8))

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    let model: THREE.Mesh

    // 🔹 MODEL SELECTION
    switch (type) {
      case "frontend":
        model = new THREE.Mesh(
          new THREE.BoxGeometry(2.5, 0.15, 1.5), // laptop base
          new THREE.MeshStandardMaterial({ color: "#7c7cff" })
        )
        break

      case "backend":
        model = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 2.5, 1),
          new THREE.MeshStandardMaterial({ color: "#5c5cff" })
        )
        break

      case "database":
        model = new THREE.Mesh(
          new THREE.CylinderGeometry(1, 1, 1.2, 32),
          new THREE.MeshStandardMaterial({ color: "#3c3cff" })
        )
        break

      case "tools":
        model = new THREE.Mesh(
          new THREE.TorusGeometry(0.8, 0.3, 16, 100),
          new THREE.MeshStandardMaterial({ color: "#9c7cff" })
        )
        break
    }

    scene.add(model)

    const animate = () => {
      model.rotation.y += 0.01
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [type])

  return <div ref={mountRef} className="w-[250px] h-[250px]" />
}

export default SkillModel
