import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { getNearbyLocations, getTrendingLocations } from '@/mocks/locations';
import { Category } from '@/constants/busyness';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import LocationCard from '@/components/LocationCard';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const searchLower = searchQuery.toLowerCase();

  const nearbyLocations = getNearbyLocations(5000);
  const trendingLocations = getTrendingLocations();
  
  const handleSearch = () => {
    // In a real app, this would filter locations or navigate to search results
    console.log('Searching for:', searchQuery);
  };
  
  const filterLocation = (loc: typeof nearbyLocations[0]) => {
    const matchesCategory = selectedCategory ? loc.category === selectedCategory : true;
    const matchesSearch = loc.name.toLowerCase().includes(searchLower) || loc.address.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  };

  const filteredNearby = nearbyLocations.filter(filterLocation);
  const filteredTrending = trendingLocations.filter(filterLocation);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>BusyNow</Text>
        <Text style={styles.subtitle}>Find the perfect time to go</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Search for places..."
        />
      </View>
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {filteredTrending.map(location => (
            <View key={location.id} style={styles.trendingCard}>
              <LocationCard location={location} />
            </View>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Places</Text>
        {filteredNearby.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  horizontalList: {
    paddingRight: 16,
  },
  trendingCard: {
    width: 280,
    marginRight: 12,
  },
});