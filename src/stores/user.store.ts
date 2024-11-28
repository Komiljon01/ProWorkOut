import { User } from "firebase/auth";
import { create } from "zustand";

type UserType = User | null;

interface iUserStateStore {
  user: UserType;
  setUser: (user: UserType) => void;
}

export const useUserState = create<iUserStateStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
