import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { mockLocations } from '@/mocks/locations';
import LocationCard from '@/components/LocationCard';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { Category } from '@/constants/busyness';
import CategoryFilter from '@/components/CategoryFilter';
import EmptyState from '@/components/EmptyState';
import { PlusCircle } from 'lucide-react-native';

export default function AddScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  
  useEffect(() => {
    let results = mockLocations;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        location => 
          location.name.toLowerCase().includes(query) || 
          location.address.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(location => location.category === selectedCategory);
    }
    
    setFilteredLocations(results);
  }, [searchQuery, selectedCategory]);
  
  const handleLocationSelect = (locationId: string) => {
    router.push(`/add-update/${locationId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Update</Text>
        <Text style={styles.subtitle}>Help others by sharing how busy a place is</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for a place..."
        />
      </View>
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView 
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredLocations.length > 0 ? (
          filteredLocations.map(location => (
            <LocationCard 
              key={location.id} 
              location={location} 
              compact
            />
          ))
        ) : (
          <EmptyState 
            title="No Places Found"
            message="Try adjusting your search or category filters to find places to update."
            icon={<PlusCircle size={64} color={colors.textSecondary} />}
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
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});