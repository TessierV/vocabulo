import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/navigation/TopNavBar';
import GoToStart from '@/components/HomeScreen/GoToStart';
import { Colors } from '@/constants/Colors';
import DisplayProfile from '@/components/HomeScreen/DisplayProfile';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Accueil" tintColor={Colors.darkBlue} color={Colors.darkBlue} />
      <View style={styles.DisplayProfileComponent}>
      <DisplayProfile />
      </View>
      <View style={styles.GoToStartComponent}>
        <GoToStart />
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
