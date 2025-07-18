"use client";

import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function Scene() {
  return (
    <Canvas>
      <Box args={[1, 1, 1]} position={[0, 0, 0]} />
    </Canvas>
  );
}
