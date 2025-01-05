import { create } from "zustand";

// Theme Store

export const useThemeStore = create((set) => ({
  theme: false,

  toggle: () => {
    set((state) => ({ theme: !state.theme }));
  },
}));
