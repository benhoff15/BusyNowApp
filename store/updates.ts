import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Update } from '@/types';
import { generateId } from '@/utils/generateId';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UpdatesState {
  updates: Record<string, Update[]>;
  addUpdate: (locationId: string, update: Omit<Update, 'id' | 'timestamp'>) => void;
  getUpdatesByLocation: (locationId: string) => Update[];
  updateVotes: (locationId: string, updateId: string, vote: 'up' | 'down' | 'toggle') => void;
}

const isWeb = typeof window !== 'undefined';

export const useUpdateStore = create<UpdatesState>()(
  persist(
    (set, get) => ({
      updates: {},

      addUpdate: (locationId, update) => {
        const newUpdate: Update = {
          ...update,
          id: generateId(),
          timestamp: new Date().toISOString(),
        };
        set((state) => {
          const updated = {
            ...state.updates,
            [locationId]: [newUpdate, ...(state.updates[locationId] || [])],
          };
          return { updates: updated };
        });
      },

      getUpdatesByLocation: (locationId) => {
        const allUpdates = get().updates[locationId] || [];
        const now = Date.now();
        return allUpdates.filter((update) => {
          const updateTime = new Date(update.timestamp).getTime();
          return now - updateTime <= 60 * 60 * 1000;
        });
      },

      updateVotes: (locationId, updateId, vote) => {
        set((state) => {
          const updates = state.updates[locationId] || [];
          const updated: Update[] = updates.map((u) => {
            if (u.id !== updateId) return u;

            if (vote === 'up') {
              const isUp = u.hasVoted === 'up';
              return {
                ...u,
                upvotes: u.upvotes + (isUp ? -1 : 1),
                downvotes: u.hasVoted === 'down' ? u.downvotes - 1 : u.downvotes,
                hasVoted: isUp ? null : 'up',
              };
            }

            if (vote === 'down') {
              const isDown = u.hasVoted === 'down';
              return {
                ...u,
                downvotes: u.downvotes + (isDown ? -1 : 1),
                upvotes: u.hasVoted === 'up' ? u.upvotes - 1 : u.upvotes,
                hasVoted: isDown ? null : 'down',
              };
            }

            return u;
          });

          return {
            updates: {
              ...state.updates,
              [locationId]: updated,
            },
          };
        });
      },
    }),
    {
      name: 'update-store',
      storage: createJSONStorage(() => (isWeb ? localStorage : AsyncStorage)),
      merge: (persisted, current) => {
        const raw = (persisted as any)?.updates || {};
        const updates: Record<string, Update[]> = Object.fromEntries(
          Object.entries(raw).map(([locationId, updatesList]) => [
            locationId,
            (updatesList as any[]).map((update): Update => ({
              ...update,
              hasVoted:
                update.hasVoted === 'up' || update.hasVoted === 'down'
                  ? update.hasVoted
                  : null,
            })),
          ])
        );

        return {
          ...current,
          updates,
        };
      },
    }
  )
);