import { create } from "zustand";

interface IUserStore {
  userId: string | null;
  setUserId: (id: string) => void;
  clearUserId: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  userId: null,
  setUserId: (id: string) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
}));
