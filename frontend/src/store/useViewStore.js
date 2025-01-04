import { create } from "zustand";

export const useViewStore = create((set) => ({
  selectedComponent: "home",

  toggleComponent: (data) => set({ selectedComponent: data }),
}));
