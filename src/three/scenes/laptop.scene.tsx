"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useState } from "react";
import LoremIpsum from "~/components/lorem-ipsum";
import Video from "~/components/video";
import { Page } from "~/types";
import { Laptop } from "../models/laptop.model";
import { useMainStore } from "~/store";

export function LaptopScene() {
  const pages = useMainStore((state) => state.pages);
  const pageIndex = useMainStore((state) => state.pageIndex);

  const page = pages[pageIndex];

  const displayContent = useMemo(() => {
    switch (page) {
      case Page.RXMARBLES:
        return <Video src="/videos/rxmarbles.mov" />;
      case Page.SHIMEJIS:
        return <Video src="/videos/shimejis.mov" />;
      case Page.ANIME_COACH:
        return <Video src="/videos/anime.coach.mov" />;
      case Page.FLIPPERKAST:
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
