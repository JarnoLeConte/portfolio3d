"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { pages } from "~/config";
import { useMainStore } from "~/store";
import { PortfolioScene } from "~/three/scenes/portfolio.scene";

export default function Home() {
  const scrollArea = useRef<HTMLDivElement>(null);

  const setScrollAreaHeight = useMainStore(
    (state) => state.setScrollAreaHeight
  );
  const setScrollTop = useMainStore((state) => state.setScrollTop);
  const setMousePosition = useMainStore((state) => state.setMousePosition);
  const pageIndex = useMainStore((state) => state.pageIndex);

  const [objectUrls, setObjectUrls] = useState<Record<string, string>>({});

  const page = pages[pageIndex];
  const videoSource = objectUrls[page?.page];

  const onScroll = (e: any) => {
    setScrollAreaHeight(e.target?.offsetHeight ?? 0);
    setScrollTop(e.target?.scrollTop ?? 0);
  };

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  // Preload video sources
  useEffect(() => {
    const objectUrls: Record<string, string> = {};

    (async () => {
      for (const { page, videoSource } of pages) {
        if (videoSource) {
          await fetch(videoSource)
            .then((res) => res.blob())
            .then((blob) => {
              // Create an object URL for the video blob
              // to make sure the video will be rendered from memory
              // and will not load parts while scrubbing because browser
              // doesn't always use the loaded video source otherwise.
              objectUrls[page] = URL.createObjectURL(blob);
              setObjectUrls((prev) => ({ ...objectUrls }));
            });
        }
      }
    })();

    return () => {
      Object.values(objectUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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
          <div className="w-full h-[1400vh]" />
        </div>
        <Canvas>
          <PortfolioScene videoSource={videoSource} />
        </Canvas>
      </div>
    </>
  );
}
