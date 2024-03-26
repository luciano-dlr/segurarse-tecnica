import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from './interface';

interface AuthStore {
    user: User | null;
    setUser: (user: User) => void;
    logOut: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User) => set({ user }),
            logOut: () => set({ user: null })
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);




