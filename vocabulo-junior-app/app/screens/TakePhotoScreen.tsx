import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import MyCamera from '@/components/Scan/MyCamera'
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';


export default function TakePhotoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Scanner un texte" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
      <View style={styles.MyCameraComponent}>
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
