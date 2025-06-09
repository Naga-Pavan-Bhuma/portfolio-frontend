import React, { useRef, useEffect, useState } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";

extend({ PointsMaterial: THREE.PointsMaterial });

const baseColor = new THREE.Color(0x0099ff);
const highlightColor = new THREE.Color(0x00ffff);
const glowDistance = 3;

export default function Particles({ mouse }) {
  const pointsRef = useRef();

  // Store particles as array of {position: [x,y,z], velocity: [vx,vy,vz]} for easy add/remove
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

  // Buffer attributes refs
  const positionsRef = useRef(null);
  const colorsRef = useRef(null);

  // On click handler: add particles near clicked mouse 3D point
  const { raycaster, camera, scene, size } = useThree();

  // Convert 2D mouse to normalized device coordinates
  function getMouseNDC(x, y) {
    return [(x / size.width) * 2 - 1, -(y / size.height) * 2 + 1];
  }

  // On click event to add particles near click point
  function onClick(event) {
    event.stopPropagation();

    // Calculate normalized device coords
    const [ndcX, ndcY] = getMouseNDC(event.clientX, event.clientY);

    raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);

    // We'll intersect with a plane at z=0 for 3D click position
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectionPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, intersectionPoint);

    // Add new particles around the click point
    const newParticles = [];
    const newCount = 30;

    for (let i = 0; i < newCount; i++) {
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

    // Append new particles to the array
    setParticles((prev) => [...prev, ...newParticles]);
  }

  // Update buffers when particles change or on every frame
  useEffect(() => {
    if (!pointsRef.current) return;

    // Create Float32Arrays for position and color based on current particles count
    const count = particles.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const p = particles[i].position;
      positions.set(p, i * 3);

      // Set base color initially
      baseColor.toArray(colors, i * 3);
    }

    pointsRef.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    pointsRef.current.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  }, [particles]);

  // Update particle positions & colors on every frame
  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const colors = pointsRef.current.geometry.attributes.color.array;

    const count = particles.length;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      // Update position by velocity and bounce on boundaries
      particles[i].position[0] += particles[i].velocity[0];
      particles[i].position[1] += particles[i].velocity[1];
      particles[i].position[2] += particles[i].velocity[2];

      for (let axis = 0; axis < 3; axis++) {
        if (particles[i].position[axis] > 15 || particles[i].position[axis] < -15) {
          particles[i].velocity[axis] = -particles[i].velocity[axis];
        }
      }

      // Calculate distance from mouse (scaled down)
      const dx = particles[i].position[0] - mouse.current[0] / 10;
      const dy = particles[i].position[1] - mouse.current[1] / 10;
      const dz = particles[i].position[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // Color glow effect
      if (dist < glowDistance) {
        const t = 1 - dist / glowDistance;
        colors[ix] = baseColor.r * (1 - t) + highlightColor.r * t;
        colors[ix + 1] = baseColor.g * (1 - t) + highlightColor.g * t;
        colors[ix + 2] = baseColor.b * (1 - t) + highlightColor.b * t;
      } else {
        colors[ix] = baseColor.r;
        colors[ix + 1] = baseColor.g;
        colors[ix + 2] = baseColor.b;
      }

      // Small repulsion force from mouse
      if (dist < 4) {
        const force = 0.05 / (dist * dist + 0.001);
        particles[i].velocity[0] += dx * force;
        particles[i].velocity[1] += dy * force;
      }

      // Update position buffer for this particle
      positions[ix] = particles[i].position[0];
      positions[ix + 1] = particles[i].position[1];
      positions[ix + 2] = particles[i].position[2];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} onClick={onClick}>
      <bufferGeometry />
      <pointsMaterial
        vertexColors={true}
        size={0.15}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
