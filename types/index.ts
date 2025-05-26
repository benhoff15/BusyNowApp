import { BusynessLevel, Category } from '@/constants/busyness';
export type { BusynessLevel } from '@/constants/busyness';

export interface Location {
  id: string;
  name: string;
  address: string;
  category: Category;
  latitude: number;
  longitude: number;
  distance?: number; // in meters
  currentBusyness?: BusynessLevel;
  lastUpdated?: string; // ISO date string
  photoUrl?: string;
  isFavorite?: boolean;
}

export interface Update {
  id: string;
  locationId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  busynessLevel: BusynessLevel;
  waitTime?: number; // in minutes
  note?: string;
  photoUrl?: string;
  timestamp: string; // ISO date string
  upvotes: number;
  downvotes: number;
  hasVoted?: 'up' | 'down' | null;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  updateCount: number;
  favorites: string[]; // location IDs
}