// NoScannedText.tsx
// This component displays a message and a button prompting the user to take a photo if no text has been scanned.
// It also includes a simple animation for the logo and background elements.

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';
import NoScannedTextBackground from './NoScannedTextBackground';


// Functional component for displaying no scanned text message and prompt
const NoScannedText: React.FC = () => {
  // Ref to store animated value for the logo's vertical movement
  const moveAnim = useRef(new Animated.Value(0)).current;

  // Effect to start the animation on component mount
  useEffect(() => {
    // Create a looping animation sequence for the logo
    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -15, // Move logo up
          duration: 800, // Duration of the upward move
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(moveAnim, {
          toValue: 0, // Move logo back to original position
          duration: 800, // Duration of the downward move
          useNativeDriver: true, // Use native driver for better performance
        }),
      ])
    );
    moveAnimation.start(); // Start the animation


    // Cleanup animation on component unmount
    return () => moveAnimation.stop();
  }, [moveAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.informationsContainer}>
        {/* Animated logo with vertical movement */}
        <Animated.Image
          source={require('./../../assets/images/graphicElements/Logo-green.png')}
          style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
        />
        {/* Text indicating no scanned text is available */}
        <InformationText style={styles.text}>Aucun texte scanné n'est disponible.</InformationText>
        {/* Button prompting user to take a photo */}
        <TouchableOpacity 
          style={styles.buttonContainer} 
          onPress={() => router.push('./../../(tabs)/TakePhoto')}
        >
          <View style={styles.button}>
            <ButtonText style={styles.buttonText}>Prends un texte en photo</ButtonText>
          </View>
          {/* Stars image decoration */}
          <Image
            source={require('./../../assets/images/graphicElements/stars.png')}
            style={styles.stars}
          />
        </TouchableOpacity>
      </View>
      {/* Background component */}
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
  buttonContainer: {
    padding: 15,
    borderRadius: 100,
    marginTop: 15,
    backgroundColor: Colors.grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginRight: -15
  },
  stars: {
    resizeMode: 'contain',
    height: 20,
    marginRight: -15,
    tintColor: Colors.white
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