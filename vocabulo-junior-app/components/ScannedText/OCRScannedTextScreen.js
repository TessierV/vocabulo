import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function OCRScannedTextScreen() {
  const { ocrData } = useLocalSearchParams();  // Getting the passed parameter
  
  // Parse the JSON data if it's a string
  const parsedData = ocrData ? JSON.parse(ocrData) : {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>OCR Scanned Text</Text>
      <Text style={styles.jsonText}>
        {JSON.stringify(parsedData, null, 2)}  {/* Displaying the JSON data */}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jsonText: {
    fontSize: 16,
    fontFamily: 'monospace', // Use a monospaced font for better readability
    color: '#333',
  },
});
