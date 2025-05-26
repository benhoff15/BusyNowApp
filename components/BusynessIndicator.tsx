import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Smile, Meh, Frown } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { BusynessLevel } from '@/constants/busyness';

interface BusynessIndicatorProps {
  level: BusynessLevel;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export default function BusynessIndicator({ 
  level, 
  size = 'medium', 
  showLabel = true 
}: BusynessIndicatorProps) {
  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 28;
      default: return 20;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 16;
      default: return 14;
    }
  };

  const getColor = () => {
    switch (level) {
      case 'quiet': return colors.success;
      case 'moderate': return colors.warning;
      case 'busy': return colors.busy;
      default: return colors.inactive;
    }
  };

  const getLabel = () => {
    switch (level) {
      case 'quiet': return 'Quiet';
      case 'moderate': return 'Moderate';
      case 'busy': return 'Busy';
      default: return 'Unknown';
    }
  };

  const renderIcon = () => {
    const iconSize = getIconSize();
    const color = getColor();

    switch (level) {
      case 'quiet':
        return <Smile size={iconSize} color={color} />;
      case 'moderate':
        return <Meh size={iconSize} color={color} />;
      case 'busy':
        return <Frown size={iconSize} color={color} />;
      default:
        return <Meh size={iconSize} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderIcon()}
      {showLabel && (
        <Text style={[styles.label, { color: getColor(), fontSize: getFontSize() }]}>
          {getLabel()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontWeight: '500',
  },
});