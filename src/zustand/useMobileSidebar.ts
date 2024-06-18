import { create } from "zustand";

interface MobileSidebarProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useMobileSidebar = create<MobileSidebarProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
