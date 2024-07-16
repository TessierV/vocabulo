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
            transform: [{ translateY: moveAnim }]
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Algea3.png')}
          style={{
            width: 150,
            height: 175,
            zIndex: -1,
            marginLeft: -120,
            marginTop: 10
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Algea1.png')}
          style={{
            width: 100,
            height: 100,
            zIndex: -1,
            marginLeft: 230,
            marginTop: 115,
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
            transform: [{ scale: scaleAnim }]
          }}
        />
      </View>
      <View style={styles.Position}>
        <Animated.Image source={require('./../../assets/images/Bubbles.png')}
          style={{
            width: 280,
            height: 162,
            zIndex: 0,
            alignSelf: 'center',
            marginTop: -80,
            transform: [{ scale: scaleAnim }]
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