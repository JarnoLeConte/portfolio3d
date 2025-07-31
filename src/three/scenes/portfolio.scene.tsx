"use client";

import { animated, useSpring } from "@react-spring/three";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import { useSpringValueFromStore } from "~/hooks/use-spring-value-form-store";
import { useMainStore } from "~/store";
import { DynamicPage, PageId } from "~/types";
import { PageDescription } from "../components/page-description";
import { PageTitle } from "../components/page-title";
import { ScrollHint } from "../components/scroll-hint";
import { WelcomeText } from "../components/welcome-text";
import { Laptop } from "../models/laptop.model";
import { StreamDeckModel } from "../models/streamdeck.model";
import { RaspberryPiModel } from "../models/raspberry.model";
import { GamepadModel } from "../models/gamepad.model";

export function PortfolioScene({
  page,
  videoSource,
  imageSource,
}: {
  page: DynamicPage;
  videoSource?: string;
  imageSource?: string;
}) {
  const hdrMapUrl = "/hdr/potsdamer_platz_1k.hdr";

  const pages = useMainStore((state) => state.pages);

  // Get scrollTop position as spring value to avoid re-renders
  const scroll = useSpringValueFromStore((state) => state.scrollTop);

  // Update the hinge spring based on scroll position (first 200px)
  // Setting an value between 0 and 1
  const hinge = scroll
    .to([0, 500], [0.3, 1])
    .to((v) => Math.max(0, Math.min(1, v)));

  const getLaptopProps = () => {
    switch (page.id) {
      case PageId.StreamDeck:
      case PageId.GallerTv:
        return {
          "position-x": -0.5,
          "position-z": 0,
          "rotation-y": 0.2,
        };
      default:
        return {
          "position-x": 0,
          "position-y": 0,
          "position-z": 0,
          "rotation-x": 0,
          "rotation-y": 0,
          "rotation-z": 0,
        };
    }
  };

  const getStreamDeckProps = () => {
    switch (page.id) {
      case PageId.StreamDeck:
        return {
          "position-x": 1.8,
          "position-y": 1.17,
          "position-z": 7.4,
          "rotation-y": -0.4,
        };
      default:
        return {
          "position-x": 20,
          "position-y": 0,
          "position-z": 0,
          "rotation-x": 0,
          "rotation-y": 2,
          "rotation-z": 0,
        };
    }
  };

  const getRaspberryPiProps = () => {
    switch (page.id) {
      case PageId.GallerTv:
        return {
          "position-x": 3,
          "position-y": 1.4,
          "position-z": 5,
          "rotation-x": -0.9,
          "rotation-y": -0.5,
          "rotation-z": 0.4,
          scale: 1,
        };
      case PageId.ProjectDiva:
        return {
          "position-x": 3.8,
          "position-y": 0.2,
          "position-z": 8,
          "rotation-x": -0.9,
          "rotation-y": -0.5,
          "rotation-z": 0.4,
          scale: 0.8,
        };
      default:
        return {
          "position-x": 20,
          "position-y": 0.8,
          "position-z": 5,
          "rotation-x": -0.9,
          "rotation-y": -0.5,
          "rotation-z": 0.4,
          scale: 1,
        };
    }
  };

  const getGamepadProps = () => {
    switch (page.id) {
      case PageId.ProjectDiva:
        return {
          "position-x": 0,
          "position-y": 1.3,
          "position-z": 13,
          "rotation-x": -0,
          "rotation-y": 3.13,
          "rotation-z": 0,
        };
      default:
        return {
          "position-x": 0,
          "position-y": 0.5,
          "position-z": 24,
          "rotation-x": -0.3,
          "rotation-y": 3.13,
          "rotation-z": 0,
        };
    }
  };

  const laptopProps = useSpring(getLaptopProps());
  const streamDeckProps = useSpring(getStreamDeckProps());
  const raspberryPiProps = useSpring(getRaspberryPiProps());
  const gamepadProps = useSpring(getGamepadProps());

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, -22]} fov={35} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#f0f0f0" />
      <Suspense fallback={null}>
        <WelcomeText />
        <group position-y={4.5}>
          {pages.map((page) => (
            <PageTitle key={page.id} page={page} />
          ))}
        </group>
        <group position-y={3.9}>
          {pages.map((page) => (
            <PageDescription key={page.id} page={page} />
          ))}
        </group>
        {/* Scene Content 3D */}
        <group rotation={[0, Math.PI, 0]} position={[0, -2.5, 0]}>
          <animated.group {...laptopProps}>
            <Laptop
              hinge={hinge}
              videoSource={videoSource}
              imageSource={imageSource}
            />
          </animated.group>
          <animated.group {...streamDeckProps}>
            <Suspense fallback={null}>
              <StreamDeckModel
                scale={0.02}
                position={[0.5, 0.3, 2.2]}
                rotation={[-Math.PI / 3, 0, 0]}
              />
            </Suspense>
          </animated.group>
          <animated.group {...raspberryPiProps}>
            <Suspense fallback={null}>
              <RaspberryPiModel scale={0.033} />
            </Suspense>
          </animated.group>
          <animated.group {...gamepadProps}>
            <Suspense fallback={null}>
              <GamepadModel scale={10} />
            </Suspense>
          </animated.group>
        </group>
        <ScrollHint />
        <Environment files={[hdrMapUrl]} />
      </Suspense>
      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.4}
        scale={20}
        blur={1.75}
        far={4.5}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}
