import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getLocationById } from '@/mocks/locations';
import { colors } from '@/constants/colors';
import { BusynessLevel, busynessLevels, waitTimeOptions } from '@/constants/busyness';
import { Smile, Meh, Frown, Clock, Image as ImageIcon, X } from 'lucide-react-native';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { useUserStore } from '@/store/user';
import { useUpdateStore } from '@/store/updates';

export default function AddUpdateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const location = getLocationById(id);
  const { addPoints, incrementUpdateCount } = useUserStore();
  
  const [busynessLevel, setBusynessLevel] = useState<BusynessLevel>('moderate');
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addUpdate } = useUpdateStore();

  
  
  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Location not found</Text>
      </View>
    );
  }
  
  const handleSelectBusyness = (level: BusynessLevel) => {
    setBusynessLevel(level);
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
  };
  
  const handleSelectWaitTime = (minutes: number | null) => {
    setWaitTime(minutes);
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
  };
  
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleRemoveImage = () => {
    setImage(null);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      addUpdate(location.id, {
        locationId: location.id,
        userId: 'guest',
        userName: 'Guest User',
        userAvatar: undefined,
        busynessLevel,
        waitTime: waitTime ?? undefined,
        note,
        photoUrl: image ?? undefined,
        upvotes: 0,
        downvotes: 0,
        hasVoted: null,
      });

      addPoints(10);
      incrementUpdateCount();

      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      setIsSubmitting(false);
      router.back();
    }, 1000);
  };
  
  const renderBusynessOption = (level: BusynessLevel, label: string, icon: React.ReactNode) => {
    const isSelected = busynessLevel === level;
    return (
      <TouchableOpacity
        style={[
          styles.busynessOption,
          isSelected && styles.selectedBusynessOption,
          level === 'quiet' && styles.quietOption,
          level === 'moderate' && styles.moderateOption,
          level === 'busy' && styles.busyOption,
        ]}
        onPress={() => handleSelectBusyness(level)}
        activeOpacity={0.7}
      >
        {icon}
        <Text 
          style={[
            styles.busynessLabel,
            isSelected && styles.selectedBusynessLabel,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text style={styles.locationAddress}>{location.address}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How busy is it?</Text>
        <View style={styles.busynessOptions}>
          {renderBusynessOption(
            'quiet',
            'Quiet',
            <Smile 
              size={24} 
              color={busynessLevel === 'quiet' ? colors.white : colors.success} 
            />
          )}
          {renderBusynessOption(
            'moderate',
            'Moderate',
            <Meh 
              size={24} 
              color={busynessLevel === 'moderate' ? colors.white : colors.warning} 
            />
          )}
          {renderBusynessOption(
            'busy',
            'Busy',
            <Frown 
              size={24} 
              color={busynessLevel === 'busy' ? colors.white : colors.busy} 
            />
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wait time</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.waitTimeOptions}
        >
          {waitTimeOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.waitTimeOption,
                waitTime === option.minutes && styles.selectedWaitTimeOption,
              ]}
              onPress={() => handleSelectWaitTime(option.minutes)}
              activeOpacity={0.7}
            >
              <Clock 
                size={16} 
                color={waitTime === option.minutes ? colors.white : colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.waitTimeLabel,
                  waitTime === option.minutes && styles.selectedWaitTimeLabel,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add a note (optional)</Text>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="Describe the situation..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={200}
        />
        <Text style={styles.charCount}>{note.length}/200</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add a photo (optional)</Text>
        {image ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={handleRemoveImage}
            >
              <X size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.imagePickerButton}
            onPress={handlePickImage}
            activeOpacity={0.7}
          >
            <ImageIcon size={24} color={colors.textSecondary} />
            <Text style={styles.imagePickerText}>Tap to add a photo</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.submitContainer}>
        <Button 
          title="Submit Update" 
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
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
    padding: 16,
    paddingBottom: 32,
  },
  locationInfo: {
    marginBottom: 24,
  },
  locationName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  busynessOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  busynessOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  selectedBusynessOption: {
    borderColor: 'transparent',
  },
  quietOption: {
    backgroundColor: colors.success + '20',
    borderColor: colors.success,
  },
  moderateOption: {
    backgroundColor: colors.warning + '20',
    borderColor: colors.warning,
  },
  busyOption: {
    backgroundColor: colors.busy + '20',
    borderColor: colors.busy,
  },
  busynessLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedBusynessLabel: {
    color: colors.white,
  },
  waitTimeOptions: {
    gap: 8,
    paddingRight: 16,
  },
  waitTimeOption: {
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
  selectedWaitTimeOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  waitTimeLabel: {
    fontSize: 14,
    color: colors.text,
  },
  selectedWaitTimeLabel: {
    color: colors.white,
  },
  noteInput: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  charCount: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  imagePickerButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  imagePickerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  submitContainer: {
    marginTop: 16,
  },
});