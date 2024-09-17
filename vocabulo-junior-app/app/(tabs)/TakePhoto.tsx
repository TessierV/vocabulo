// This file defines the TakePhoto page, which is linked to the tab navigation bar and displays the content of TakePhotoScreen.

import { View, StyleSheet } from 'react-native'
import React from 'react'

import TakePhotoScreen from '../mainScreens/TakePhotoScreen';  // Importing the TakePhotoScreen component

export default function TakePhoto() {
  return (
    // Main container view that wraps the TakePhotoScreen component
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