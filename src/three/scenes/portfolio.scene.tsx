"use client";

import { useSpringValue } from "@react-spring/three";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { getPublicEnv } from "~/lib/env";
import { useMainStore } from "~/store";
import { Laptop } from "../models/laptop.model";

export function PortfolioScene({
  videoSource,
  imageSource,
}: {
  videoSource?: string;
  imageSource?: string;
}) {
  const { assetsUrl } = getPublicEnv();
  const hdrMapUrl = assetsUrl + "/potsdamer_platz_1k.hdr";

  // Create a spring value for the hinge
  const hinge = useSpringValue(0);

  // Update the hinge spring based on scroll position (first 200px)
  // Setting an value between 0 and 1
  // This avoids React re-renders by updating the spring directly
  useEffect(
    () =>
      useMainStore.subscribe(({ scrollTop }) => {
        const clamped = Math.min(Math.max(scrollTop, 0), 200);
        const nextHinge = clamped / 200;
        hinge.set(nextHinge);
      }),
    []
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, -20]} fov={35} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
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
