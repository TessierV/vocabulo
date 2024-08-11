import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import SortByAlphabet from '@/components/DictionnaryScreen/SortByAlphabet';
import { Colors } from '@/constants/Colors';
import DisplayDictionnary from '@/components/DictionnaryScreen/DisplayDictionnary';

export default function DictionnaryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Dictionnaire" tintColor={Colors.darkCoral} color={Colors.darkCoral} />
      <View style={styles.SortByAlphabetComponent}>
        <SortByAlphabet />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  SortByAlphabetComponent: {
    flex: 1,
    marginTop: 0
  },
});
