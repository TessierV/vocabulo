import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { wordsListFromDictionary, wordsListFromText } from '@/data/WordList'; // Assurez-vous que les chemins sont corrects

export default function CommonWordList() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CommonWordList</Text>
      
      <Text style={styles.subHeader}>Words from Text:</Text>
      {wordsListFromText.map((word, index) => (
        <Text key={`text-word-${index}`} style={styles.word}>{word}</Text>
      ))}
      <Text style={styles.subHeader}>Words from Dictionary:</Text>
      {wordsListFromDictionary.map((word, index) => (
        <Text key={`dictionary-word-${index}`} style={styles.word}>{word}</Text>
      ))}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  word: {
    fontSize: 16,
    marginVertical: 4,
  },
});
