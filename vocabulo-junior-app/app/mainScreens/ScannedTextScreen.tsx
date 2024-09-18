// ScannedTextScreen.js
// This file defines the scanned text screen in the application,
// displaying a navigation bar at the top and the OCR scanned text component.

import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

import { Colors } from '@/constants/Colors'; // Importing colors defined in constants

import TopNavBar from '@/components/navigation/TopNavBar'; // Importing the top navigation bar component
import OCRScannedTextScreen from '@/components/ScannedText/OCRScannedTextScreen'; // Importing the OCR scanned text component

export default function ScannedTextScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Displaying the navigation bar with the title and specified colors */}
      <TopNavBar title="Texte scanné" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
      <View style={styles.OCRScannedTextScreenComponent}>
        {/* Displaying the OCR scanned text component */}
        <OCRScannedTextScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  OCRScannedTextScreenComponent: {
    marginTop: '-4%',
    flex: 1,
  },
});
