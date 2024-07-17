import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import LogoSplash from './../../components/SplashScreen/LogoSplash';
import WaveSplash from './../../components/SplashScreen/WaveSplash';
import { Colors } from '@/constants/Colors';

export default function SplashScreen() {

const moveAnim = useRef(new Animated.Value(800)).current;

  useEffect(() => {
        Animated.timing(moveAnim, {
          toValue: -500,
          duration: 15000,
          useNativeDriver: true,
        },
    ).start();
  }, [moveAnim]);

  return (
    <View style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.beige,
      marginBottom: -100
    }}>
      <Animated.View
        style={{
          zIndex: -1,
          transform: [{ translateY: moveAnim }],
        }}
      >
        <WaveSplash />
      </Animated.View>
      <LogoSplash />
    </View>
  );
}
