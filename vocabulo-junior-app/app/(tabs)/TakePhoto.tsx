import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TakePhotoScreen from '../screens/TakePhotoScreen'

export default function TakePhoto() {
  return (
    <View style={styles.container}>
      <TakePhotoScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});