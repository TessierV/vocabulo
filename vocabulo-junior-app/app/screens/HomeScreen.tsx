import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import GoToStart from '@/components/HomeScreen/GoToStart';
import { Colors } from '@/constants/Colors';
import DisplaySettings from '@/components/HomeScreen/DisplaySettings';

export default function HomeScreen() {
  return (
    
    <SafeAreaView style={styles.container}>
      <TopNavBar title="Accueil" tintColor={Colors.darkBlue} color={Colors.darkBlue} />
      <View style={styles.DisplaySettingsComponent}>
      <DisplaySettings />
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
  DisplaySettingsComponent: {
    marginTop: 20
  },
  GoToStartComponent: {
    flex: 1,
    marginTop: 100
  },
});
