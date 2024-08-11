import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import DictionnaryScreen from '../screens/DictionnaryScreen';


export default function Dictionnary() {
  return (
    <View style={styles.container}>
      <DictionnaryScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
