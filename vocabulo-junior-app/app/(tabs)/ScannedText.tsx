import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScannedTextScreen from '../screens/ScannedTextScreen'

export default function ScannedText() {
  return (
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