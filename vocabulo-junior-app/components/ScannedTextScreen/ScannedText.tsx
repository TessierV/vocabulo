import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { BasicText } from '@/constants/StyledText';

export default function ScannedText() {
  const DictionnaryWord = "Mot trouvé dans le dictionnaire";
  return (
    <View style={styles.container}>
      <BasicText style={styles.text}>
        Lorem ipsum lorem ipsum lorem ipsum lorem{' '}
        <Text style={styles.dictionnaryWord}>{DictionnaryWord}</Text>{' '}
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
      </BasicText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 15
  },
  text: {
    lineHeight: 35
  },
  dictionnaryWord: {
    color: Colors.darkCoral,
    fontWeight: 'bold',
  }
});
