import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors'

export default function LogoSplash() {

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
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
    ).start();
  }, [scaleAnim]);


  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
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
    ).start();
  }, [moveAnim]);

  return (
    <View style={styles.Position}>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Logo-red.png')}
          style={{
            width: 180,
            height: 171,
            zIndex: 1,
            alignSelf: 'center',
            marginTop: 60,
            transform: [{ translateY: moveAnim }],
            tintColor: Colors.darkCoral
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Logo-typo.png')}
          style={{
            width: 250,
            height: 205,
            marginTop: -350,
            zIndex: 1,
            transform: [{ scale: scaleAnim }],
            tintColor: Colors.beige
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Algea3.png')}
          style={{
            width: 180,
            height: 177,
            zIndex: -1,
            marginLeft: -160,
            marginTop: 20,
            tintColor: Colors.neutralGreen
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Algea2.png')}
          style={{
            width: 60,
            height: 80,
            zIndex: -1,
            marginLeft: 230,
            marginTop: 130,
            tintColor: Colors.darkGreen
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Shadow-logo.png')}
          style={{
            width: 150,
            height: 17,
            zIndex: 0,
            alignSelf: 'center',
            marginTop: 245,
            transform: [{ scale: scaleAnim }],
            tintColor: Colors.lightCoral
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Bubbles.png')}
          style={{
            width: 280,
            height: 162,
            zIndex: 2,
            alignSelf: 'center',
            marginTop: -80,
            transform: [{ scale: scaleAnim }],
            tintColor: Colors.beigeTransparent
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Position: {
    position: 'absolute',
    alignItems: 'center'
  }
})