// SettingsScreen.js
// This file defines the settings screen in the application,
// displaying a top navigation bar and components for CustomProfile, sign out, and DeleteProfile.

import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

import { Colors } from '@/constants/Colors'; // Importing colors defined in constants

import TopNavBar from '@/components/navigation/TopNavBar'; // Importing the top navigation bar component
import CustomProfile from '@/components/Settings/CustomProfile'; // Importing the CustomProfile component
import DeleteProfile from '@/components/Settings/DeleteProfile'; // Importing the DeleteProfile component
import SignoutProfile from '@/components/Settings/SignoutProfile'; // Importing the SignoutProfile component

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Displaying the navigation bar with the title and specified colors */}
      <TopNavBar title="Paramètres" tintColor={Colors.darkBlue} color={Colors.darkBlue} />
      {/* Displaying the CustomProfile component */}
      <View style={styles.CustomProfileComponent}>
        <CustomProfile />
      </View>
      {/* Displaying the SignoutProfile component */}
      <View style={styles.SignoutProfileComponent}>
        <SignoutProfile />
      </View>
      {/* Displaying the DeleteProfile component */}
      <View style={styles.DeleteProfileComponent}>
        <DeleteProfile />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  CustomProfileComponent: {
    marginTop: 20
  },
  SignoutProfileComponent: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 70,
    paddingHorizontal: 15
  },
  DeleteProfileComponent: {
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    bottom: 50
  },
});
