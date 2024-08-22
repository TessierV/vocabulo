import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { CompareCommonWordsList } from './CompareCommonWordsList';
import { InformationText } from '@/constants/StyledText';

export default function DisplayCommunWords() {
  return (
      <View style={styles.container}>
        {CompareCommonWordsList.map((word, index) => (
          <InformationText key={`common-word-${index}`}>{word}</InformationText>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
