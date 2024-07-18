import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function LogoSplash() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

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
      ]),
    );

    scaleAnimation.start();
    moveAnimation.start();
  }, [scaleAnim, moveAnim]);

  return (
    <View>
      <Animated.Image 
        source={require('./../../assets/images/Logo-coral.png')}
        style={[styles.logoCoral, { transform: [{ translateY: moveAnim }] }]}
      />
      <Animated.Image 
        source={require('./../../assets/images/Logo-typo.png')}
        style={[styles.logoTypo, { transform: [{ scale: scaleAnim }] }]}
      />
      <Animated.Image 
        source={require('./../../assets/images/graphicElements/Algea3.png')}
        style={styles.algea3}
      />
      <Animated.Image 
        source={require('./../../assets/images/graphicElements/Algea2.png')}
        style={styles.algea2}
      />
      <Animated.Image 
        source={require('./../../assets/images/graphicElements/Shadow-logo.png')}
        style={[styles.shadowLogo, { transform: [{ scale: scaleAnim }] }]}
      />
      <Animated.Image 
        source={require('./../../assets/images/graphicElements/Bubbles.png')}
        style={[styles.bubbles, { transform: [{ scale: scaleAnim }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoCoral: {
    position: 'absolute',
    width: 180,
    height: 171,
    zIndex: 1,
    alignSelf: 'center',
    top: 0,
    marginTop: 600,
  },
  logoTypo: {
    position: 'absolute',
    width: 250,
    height: 205,
    zIndex: 1,
    top: 0,
    marginTop: 150,
    alignSelf: 'center',
    tintColor: Colors.white,
  },
  algea3: {
    position: 'absolute',
    width: 180,
    height: 177,
    zIndex: -1,
    top: 0,
    left: 0,
    marginLeft: 20,
    marginTop: 575,
    tintColor: Colors.neutralGreen,
  },
  algea2: {
    position: 'absolute',
    width: 60,
    height: 80,
    zIndex: -1,
    top: 0,
    right: 0,
    marginRight: 50,
    marginTop: 660,
    tintColor: Colors.darkGreen,
  },
  shadowLogo: {
    position: 'absolute',
    width: 150,
    height: 17,
    zIndex: 0,
    top: 0,
    marginTop: 790,
    alignSelf: 'center',
    tintColor: Colors.lightCoral,
  },
  bubbles: {
    position: 'absolute',
    width: 280,
    height: 162,
    zIndex: 2,
    top: 0,
    marginTop: 400,
    alignSelf: 'center',
    tintColor: Colors.whiteTransparent,
  },
});
