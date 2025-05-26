import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Location } from '@/types';
import { colors } from '@/constants/colors';
import { formatTimeAgo, formatDistance } from '@/utils/time';
import BusynessIndicator from './BusynessIndicator';
import FavoriteButton from './FavoriteButton';

interface LocationCardProps {
  location: Location;
  compact?: boolean;
}

export default function LocationCard({ location, compact = false }: LocationCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/location/${location.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, compact && styles.compactContainer]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: location.photoUrl }} 
        style={[styles.image, compact && styles.compactImage]} 
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{location.name}</Text>
          <FavoriteButton locationId={location.id} size={16} />
        </View>
        
        <View style={styles.details}>
          <View style={styles.addressRow}>
            <MapPin size={14} color={colors.textSecondary} />
            <Text style={styles.address} numberOfLines={1}>
              {location.address}
              {location.distance && ` · ${formatDistance(location.distance)}`}
            </Text>
          </View>
          
          {location.lastUpdated && (
            <View style={styles.statusRow}>
              <Clock size={14} color={colors.textSecondary} />
              <Text style={styles.lastUpdated}>
                {formatTimeAgo(location.lastUpdated)}
              </Text>
              {location.currentBusyness && (
                <BusynessIndicator 
                  level={location.currentBusyness} 
                  size="small" 
                />
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  compactContainer: {
    flexDirection: 'row',
    height: 80,
  },
  image: {
    height: 140,
    width: '100%',
  },
  compactImage: {
    height: 80,
    width: 80,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  details: {
    gap: 6,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  address: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lastUpdated: {
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: 8,
  },
});