import { create } from "zustand";

// View Import

export const useViewStore = create((set) => ({
  selectedComponent: "home",

  toggleComponent: (data) => set({ selectedComponent: data }),
}));
