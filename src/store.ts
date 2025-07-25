import { create } from "zustand";
import { pages } from "./config";
import { DynamicPage } from "./types";

interface MainStore {
  pages: DynamicPage[];
  pageIndex: number;
  pageProgress: number;
  totalScrollLength: number;
  scrollTop: number;
  setScrollTop: (top: number) => void;
  mousePosition: [number, number];
  setMousePosition: (pos: [number, number]) => void;
  windowSize: { width: number; height: number };
  setWindowSize: (width: number, height: number) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  pages,
  pageIndex: 0,
  pageProgress: 0,
  totalScrollLength: pages[pages.length - 1].bottom,
  scrollTop: 0,
  setScrollTop: (scrollTop: number) => {
    set(({ pages }) => {
      const page = pages.find(
        ({ top, bottom }) => scrollTop >= top && scrollTop < bottom
      );

      if (!page) return {};

      // Keep track of the progress [0-1] of scrolling to the current page
      const pageProgress = (scrollTop - page.top) / page.height;
      const pageIndex = page.index;

      return { scrollTop, pageIndex, pageProgress };
    });
  },
  mousePosition: [0, 0],
  setMousePosition: (pos: [number, number]) => set({ mousePosition: pos }),
  windowSize: { width: 1024, height: 768 },
  setWindowSize: (width: number, height: number) =>
    set({ windowSize: { width, height } }),
}));
