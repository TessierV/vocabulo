// TakePhotoScreen.js
// This file defines the photo-taking screen in the application,
// displaying a navigation bar at the top and the camera component.

import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors'; // Importing colors defined in constants

import TopNavBar from '@/components/Navigation/TopNavBar'; // Importing the top navigation bar component
import MyCamera from '@/components/Scan/MyCamera'; // Importing the camera component

export default function TakePhotoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Displaying the navigation bar with the title and specified colors */}
      <TopNavBar title="Scanner un texte" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
      <View style={styles.MyCameraComponent}>
        {/* Displaying the camera component */}
        <MyCamera />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MyCameraComponent: {
    marginTop: -50,
    flex: 1
  },
});
