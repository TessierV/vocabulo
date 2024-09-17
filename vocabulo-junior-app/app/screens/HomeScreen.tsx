// HomeScreen.js
// This file defines the home screen in the application,
// displaying a navigation bar at the top and various home components.

import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

import { Colors } from '@/constants/Colors'; // Importing colors defined in constants

import TopNavBar from '@/components/Navigation/TopNavBar'; // Importing the top navigation bar component
import GoToStart from '@/components/Home/GoToStart'; // Importing the GotoStart component
import DisplaySettings from '@/components/Home/DisplaySettings'; // Importing the displaySettings component
import HelpToScannText from '@/components/Home/HelpToScannText'; // Importing the helpToScanText component


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Displaying the navigation bar with the title and specified colors */}
      <TopNavBar title="Accueil" tintColor={Colors.darkBlue} color={Colors.darkBlue} />

      {/* Displaying the DisplaySettings component */}
      <View style={styles.DisplaySettingsComponent}>
        <DisplaySettings />
      </View>

      {/* Displaying the GotoStart component */}
      <View style={styles.GoToStartComponent}>
        <GoToStart />
      </View>

      {/* Displaying the HelpToScanText component */}
      <View style={styles.HelpToScanTextComponent}>
        <HelpToScannText />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  DisplaySettingsComponent: {
    marginTop: 20
  },
  GoToStartComponent: {
    flex: 1,
    marginTop: 100
  },
  HelpToScanTextComponent: {
    flex: 1,
    marginTop: -100
  },
});
