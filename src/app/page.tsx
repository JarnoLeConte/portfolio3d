"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useMainStore } from "~/store";
import { PortfolioScene } from "~/three/scenes/portfolio.scene";

export default function Home() {
  const scrollArea = useRef<HTMLDivElement>(null);

  const setScrollAreaHeight = useMainStore(
    (state) => state.setScrollAreaHeight
  );
  const setScrollTop = useMainStore((state) => state.setScrollTop);
  const setMousePosition = useMainStore((state) => state.setMousePosition);
  const pages = useMainStore((state) => state.pages);

  const onScroll = (e: any) => {
    setScrollAreaHeight(e.target?.offsetHeight ?? 0);
    setScrollTop(e.target?.scrollTop ?? 0);
  };

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-dvh overflow-hidden font-[family-name:var(--font-geist-sans)]">
        <div
          className="absolute top-0 left-0 w-full h-full overflow-auto z-20"
          ref={scrollArea}
          onScroll={onScroll}
          onPointerMove={(e) =>
            setMousePosition([
              (e.clientX / window.innerWidth) * 2 - 1,
              (e.clientY / window.innerHeight) * 2 - 1,
            ])
          }
        >
          {[...pages, "last-page-empty"].map((_, page) => (
            <div className="w-full h-full" key={page} />
          ))}
        </div>
        <Canvas>
          <PortfolioScene />
        </Canvas>
      </div>
    </>
  );
}
