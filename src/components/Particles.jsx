import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";

extend({ PointsMaterial: THREE.PointsMaterial });

const baseColor = new THREE.Color(0x0099ff);
const highlightColor = new THREE.Color(0x00ffff);
const glowDistance = 3;

export default function Particles({ mouse }) {
  const pointsRef = useRef();
  const { raycaster, camera, size, gl } = useThree();

  // Initial particles state
  const [particles, setParticles] = useState(() => {
    const arr = [];
    for (let i = 0; i < 200; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
        ],
        velocity: [
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
        ],
      });
    }
    return arr;
  });

  // Initialize geometry attributes once, with memoization
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const count = particles.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Fill with initial particle positions and base colors
    for (let i = 0; i < count; i++) {
      positions.set(particles[i].position, i * 3);
      baseColor.toArray(colors, i * 3);
    }

    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [particles.length]); // only recreate if particle count changes drastically

  // Handle click event to add particles near mouse click
  useEffect(() => {
    const handleClick = (event) => {
      event.stopPropagation();
      const ndcX = (event.clientX / size.width) * 2 - 1;
      const ndcY = -(event.clientY / size.height) * 2 + 1;
      raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);

      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersectionPoint);

      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          position: [
            intersectionPoint.x + (Math.random() - 0.5) * 2,
            intersectionPoint.y + (Math.random() - 0.5) * 2,
            intersectionPoint.z + (Math.random() - 0.5) * 2,
          ],
          velocity: [
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
          ],
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [camera, raycaster, size, gl]);

  // On each frame, update particle positions and colors (glow effect)
  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const colors = pointsRef.current.geometry.attributes.color.array;

    const count = particles.length;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      // Update particle position by velocity, bounce on bounds +/- 15
      for (let axis = 0; axis < 3; axis++) {
        particles[i].position[axis] += particles[i].velocity[axis];
        if (particles[i].position[axis] > 15 || particles[i].position[axis] < -15) {
          particles[i].velocity[axis] = -particles[i].velocity[axis];
        }
        positions[ix + axis] = particles[i].position[axis];
      }

      // Calculate distance from mouse (mouse coords scaled down)
      const dx = particles[i].position[0] - mouse.current[0] / 10;
      const dy = particles[i].position[1] - mouse.current[1] / 10;
      const dz = particles[i].position[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < glowDistance) {
        const t = 1 - dist / glowDistance;
        colors[ix] = baseColor.r * (1 - t) + highlightColor.r * t;
        colors[ix + 1] = baseColor.g * (1 - t) + highlightColor.g * t;
        colors[ix + 2] = baseColor.b * (1 - t) + highlightColor.b * t;
      } else {
        // Reset to base color
        colors[ix] = baseColor.r;
        colors[ix + 1] = baseColor.g;
        colors[ix + 2] = baseColor.b;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial vertexColors size={0.15} sizeAttenuation />
    </points>
  );
}
