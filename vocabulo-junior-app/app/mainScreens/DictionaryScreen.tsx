// DictionaryScreen.js
// This file defines the dictionary screen in the application,
// displaying a navigation bar at the top and a list of filters.

import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

import { Colors } from '@/constants/Colors'; // Importing colors defined in constants

import TopNavBar from '@/components/Navigation/TopNavBar'; // Importing the top navigation bar component
import AllFilters from '@/components/Dictionary/AllFilters'; // Importing the filters component

export default function DictionaryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Displaying the navigation bar with the title and specified colors */}
      <TopNavBar title="Dictionnaire" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
      <View style={styles.AllFiltersComponent}>
        {/* Displaying filters and liked cards */}
        <AllFilters />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.lightGrey,
  },
  AllFiltersComponent: {
    flex: 1,
    marginTop: 0,
  },
});
