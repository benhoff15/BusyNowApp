export type BusynessLevel = 'quiet' | 'moderate' | 'busy' | 'unknown';

export const busynessLevels = [
  { id: 'quiet', label: 'Quiet', description: 'No waiting, plenty of space', icon: 'smile' },
  { id: 'moderate', label: 'Moderate', description: 'Some waiting, filling up', icon: 'meh' },
  { id: 'busy', label: 'Busy', description: 'Long wait, crowded', icon: 'frown' },
];

export const waitTimeOptions = [
  { id: 'none', label: 'No wait', minutes: 0 },
  { id: '5min', label: '5 minutes', minutes: 5 },
  { id: '10min', label: '10 minutes', minutes: 10 },
  { id: '15min', label: '15 minutes', minutes: 15 },
  { id: '30min', label: '30 minutes', minutes: 30 },
  { id: '45min', label: '45 minutes', minutes: 45 },
  { id: '60min', label: '1 hour+', minutes: 60 },
];

export const categoryIcons = {
  restaurant: 'utensils',
  cafe: 'coffee',
  bar: 'wine-glass',
  grocery: 'shopping-cart',
  retail: 'shopping-bag',
  gym: 'dumbbell',
  park: 'tree',
  library: 'book',
  other: 'map-pin',
};

export type Category = keyof typeof categoryIcons;