import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { useFavoritesStore } from '@/store/favorites';
import { mockLocations } from '@/mocks/locations';
import LocationCard from '@/components/LocationCard';
import EmptyState from '@/components/EmptyState';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const { favorites } = useFavoritesStore();
  
  const favoriteLocations = useMemo(() => {
    return mockLocations.filter(location => favorites.includes(location.id));
  }, [favorites]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Places you've saved</Text>
      </View>
      
      <ScrollView 
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {favoriteLocations.length > 0 ? (
          favoriteLocations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))
        ) : (
          <EmptyState 
            title="No Favorites Yet"
            message="Save your favorite places to quickly check how busy they are."
            icon={<Heart size={64} color={colors.textSecondary} />}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});