import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const EnhancedThreeDScene = ({ width = 400, height = 300 }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050812, 0.1);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6b9fff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6b9fff, 1.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create Rotating Code Block (3D Text-like shape)
    const createCodeBlock = () => {
      const group = new THREE.Group();

      // Create 3D bars to represent code lines
      const barGeometry = new THREE.BoxGeometry(8, 0.3, 0.3);
      const barMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b9fff,
        emissive: 0x3d5a99,
        metalness: 0.6,
        roughness: 0.3,
      });

      const bar1 = new THREE.Mesh(barGeometry, barMaterial);
      bar1.position.y = 3;
      group.add(bar1);

      const bar2 = new THREE.Mesh(barGeometry, barMaterial);
      bar2.position.y = 1;
      bar2.scale.x = 0.7;
      group.add(bar2);

      const bar3 = new THREE.Mesh(barGeometry, barMaterial);
      bar3.position.y = -1;
      bar3.scale.x = 0.9;
      group.add(bar3);

      const bar4 = new THREE.Mesh(barGeometry, barMaterial);
      bar4.position.y = -3;
      bar4.scale.x = 0.6;
      group.add(bar4);

      // Add floating particles around code block
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 20;
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
      }

      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x8cb5ff,
        size: 0.3,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      group.add(particles);

      return group;
    };

    const codeBlock = createCodeBlock();
    scene.add(codeBlock);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate code block
      codeBlock.rotation.x += 0.005;
      codeBlock.rotation.y += 0.008;
      codeBlock.rotation.z += 0.003;

      // Gentle bob motion
      codeBlock.position.y = Math.sin(Date.now() * 0.0005) * 2;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(107, 159, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(107, 159, 255, 0.1)",
      }}
    />
  );
};

export default EnhancedThreeDScene;
