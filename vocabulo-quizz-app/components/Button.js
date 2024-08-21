import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { darkTheme, lightTheme } from '@/constants/Colors';

// GradientBackgroundButton component with gradient background
const GradientBackgroundButton = ({ text, textColor, onPress }) => {
  const textColorStyle = textColor === 'light' ? lightTheme.darkShade : lightTheme.lightShade;

  return (
    <View style={styles.gradientBackgroundContainer}>
      <SvgXml
        xml={`
          <svg width="100%" height="100%" viewBox="0 0 300 45" preserveAspectRatio="none">
            <defs>
              <linearGradient gradientTransform="rotate(40)" id="gradientBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#C8A2F2;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#7DAED6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#99CDBD;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#gradientBackground)" rx="30" />
          </svg>
        `}
        style={styles.gradientBackground}
      />
      <TouchableOpacity style={styles.transparentButton} onPress={onPress}>
        <Text style={[styles.buttonText, { color: textColorStyle }]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// GradientBorderButton component with gradient border
const GradientBorderButton = ({ text, background, textColor, onPress }) => {
  const backgroundColorStyle = background === 'light' ? lightTheme.dark_lightShade : darkTheme.darkShade;
  const textColorStyle = textColor === 'light' ? lightTheme.lightShade : lightTheme.darkShade;

  return (
    <View style={styles.gradientBorderContainer}>
      <TouchableOpacity
        style={[styles.gradientBorderButton, { backgroundColor: backgroundColorStyle }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: textColorStyle }]}>
          {text}
        </Text>
      </TouchableOpacity>
      <SvgXml
        xml={`
          <svg width="100%" height="100%" viewBox="0 0 300 45" preserveAspectRatio="none">
            <defs>
              <linearGradient gradientTransform="rotate(40)" id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#C8A2F2;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#7DAED6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#99CDBD;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="298" height="43" rx="30" fill="none" stroke="url(#borderGradient)" stroke-width="2"/>
          </svg>
        `}
        style={styles.gradientBorder}
      />
    </View>
  );
};

// GradientBorderButtonMini for Slider
const GradientBorderButtonMini = ({ text, background, textColor, onPress }) => {
  const backgroundColorStyle = background === 'light' ? lightTheme.dark_lightShade : darkTheme.darkShade;
  const textColorStyle = textColor === 'light' ? lightTheme.lightShade : lightTheme.darkShade;

  return (
    <View style={styles.gradientBorderContainerMini}>
      <TouchableOpacity
        style={[styles.gradientBorderButtonMini, { backgroundColor: backgroundColorStyle }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonTextMini, { color: textColorStyle }]}>
          {text}
        </Text>
      </TouchableOpacity>
      <SvgXml
        xml={`
          <svg width="100%" height="100%" viewBox="0 0 300 45" preserveAspectRatio="none">
            <defs>
              <linearGradient gradientTransform="rotate(40)" id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#C8A2F2;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#7DAED6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#99CDBD;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="298" height="43" rx="30" fill="none" stroke="url(#borderGradient)" stroke-width="2"/>
          </svg>
        `}
        style={styles.gradientBorderMini}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
  },
  gradientBackgroundContainer: {
    position: 'relative',
    width: 220,
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    minHeight: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  gradientBorderContainer: {
    position: 'relative',
    width: 220,
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  gradientBorderContainerMini: {
    position: 'relative',
    width: 120,
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
  },

  gradientBorderButtonMini: {
    minHeight: 28,
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    zIndex: 1,
  },

  gradientBorderMini: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: 150,
  },

  buttonTextMini: {
    textAlign: 'center',
    fontSize: 10,
  },

  gradientBorderButton: {
    minHeight: 43,
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    zIndex: 1,
  },
  gradientBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: 30,
  },
});

export { GradientBackgroundButton, GradientBorderButton, GradientBorderButtonMini };
