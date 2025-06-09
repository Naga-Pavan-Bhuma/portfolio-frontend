import React, { useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

extend({ PointsMaterial: THREE.PointsMaterial });

export default function Particles({ mouse }) {
  const pointsRef = useRef();
  const lineRef = useRef();
  const count = 200;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const thresholdDist = 3; // max dist for connecting lines

  // Initialize positions & velocities
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !lineRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position.array;
    const linePositions = lineRef.current.geometry.attributes.position.array;

    // Update particle positions with velocity and simple bounds bouncing
    for (let i = 0; i < count; i++) {
      let ix = i * 3;

      // Update position
      positions[ix] += velocities[ix];
      positions[ix + 1] += velocities[ix + 1];
      positions[ix + 2] += velocities[ix + 2];

      // Bounce back if out of bounds (-15 to 15 cube)
      for (let j = 0; j < 3; j++) {
        if (positions[ix + j] > 15 || positions[ix + j] < -15) {
          velocities[ix + j] = -velocities[ix + j];
        }
      }

      // Repel from mouse when close
      const dx = positions[ix] - mouse.current[0] / 10;
      const dy = positions[ix + 1] - mouse.current[1] / 10;
      const dz = positions[ix + 2];
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq < 4) {
        const force = 0.05 / (distSq + 0.001);
        velocities[ix] += dx * force;
        velocities[ix + 1] += dy * force;
      }

      // Update the points position buffer for rendering
      posArray[ix] = positions[ix];
      posArray[ix + 1] = positions[ix + 1];
      posArray[ix + 2] = positions[ix + 2];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Now handle lines between particles close enough
    let lineIndex = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const ix = i * 3;
        const jx = j * 3;

        const dx = positions[ix] - positions[jx];
        const dy = positions[ix + 1] - positions[jx + 1];
        const dz = positions[ix + 2] - positions[jx + 2];

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < thresholdDist) {
          // Line start
          linePositions[lineIndex++] = positions[ix];
          linePositions[lineIndex++] = positions[ix + 1];
          linePositions[lineIndex++] = positions[ix + 2];

          // Line end
          linePositions[lineIndex++] = positions[jx];
          linePositions[lineIndex++] = positions[jx + 1];
          linePositions[lineIndex++] = positions[jx + 2];
        }
      }
    }

    // Clear remaining line positions (if any)
    for (; lineIndex < linePositions.length; lineIndex++) {
      linePositions[lineIndex] = 0;
    }

    lineRef.current.geometry.setDrawRange(0, lineIndex / 3);
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      {/* Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#0af"
          size={0.2}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          // Add a bit of glow effect
          // This is a trick by using alpha test and blending
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          fog={false}
        />
      </points>

      {/* Lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count * count * 2}
            array={new Float32Array(count * count * 3 * 2)} // max possible lines
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0af"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}
