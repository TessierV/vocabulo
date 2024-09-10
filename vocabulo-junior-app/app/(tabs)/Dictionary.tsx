import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import DictionaryScreen from '../otherScreens/DictionaryScreen';


export default function Dictionnary() {
  return (
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
