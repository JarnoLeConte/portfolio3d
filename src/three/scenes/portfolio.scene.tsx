"use client";

import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import { useSpringValueFromStore } from "~/hooks/use-spring-value-form-store";
import { getPublicEnv } from "~/lib/env";
import { useMainStore } from "~/store";
import { PageTitle } from "../components/page-title";
import { Laptop } from "../models/laptop.model";
import { WelcomeText } from "../components/welcome-text";

export function PortfolioScene({
  videoSource,
  imageSource,
}: {
  videoSource?: string;
  imageSource?: string;
}) {
  const { assetsUrl } = getPublicEnv();
  const hdrMapUrl = assetsUrl + "/potsdamer_platz_1k.hdr";

  const pages = useMainStore((state) => state.pages);

  // Get scrollTop position as spring value to avoid re-renders
  const scroll = useSpringValueFromStore((state) => state.scrollTop);

  // Update the hinge spring based on scroll position (first 200px)
  // Setting an value between 0 and 1
  const hinge = scroll
    .to([0, 200], [0, 1])
    .to((v) => Math.max(0, Math.min(1, v)));

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, -20]} fov={35} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <WelcomeText />
        <group position-y={4.5}>
          {pages.map((page) => (
            <PageTitle key={page.id} page={page} />
          ))}
        </group>
        <group rotation={[0, Math.PI, 0]} position={[0, -2.5, 0]}>
          <Laptop
            hinge={hinge}
            videoSource={videoSource}
            imageSource={imageSource}
          />
        </group>
        <Environment files={[hdrMapUrl]} />
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
