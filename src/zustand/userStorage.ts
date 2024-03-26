import { create } from 'zustand';
import { SelectedUser } from './interface';

interface UserStore {
    selectedUser: SelectedUser | null;
    setUser: (user: SelectedUser) => void;
    cleanUser: () => void;
}

export const useUserStore = create<UserStore>()(
    (set) => ({
        selectedUser: null,
        setUser: (selectedUser: SelectedUser) => set({ selectedUser }),
        cleanUser: () => set({selectedUser:null})
    })
)