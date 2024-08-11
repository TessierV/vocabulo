import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/navigation/TopNavBar';
import SortByAlphabet from '@/components/DictionnaryScreen/SortByAlphabet';
import { Colors } from '@/constants/Colors';
import DisplayDictionnary from '@/components/DictionnaryScreen/DisplayDictionnary';

export default function DictionnaryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Dictionnaire" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
      <View style={styles.SortByAlphabetComponent}>
        <SortByAlphabet />
      </View>
      <View style={styles.DisplayDictionnaryComponent}>
      <DisplayDictionnary />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  DisplayDictionnaryComponent: {
    marginTop: 100
  },
  SortByAlphabetComponent: {
    flex: 1,
    marginTop: 0
  },
});
