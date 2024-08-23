import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';
import ScannedTextAnalyzed from '@/components/ScannedText/ScannedTextAnalyzed';

export default function ScannedTextScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Texte scanné" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
      <View style={styles.ScannedTextAnalyzed}><ScannedTextAnalyzed /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  ScannedTextAnalyzed : {
    flex: 1,
    marginTop: -100
  }
});
