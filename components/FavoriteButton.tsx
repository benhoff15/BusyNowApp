import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useFavoritesStore } from '@/store/favorites';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface FavoriteButtonProps {
  locationId: string;
  size?: number;
}

export default function FavoriteButton({ locationId, size = 24 }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(locationId);

  const handlePress = () => {
    toggleFavorite(locationId);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Heart 
        size={size} 
        color={isFav ? colors.error : colors.textSecondary} 
        fill={isFav ? colors.error : 'transparent'} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
});