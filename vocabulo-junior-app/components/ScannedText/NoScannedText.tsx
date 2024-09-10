// components/NoScannedText.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';
import { router } from 'expo-router';
import NoScannedTextBackground from './NoScannedTextBackground';

const NoScannedText: React.FC = () => {
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    moveAnimation.start();
    
    return () => moveAnimation.stop(); // Cleanup animation on unmount
  }, [moveAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.informationsContainer}>
        <Animated.Image
          source={require('./../../assets/images/Logo-green.png')}
          style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
        />
        <InformationText style={styles.text}>Aucun texte scanné n'est disponible.</InformationText>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./../../(tabs)/TakePhoto')}>
          <ButtonText style={styles.buttonText}>Prends un texte en photo !</ButtonText>
        </TouchableOpacity>
      </View>
      <View style={styles.NoScannedTextBackgroundComponent}>
        <NoScannedTextBackground />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: '60%',
    marginHorizontal: 'auto',
  },
  informationsContainer: {
    zIndex: 1,
  },
  logo: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    alignSelf: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 100,
    marginTop: 15,
    backgroundColor: Colors.grey,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
  },
  NoScannedTextBackgroundComponent: {
    marginTop: '-100%',
    zIndex: 0,
  },
});

export default NoScannedText;
