import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (locationId: string) => void;
  removeFavorite: (locationId: string) => void;
  toggleFavorite: (locationId: string) => void;
  isFavorite: (locationId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (locationId) => {
        set((state) => ({
          favorites: [...state.favorites, locationId],
        }));
      },
      removeFavorite: (locationId) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== locationId),
        }));
      },
      toggleFavorite: (locationId) => {
        const { favorites, addFavorite, removeFavorite } = get();
        if (favorites.includes(locationId)) {
          removeFavorite(locationId);
        } else {
          addFavorite(locationId);
        }
      },
      isFavorite: (locationId) => {
        return get().favorites.includes(locationId);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);