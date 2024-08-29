import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryModal = ({ words }) => {
  return (
    <View style={styles.container}>
      {words.map(word => (
        <View key={word.mot_id} style={styles.wordItemContainer}>
          <Text style={styles.word}>{word.mot}</Text>
          <Text style={styles.definition}>{word.definition}</Text>
          {word.signes && word.signes.map((signe, index) => (
            <View key={index}>
              <Text>Sign URL: {signe.url_sign}</Text>
              <Text>Definition URL: {signe.url_def}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  wordItemContainer: {
    marginBottom: 10,
  },
  word: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  definition: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CategoryModal;
