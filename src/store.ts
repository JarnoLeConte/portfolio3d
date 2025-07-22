import { create } from "zustand";
import { Page } from "./types";

interface MainStore {
  pages: Page[];
  pageIndex: number;
  scrollAreaHeight: number;
  scrollTop: number;
  mousePosition: [number, number];
  setScrollAreaHeight: (height: number) => void;
  setScrollTop: (top: number) => void;
  setMousePosition: (pos: [number, number]) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  pages: Object.values(Page),
  pageIndex: 0,
  scrollAreaHeight: 0,
  scrollTop: 0,
  mousePosition: [0, 0],
  setScrollAreaHeight: (height: number) => set({ scrollAreaHeight: height }),
  setScrollTop: (top: number) => {
    set((state) => {
      const { scrollAreaHeight, pages } = state;
      const pageIndex = Math.max(0, Math.floor((top - 1) / scrollAreaHeight));
      return { scrollTop: top, pageIndex };
    });
  },
  setMousePosition: (pos: [number, number]) => set({ mousePosition: pos }),
}));
