import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/colors';
import { Category } from '@/constants/busyness';
import { mockLocations } from '@/mocks/locations';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import EmptyState from '@/components/EmptyState';
import { Map } from 'lucide-react-native';

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const filteredLocations = selectedCategory 
    ? mockLocations.filter(loc => loc.category === selectedCategory)
    : mockLocations;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search on map..."
        />
      </View>
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <EmptyState 
            title="Map View"
            message="The map view is currently in development for web. Please check back later or use the mobile app for the full experience."
            icon={<Map size={64} color={colors.textSecondary} />}
          />
        ) : (
          <EmptyState 
            title="Map Coming Soon"
            message="We're working on integrating maps to show you busy places around you. Check back soon!"
            icon={<Map size={64} color={colors.textSecondary} />}
          />
        )}
      </View>
      
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Busyness Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
            <Text style={styles.legendText}>Quiet</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
            <Text style={styles.legendText}>Moderate</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.busy }]} />
            <Text style={styles.legendText}>Busy</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.card,
    marginTop: 8,
  },
  legend: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});