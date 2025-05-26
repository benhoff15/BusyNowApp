import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import { Category, categoryIcons } from '@/constants/busyness';
import { Coffee, ShoppingCart, Dumbbell, Utensils, Wine, ShoppingBag, Trees, Book, MapPin } from 'lucide-react-native';

interface CategoryFilterProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories: { id: Category; label: string }[] = [
    { id: 'cafe', label: 'Cafes' },
    { id: 'restaurant', label: 'Restaurants' },
    { id: 'bar', label: 'Bars' },
    { id: 'grocery', label: 'Grocery' },
    { id: 'retail', label: 'Retail' },
    { id: 'gym', label: 'Gyms' },
    { id: 'park', label: 'Parks' },
    { id: 'library', label: 'Libraries' },
    { id: 'other', label: 'Other' },
  ];

  const getCategoryIcon = (category: Category) => {
    const iconSize = 16;
    const iconColor = selectedCategory === category ? colors.white : colors.primary;
    
    switch (category) {
      case 'cafe':
        return <Coffee size={iconSize} color={iconColor} />;
      case 'restaurant':
        return <Utensils size={iconSize} color={iconColor} />;
      case 'bar':
        return <Wine size={iconSize} color={iconColor} />;
      case 'grocery':
        return <ShoppingCart size={iconSize} color={iconColor} />;
      case 'retail':
        return <ShoppingBag size={iconSize} color={iconColor} />;
      case 'gym':
        return <Dumbbell size={iconSize} color={iconColor} />;
      case 'park':
        return <Trees size={iconSize} color={iconColor} />; // Changed from Tree to Trees
      case 'library':
        return <Book size={iconSize} color={iconColor} />;
      default:
        return <MapPin size={iconSize} color={iconColor} />;
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.filterItem,
          selectedCategory === null && styles.selectedItem,
        ]}
        onPress={() => onSelectCategory(null)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.filterText,
            selectedCategory === null && styles.selectedText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.filterItem,
            selectedCategory === category.id && styles.selectedItem,
          ]}
          onPress={() => onSelectCategory(category.id)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            {getCategoryIcon(category.id)}
          </View>
          <Text
            style={[
              styles.filterText,
              selectedCategory === category.id && styles.selectedText,
            ]}
          >
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  selectedItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.white,
  },
});