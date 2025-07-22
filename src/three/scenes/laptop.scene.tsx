"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useState } from "react";
import LoremIpsum from "~/components/lorem-ipsum";
import Video from "~/components/video";
import { Laptop } from "../models/laptop.model";

export function LaptopScene() {
  const [page, setPage] = useState<string | null>(null);

  const displayContent = useMemo(() => {
    switch (page) {
      case "rxmarbles":
        return <Video src="/videos/rxmarbles.mov" />;
      case "shimejis":
        return <Video src="/videos/shimejis.mov" />;
      case "anime.coach":
        return <Video src="/videos/anime.coach.mov" />;
      case "flipperkast":
        return <Video src="/videos/flipperkast.mov" />;
      default:
        return <LoremIpsum />;
    }
  }, [page]);

  return (
    <Canvas camera={{ position: [0, 0, -20], fov: 35 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, -2.5, 0]}>
          <Laptop displayContent={displayContent} />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
}
