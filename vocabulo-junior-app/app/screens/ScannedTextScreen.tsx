import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';
import ScannedText from '@/components/ScannedTextScreen/ScannedText';

export default function ScannedTextScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Accueil" tintColor={Colors.darkCoral} color={Colors.darkCoral} />
      <View style={styles.DisplayProfileComponent}>
      <ScannedText />
      </View>
      <View style={styles.GoToStartComponent}>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  DisplayProfileComponent: {
    marginTop: 20
  },
  GoToStartComponent: {
    flex: 1,
    marginTop: 100
  },
});
