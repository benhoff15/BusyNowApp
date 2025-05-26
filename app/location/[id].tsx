import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getLocationById } from '@/mocks/locations';
import { colors } from '@/constants/colors';
import { formatTimeAgo, isUpdateRecent } from '@/utils/time';
import { MapPin, Clock, Plus } from 'lucide-react-native';
import BusynessIndicator from '@/components/BusynessIndicator';
import UpdateCard from '@/components/UpdateCard';
import FavoriteButton from '@/components/FavoriteButton';
import Button from '@/components/Button';
import * as Haptics from 'expo-haptics';
import { useUpdateStore } from '@/store/updates';

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const location = getLocationById(id);
  const updateStore = useUpdateStore();
  const localUpdates = updateStore.getUpdatesByLocation(id);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Location not found</Text>
      </View>
    );
  }

  const handleAddUpdate = () => {
    router.push(`/add-update/${id}`);
  };

  const handleUpvote = (updateId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    updateStore.updateVotes(id, updateId, 'up');
  };

  const handleDownvote = (updateId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    updateStore.updateVotes(id, updateId, 'down');
  };

  const isRecent =
    localUpdates.length > 0 && isUpdateRecent(localUpdates[0].timestamp);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: location.photoUrl }} style={styles.image} />
        <View style={styles.imageOverlay} />
        <View style={styles.headerActions}>
          <FavoriteButton locationId={location.id} size={28} />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{location.name}</Text>

        <View style={styles.addressRow}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={styles.address}>{location.address}</Text>
        </View>

        {localUpdates.length > 0 && (
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Clock size={16} color={colors.textSecondary} />
              <Text style={styles.lastUpdated}>
                Last updated {formatTimeAgo(localUpdates[0].timestamp)}
              </Text>
            </View>

            {localUpdates[0].busynessLevel && (
              <View style={styles.busynessContainer}>
                <BusynessIndicator level={localUpdates[0].busynessLevel} size="large" />
                {isRecent && (
                  <View style={styles.recentBadge}>
                    <Text style={styles.recentText}>Recent</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        <Button
          title="Add Update"
          onPress={handleAddUpdate}
          icon={<Plus size={18} color={colors.white} />}
          style={styles.addButton}
        />
      </View>

      <View style={styles.updatesContainer}>
        <Text style={styles.sectionTitle}>Recent Updates</Text>

        {localUpdates.length > 0 ? (
          localUpdates.map((update) => (
            <UpdateCard
              key={update.id}
              update={update}
              onUpvote={() => handleUpvote(update.id)}
              onDownvote={() => handleDownvote(update.id)}
            />
          ))
        ) : (
          <View style={styles.emptyUpdates}>
            <Text style={styles.emptyText}>No updates yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share how busy it is!</Text>
          </View>
        )}
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
  imageContainer: {
    height: 240,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 16,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  address: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  busynessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recentText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    marginTop: 8,
  },
  updatesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  emptyUpdates: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});