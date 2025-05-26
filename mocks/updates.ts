import { Update } from '@/types';

export const mockUpdates: Record<string, Update[]> = {
  '1': [
    {
      id: '101',
      locationId: '1',
      userId: '1',
      userName: 'Sarah J.',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      busynessLevel: 'moderate',
      waitTime: 5,
      note: 'A few tables available, short line for ordering.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      upvotes: 5,
      downvotes: 0,
    },
    {
      id: '102',
      locationId: '1',
      userId: '2',
      userName: 'Mike T.',
      busynessLevel: 'quiet',
      waitTime: 0,
      note: 'Almost empty now, great time to come!',
      photoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      upvotes: 3,
      downvotes: 1,
    },
  ],
  '2': [
    {
      id: '201',
      locationId: '2',
      userId: '3',
      userName: 'Alex W.',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      busynessLevel: 'busy',
      waitTime: 15,
      note: 'Long lines at checkout, produce section crowded.',
      photoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      upvotes: 8,
      downvotes: 0,
    },
  ],
  '3': [
    {
      id: '301',
      locationId: '3',
      userId: '4',
      userName: 'Jamie L.',
      busynessLevel: 'quiet',
      waitTime: 0,
      note: 'No wait for equipment, plenty of space.',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      upvotes: 4,
      downvotes: 0,
    },
  ],
};

export const getUpdatesForLocation = (locationId: string): Update[] => {
  return mockUpdates[locationId] || [];
};

export const getRecentUpdates = (count = 5): Update[] => {
  const allUpdates = Object.values(mockUpdates).flat();
  return [...allUpdates]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, count);
};