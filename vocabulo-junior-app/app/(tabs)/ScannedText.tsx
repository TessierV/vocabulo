// This file defines the ScannedText page, which is linked to the tab navigation bar and displays the content of ScannedTextScreen.

import { View, StyleSheet } from 'react-native'
import React from 'react';

import ScannedTextScreen from '../otherScreens/ScannedTextScreen';  // Importing the ScannedTextScreen component

export default function ScannedText() {
  return (
    // Main container view that wraps the ScannedTextScreen component
    <View style={styles.container}>
      <ScannedTextScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});