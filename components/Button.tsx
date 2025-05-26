import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.backgroundColor = colors.primary;
        break;
      case 'secondary':
        buttonStyle.backgroundColor = colors.secondary;
        break;
      case 'outline':
        buttonStyle.backgroundColor = 'transparent';
        buttonStyle.borderWidth = 1;
        buttonStyle.borderColor = colors.primary;
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.paddingVertical = 8;
        buttonStyle.paddingHorizontal = 16;
        break;
      case 'large':
        buttonStyle.paddingVertical = 16;
        buttonStyle.paddingHorizontal = 24;
        break;
      default: // medium
        buttonStyle.paddingVertical = 12;
        buttonStyle.paddingHorizontal = 20;
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle.opacity = 0.5;
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleObj: TextStyle = {};
    
    // Variant text styles
    switch (variant) {
      case 'outline':
        textStyleObj.color = colors.primary;
        break;
      default:
        textStyleObj.color = colors.white;
    }
    
    // Size text styles
    switch (size) {
      case 'small':
        textStyleObj.fontSize = 14;
        break;
      case 'large':
        textStyleObj.fontSize = 18;
        break;
      default: // medium
        textStyleObj.fontSize = 16;
    }
    
    return textStyleObj;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? colors.primary : colors.white} 
          size="small" 
        />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, getTextStyle(), textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});