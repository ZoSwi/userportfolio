import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Smooth easing functions
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (start, end, factor) => start + (end - start) * factor;

const ThreeDBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const cubesRef = useRef([]);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const deltaTimeRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x050812, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6b9fff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6b9fff, 1.2);
    pointLight1.position.set(50, 50, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x5a8ae6, 0.8);
    pointLight2.position.set(-50, -50, -50);
    scene.add(pointLight2);

    // Create Tech-Inspired Geometric Shapes (Mix of cubes, toruses, and dodecahedrons)
    const createTechShape = (x, y, z, shapeType, speed) => {
      let geometry;

      // Create varied geometric shapes for visual interest
      switch (shapeType) {
        case 'torus':
          geometry = new THREE.TorusGeometry(2, 0.6, 12, 24);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(2.2, 0);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(2.5, 0);
          break;
        case 'wireframe-cube':
          geometry = new THREE.BoxGeometry(3.5, 3.5, 3.5);
          break;
        default:
          geometry = new THREE.BoxGeometry(3, 3, 3);
      }

      const material = new THREE.MeshStandardMaterial({
        color: 0x6b9fff,
        emissive: 0x4a73d9,
        metalness: 0.7,
        roughness: 0.25,
        wireframe: shapeType === 'wireframe-cube',
        transparent: true,
        opacity: shapeType === 'wireframe-cube' ? 0.6 : 1,
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(x, y, z);
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shape.userData = {
        initialPosition: { x, y, z },
        shapeType,
        speed: speed || 0.003,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.01,
        },
        bobSpeed: Math.random() * 0.0025 + 0.0012,
        pulseTime: Math.random() * Math.PI * 2,
        isHovered: false,
        targetScale: 1,
        orbitRadius: Math.random() * 12 + 8,
        orbitSpeed: Math.random() * 0.00025 + 0.0001,
        orbitAngle: Math.random() * Math.PI * 2,
      };

      scene.add(shape);
      cubesRef.current.push(shape);
    };

    // Create Diverse Tech Shapes (professional tech aesthetic)
    createTechShape(-22, 18, -32, 'torus', 0.0038);
    createTechShape(24, -12, -28, 'dodecahedron', 0.0042);
    createTechShape(-5, 22, -42, 'octahedron', 0.0035);
    createTechShape(-28, -18, -38, 'wireframe-cube', 0.004);
    createTechShape(28, 12, -34, 'torus', 0.0036);
    createTechShape(-12, -22, -48, 'dodecahedron', 0.0044);
    createTechShape(16, 8, -52, 'octahedron', 0.0032);
    createTechShape(-18, 28, -58, 'wireframe-cube', 0.0038);
    createTechShape(20, -5, -45, 'torus', 0.004);

    // Create Particle System (Tech Sparkles)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 200;
      positionArray[i + 1] = (Math.random() - 0.5) * 200;
      positionArray[i + 2] = (Math.random() - 0.5) * 200;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8cb5ff,
      size: 0.5,
      sizeAttenuation: true,
      opacity: 0.6,
      transparent: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current.push(particles);

    // Create Grid Background
    const gridHelper = new THREE.GridHelper(200, 40, 0x6b9fff, 0x1a2540);
    gridHelper.position.z = -80;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.05;
    scene.add(gridHelper);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Delta time for smooth frame-independent animation
      const now = Date.now();
      deltaTimeRef.current = (now - lastTimeRef.current) / 16.67; // 60fps baseline
      lastTimeRef.current = now;
      const dt = Math.min(deltaTimeRef.current, 2); // Clamp delta time

      // Smooth mouse lerp
      mouseRef.current.x = lerp(
        mouseRef.current.x,
        mouseRef.current.targetX,
        easeInOutCubic(Math.min(0.15, dt / 10))
      );
      mouseRef.current.y = lerp(
        mouseRef.current.y,
        mouseRef.current.targetY,
        easeInOutCubic(Math.min(0.15, dt / 10))
      );

      // Update tech shapes with smooth, professional animations
      cubesRef.current.forEach((shape) => {
        // Dynamic rotation speed based on shape type
        const rotationMultiplier = shape.userData.shapeType === 'torus' ? 1.2 :
                                   shape.userData.shapeType === 'wireframe-cube' ? 0.8 : 1;

        shape.rotation.x += shape.userData.rotationSpeed.x * dt * rotationMultiplier;
        shape.rotation.y += shape.userData.rotationSpeed.y * dt * rotationMultiplier;
        shape.rotation.z += shape.userData.rotationSpeed.z * dt * rotationMultiplier;

        // Orbital motion with depth-based parallax
        shape.userData.orbitAngle += shape.userData.orbitSpeed * dt;
        const orbitalX = Math.cos(shape.userData.orbitAngle) * shape.userData.orbitRadius;
        const orbitalY = Math.sin(shape.userData.orbitAngle) * shape.userData.orbitRadius * 0.4;

        // Sophisticated floating motion with varied patterns
        const bobOffset = Math.sin(now * shape.userData.bobSpeed) * 4;
        const secondaryBob = Math.cos(now * shape.userData.bobSpeed * 0.7) * 2;
        const scrollInfluence = -scrollRef.current * 0.06;

        // Depth-based motion for parallax effect
        const depthFactor = (shape.userData.initialPosition.z + 60) / 60;
        const targetX = shape.userData.initialPosition.x + orbitalX +
                       Math.sin(now * 0.0002) * 2.5 * depthFactor;
        const targetY = shape.userData.initialPosition.y + bobOffset + secondaryBob +
                       orbitalY + scrollInfluence * depthFactor;
        const targetZ = shape.userData.initialPosition.z +
                       Math.cos(now * 0.00015) * 1.5;

        shape.position.x = lerp(shape.position.x, targetX, 0.1 * dt);
        shape.position.y = lerp(shape.position.y, targetY, 0.1 * dt);
        shape.position.z = lerp(shape.position.z, targetZ, 0.1 * dt);

        // Professional scale animation
        const hoverScale = shape.userData.isHovered ? 1.2 : 1;
        shape.scale.x = lerp(shape.scale.x, hoverScale, 0.12 * dt);
        shape.scale.y = lerp(shape.scale.y, hoverScale, 0.12 * dt);
        shape.scale.z = lerp(shape.scale.z, hoverScale, 0.12 * dt);

        // Sophisticated glow with color shift on hover
        const baseEmissive = 0x4a73d9;
        const hoverEmissive = 0x7ea2ff;
        const targetEmissive = shape.userData.isHovered ? hoverEmissive : baseEmissive;

        shape.material.emissive.setHex(targetEmissive);

        // Subtle pulsing for visual interest
        shape.userData.pulseTime += 0.008 * dt;
        const pulseIntensity = 0.5 + Math.sin(shape.userData.pulseTime) * 0.25;
        shape.material.emissiveIntensity = pulseIntensity;

        // Gentle mouse proximity effect
        const distToMouse = Math.sqrt(
          Math.pow(mouseRef.current.x - shape.position.x, 2) +
          Math.pow(mouseRef.current.y - shape.position.y, 2)
        );
        if (distToMouse < 80) {
          const force = (80 - distToMouse) / 80;
          shape.position.x += (shape.position.x - mouseRef.current.x) * force * 0.015;
          shape.position.y += (shape.position.y - mouseRef.current.y) * force * 0.015;
        }
      });

      // Animate particles with wave effect
      if (particlesRef.current[0]) {
        particlesRef.current[0].rotation.x += 0.00008 * dt;
        particlesRef.current[0].rotation.y += 0.00016 * dt;

        const positions = particlesRef.current[0].geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          // Smooth downward motion
          positions[i + 1] -= 0.04 * dt;

          // Wave effect
          positions[i] += Math.sin(now * 0.0003 + i) * 0.02 * dt;

          if (positions[i + 1] < -100) {
            positions[i + 1] = 100;
            positions[i] = (Math.random() - 0.5) * 200;
            positions[i + 2] = (Math.random() - 0.5) * 200;
          }
        }
        particlesRef.current[0].geometry.attributes.position.needsUpdate = true;
      }

      // Smooth camera movement with lerp
      const targetCameraY = scrollRef.current * 0.4;
      const targetCameraX = Math.sin(scrollRef.current * 0.008) * 8;
      camera.position.y = lerp(camera.position.y, targetCameraY, 0.1 * dt);
      camera.position.x = lerp(camera.position.x, targetCameraX, 0.1 * dt);

      // Dynamic lighting based on scroll
      const lightIntensity = 0.6 + Math.sin(now * 0.0005) * 0.3;
      scene.getObjectByProperty("type", "Light")?.forEach((light) => {
        if (light instanceof THREE.PointLight) {
          light.intensity = lightIntensity;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle Scroll
    const handleScroll = () => {
      scrollRef.current =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    };

    // Handle Mouse Movement
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 100 - 50;
      mouseRef.current.targetY = (event.clientY / window.innerHeight) * 100 - 50;
    };

    // Handle Mouse Over Cubes (Ray casting)
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2();

    const handleMouseOverScene = (event) => {
      mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse2D, camera);
      const intersects = raycaster.intersectObjects(cubesRef.current);

      // Reset all cubes
      cubesRef.current.forEach((cube) => {
        cube.userData.isHovered = false;
        cube.userData.targetScale = 1;
      });

      // Hover on intersected cubes
      if (intersects.length > 0) {
        intersects[0].object.userData.isHovered = true;
        intersects[0].object.userData.targetScale = 1.15;
      }
    };

    // Handle Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleMouseOverScene);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseOverScene);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      cubesRef.current.forEach((cube) => {
        cube.geometry.dispose();
        cube.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeDBackground;
