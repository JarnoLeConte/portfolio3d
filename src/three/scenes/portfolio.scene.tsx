"use client";

import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { useMainStore } from "~/store";
import { Page } from "~/types";
import { Laptop } from "../models/laptop.model";

export function PortfolioScene() {
  const pages = useMainStore((state) => state.pages);
  const pageIndex = useMainStore((state) => state.pageIndex);

  const page = pages[pageIndex];

  const videoSource = useMemo(() => {
    switch (page) {
      case Page.RXMARBLES:
        return "/videos/rxmarbles.mov";
      case Page.SHIMEJIS:
        return "/videos/shimejis.mov";
      case Page.ANIME_COACH:
        return "/videos/anime.coach.mov";
      case Page.FLIPPERKAST:
        return "/videos/flipperkast.mov";
    }
  }, [page]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, -20]} fov={35} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, -2.5, 0]}>
          <Laptop videoSource={videoSource} />
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
    </>
  );
}
