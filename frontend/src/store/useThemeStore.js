import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: false,

  toggle: () => {
    set((state) => ({ theme: !state.theme }));
  },
}));
