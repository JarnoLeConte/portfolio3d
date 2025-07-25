"use client";

import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Laptop } from "../models/laptop.model";
import { getPublicEnv } from "~/lib/env";

export function PortfolioScene({ videoSource }: { videoSource?: string }) {
  const { assetsUrl } = getPublicEnv();
  const hdrMapUrl = assetsUrl + "/potsdamer_platz_1k.hdr";

  // This flag controls open state, alternates between true & false
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, -20]} fov={35} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, -2.5, 0]}>
          <Laptop open={open} videoSource={videoSource} />
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
