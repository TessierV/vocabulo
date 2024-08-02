import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MyCamera from '@/components/Scan/MyCamera'


export default function TakePhotoScreen() {
  return (
    <View style={styles.BackgroundContainer}>
      <MyCamera />
    </View>
  )
}

const styles = StyleSheet.create({
    BackgroundContainer: {
        width: '100%',
        height: '100%'
    }
});