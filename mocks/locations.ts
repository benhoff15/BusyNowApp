import { Location } from '@/types';
import { mockUserLocation } from '@/constants/mockLocation';
import { calculateDistanceMeters } from '@/utils/distance';

let fallbackSeed = 42;

const safeRandom = () => {
  fallbackSeed = (fallbackSeed * 16807) % 2147483647;
  return (fallbackSeed % 1000) / 1000;
};

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'The Brothers K Coffeehouse',
    address: '500 Main St, Evanston, IL',
    category: 'cafe',
    latitude: 42.0337826,
    longitude: -87.6779315,
    currentBusyness: 'moderate',
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    name: 'Trader Joe\'s',
    address: '1211 Chicago Ave, Evanston, IL',
    category: 'grocery',
    latitude: 42.0397986,
    longitude: -87.6800795,
    currentBusyness: 'busy',
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    name: 'Esporta Fitness',
    address: '7529 N Clark St, Chicago, IL',
    category: 'gym',
    latitude: 42.0182356,
    longitude: -87.6735256,
    currentBusyness: 'quiet',
    lastUpdated: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    name: 'Millennium Park',
    address: '201 E Randolph St, Chicago, IL',
    category: 'park',
    latitude: 41.8841369,
    longitude: -87.6214413,
    currentBusyness: 'moderate',
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '5',
    name: 'Evanston Public Library',
    address: '1703 Orrington Ave, Evanston, IL',
    category: 'library',
    latitude: 42.0483895,
    longitude: -87.6800442,
    currentBusyness: 'quiet',
    lastUpdated: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '6',
    name: 'Whole Foods Market',
    address: '1640 Chicago Ave, Evanston, IL',
    category: 'grocery',
    latitude: 42.0475851,
    longitude: -87.6796031,
    currentBusyness: 'busy',
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '7',
    name: 'Cupitol Coffee & Eatery',
    address: '812 Grove St, Evanston, IL',
    category: 'cafe',
    latitude: 42.0454106,
    longitude: -87.6825521,
    currentBusyness: 'moderate',
    lastUpdated: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '8',
    name: 'DMV Office',
    address: '405 Lake Cook Rd, Deerfield, IL',
    category: 'other',
    latitude: 42.1517284,
    longitude: -87.838268,
    currentBusyness: 'busy',
    lastUpdated: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    photoUrl: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  }
];

export const getNearbyLocations = (radius = 5000): Location[] => {
  return mockLocations
    .map(location => {
      const distance = calculateDistanceMeters(
        mockUserLocation.latitude,
        mockUserLocation.longitude,
        location.latitude,
        location.longitude
      );
      return {
        ...location,
        distance: Math.round(distance),
      };
    })
    .filter(location => location.distance !== undefined && location.distance <= radius)
    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
};

export const getTrendingLocations = (count = 3): Location[] => {
  return [...mockLocations]
    .sort(() => safeRandom() - 0.5)
    .slice(0, count)
    .map(location => ({
      ...location,
      distance: Math.floor(safeRandom() * 5000) + 500,
    }));
};

export const getLocationById = (id: string): Location | undefined => {
  return mockLocations.find(location => location.id === id);
};