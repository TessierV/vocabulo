import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
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
        source={require('./../../assets/images/Logo-plum.png')}
        style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
      />
      <Animated.Image
        source={require('./../../assets/images/Logo-typo.png')}
        style={[styles.logoTypo, { transform: [{ scale: scaleAnim }] }]}
      />
      <Image
        source={require('./../../assets/images/graphicElements/Algea3.png')}
        style={styles.algea3}
      />
      <Image
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
  logo: {
    position: 'absolute',
    width: '42%',
    zIndex: 1,
    alignSelf: 'center',
    top: 0,
    marginTop: 500,
    resizeMode: 'contain'
  },
  logoTypo: {
    position: 'absolute',
    width: '50%',
    zIndex: 1,
    top: 0,
    marginTop: 0,
    alignSelf: 'center',
    tintColor: Colors.white,
    resizeMode: 'contain'
  },
  algea3: {
    position: 'absolute',
    width: '42%',
    zIndex: 0,
    top: 0,
    left: 0,
    marginLeft: '10%',
    marginTop: 500,
    tintColor: Colors.neutralGreen,
    resizeMode: 'contain'
  },
  algea2: {
    position: 'absolute',
    width: '15%',
    zIndex: 0,
    top: 0,
    right: 0,
    marginRight: '13%',
    marginTop: 550,
    tintColor: Colors.darkGreen,
    resizeMode: 'contain'
  },
  shadowLogo: {
    position: 'absolute',
    width: '40%',
    zIndex: 0,
    top: 0,
    marginTop: 730,
    alignSelf: 'center',
    tintColor: Colors.lightPlum,
    resizeMode: 'contain'
  },
  bubbles: {
    position: 'absolute',
    width: '70%',
    zIndex: 2,
    top: 0,
    marginTop: -270,
    alignSelf: 'center',
    tintColor: Colors.whiteTransparent,
    resizeMode: 'contain'
  },
});
