import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import SortByAlphabet from './SortByAlphabet';

export default function ChangeAphabet() {
  return (
    <View style={styles.container}>
      <SortByAlphabet />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginHorizontal: 'auto'
    },
});
