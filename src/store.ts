import { create } from "zustand";

interface MainStore {
  pageIndex: number;
  pageProgress: number;
  scrollAreaHeight: number;
  scrollTop: number;
  mousePosition: [number, number];
  setScrollAreaHeight: (height: number) => void;
  setScrollTop: (top: number) => void;
  setMousePosition: (pos: [number, number]) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  pageIndex: 0,
  pageProgress: 0,
  scrollAreaHeight: 0,
  scrollTop: 0,
  mousePosition: [0, 0],
  setScrollAreaHeight: (height: number) => set({ scrollAreaHeight: height }),
  setScrollTop: (scrollTop: number) => {
    set((state) => {
      const top = scrollTop / 3;
      const { scrollAreaHeight: height } = state;
      const pageIndex = Math.max(0, Math.floor((top - 1) / height));
      const pageProgress = Math.max(0, ((top - 1) % height) / height);
      return { scrollTop: top, pageIndex, pageProgress };
    });
  },
  setMousePosition: (pos: [number, number]) => set({ mousePosition: pos }),
}));
