import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import LogoSplash from '../../components/Splash/LogoSplash';
import WaveSplash from '../../components/Splash/WaveSplash';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
};
type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const movewaveAnim = useRef(new Animated.Value(1400)).current;

  useEffect(() => {
    Animated.timing(movewaveAnim, {
      toValue: 300,
      duration: 7000,
      useNativeDriver: false,
    }).start();

    const timeout = setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 8000);

    return () => clearTimeout(timeout);
  }, [movewaveAnim, navigation]);

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