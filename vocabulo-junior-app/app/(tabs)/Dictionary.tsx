// This file defines the Dictionnary page, which is linked to the tab navigation bar and displays the content of DictionaryScreen.

import { View, StyleSheet } from 'react-native';
import React from 'react';

import DictionaryScreen from '../mainScreens/DictionaryScreen'; // Importing the DictionaryScreen component

export default function Dictionnary() {
  return (
    // Main container view that wraps the DictionaryScreen component
    <View style={styles.container}>
      <DictionaryScreen />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
