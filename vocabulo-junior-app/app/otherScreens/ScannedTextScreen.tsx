import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import OCRScannedTextScreen from '@/components/ScannedText/OCRScannedTextScreen';
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';


export default function ScannedTextScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Texte scanné" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
      <View style={styles.OCRScannedTextScreenComponent}>
      <OCRScannedTextScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey
  },
  OCRScannedTextScreenComponent: {
    marginTop: '-4%',
    flex: 1
  },

});
