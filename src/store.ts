import { create } from "zustand";
import { pages } from "./config";

const PIXELS_PER_SECOND = 100;

const totalScrollLength = pages.reduce((total, { scrollDuration }) => {
  return total + scrollDuration * PIXELS_PER_SECOND;
}, 0);

interface MainStore {
  pages: typeof pages;
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
  pages: pages,
  pageIndex: 0,
  pageProgress: 0,
  totalScrollLength,
  scrollTop: 0,
  setScrollTop: (scrollTop: number) => {
    set(({ pages }) => {
      let pageTop = 0;
      let pageHeight = 0;

      // Find the current page index based on scrollTop
      const pageIndex = pages.findIndex(({ scrollDuration }) => {
        pageHeight = scrollDuration * PIXELS_PER_SECOND;
        if (scrollTop >= pageTop && scrollTop < pageTop + pageHeight) {
          return true;
        } else {
          pageTop += pageHeight;
        }
      });

      // Keep track of the progress [0-1] of scrolling to the current page
      const pageProgress = (scrollTop - pageTop) / pageHeight;

      return { scrollTop, pageIndex, pageProgress };
    });
  },
  mousePosition: [0, 0],
  setMousePosition: (pos: [number, number]) => set({ mousePosition: pos }),
  windowSize: { width: 1024, height: 768 },
  setWindowSize: (width: number, height: number) =>
    set({ windowSize: { width, height } }),
}));
