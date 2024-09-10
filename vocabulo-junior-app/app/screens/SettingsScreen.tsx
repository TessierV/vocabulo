import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';
import CustomProfile from '@/components/Settings/CustomProfile';
import DeleteProfile from '@/components/Settings/DeleteProfile';
import SignoutProfile from '@/components/Settings/SignoutProfile';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Paramètres" tintColor={Colors.darkBlue} color={Colors.darkBlue} />
      <View style={styles.CustomProfileComponent}>
        <CustomProfile />
      </View>
      <View style={styles.SignoutProfileComponent}>
        <SignoutProfile />
      </View>
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
