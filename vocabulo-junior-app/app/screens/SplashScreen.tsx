import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import LogoSplash from '../../components/Splash/LogoSplash';
import WaveSplash from '../../components/Splash/WaveSplash';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const movewaveAnim = useRef(new Animated.Value(1400)).current;

  useEffect(() => {
    // Start the wave animation
    Animated.timing(movewaveAnim, {
      toValue: 300,
      duration: 7000,
      useNativeDriver: false,
    }).start();
  }, [movewaveAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.waveContainer,
          {
            transform: [{ translateY: movewaveAnim }],
          },
        ]}
      >
        <WaveSplash />
      </Animated.View>
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
