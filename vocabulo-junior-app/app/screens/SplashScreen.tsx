// SplashScreen.js
// This file defines the splash screen for the application,
// displaying animated wave and logo components before navigating to the login screen.

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook for navigation
import { StackNavigationProp } from '@react-navigation/stack'; // Type for navigation prop

import { Colors } from '@/constants/Colors'; // Importing colors defined in constants

import LogoSplash from '../../components/Splash/LogoSplash'; // Importing the LogoSplash component
import WaveSplash from '../../components/Splash/WaveSplash'; // Importing the WaveSplash component


type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
};
type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>(); // Hook for navigation
  const movewaveAnim = useRef(new Animated.Value(1400)).current; // Reference for wave animation

  useEffect(() => {
    // Animate the wave splash component
    Animated.timing(movewaveAnim, {
      toValue: 300,
      duration: 7000,
      useNativeDriver: false,
    }).start();

    // Navigate to the LoginScreen after 8 seconds
    const timeout = setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 8000);

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, [movewaveAnim, navigation]);

  return (
    <View style={styles.container}>
      {/* Animated WaveSplash component */}
      <Animated.View
        style={[
          styles.waveContainer,
          {
            transform: [{ translateY: movewaveAnim }], // Apply translation animation
          },
        ]}
      >
        <WaveSplash />
      </Animated.View>
      {/* LogoSplash component */}
      <LogoSplash />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  waveContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});