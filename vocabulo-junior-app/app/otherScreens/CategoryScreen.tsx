import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import OCRScannedTextScreen from '@/components/ScannedText/OCRScannedTextScreen';
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';


export default function CategoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Dictionnaire simplifié" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
