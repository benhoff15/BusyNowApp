import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  addPoints: (points: number) => void;
  incrementUpdateCount: () => void;
}

const DEFAULT_USER: User = {
  id: '1',
  name: 'Guest User',
  points: 0,
  updateCount: 0,
  favorites: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: DEFAULT_USER }),
      addPoints: (points) => set((state) => ({
        user: state.user ? {
          ...state.user,
          points: state.user.points + points,
        } : DEFAULT_USER,
      })),
      incrementUpdateCount: () => set((state) => ({
        user: state.user ? {
          ...state.user,
          updateCount: state.user.updateCount + 1,
        } : DEFAULT_USER,
      })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);