import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import LogoSplash from '../../components/SplashScreen/LogoSplash';
import WaveSplash from '../../components/SplashScreen/WaveSplash';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';



export default function SplashScreen() {
  const router = useRouter();
  const movewaveAnim = useRef(new Animated.Value(1400)).current;


  useEffect(() => {
    Animated.timing(movewaveAnim, {
      toValue: 300,
      duration: 7000,
      useNativeDriver: false,
    }).start();
  }, [movewaveAnim]);

  const timer = setTimeout(() => {
    router.push('/LoginScreen');
  }, 8000);


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          transform: [{ translateY: movewaveAnim }],
        }}
      >
        <WaveSplash />
      </Animated.View>
      <LogoSplash />
    </View>
  );
}
