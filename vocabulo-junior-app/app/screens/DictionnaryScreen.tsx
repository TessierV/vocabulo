import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';
import AllFilters from '@/components/Dictionnary/AllFilters';


export default function DictionnaryScreen() {
  return (
      <SafeAreaView style={styles.container}>
        <TopNavBar title="Accueil" tintColor={Colors.darkCoral} color={Colors.darkCoral} />
        <View style={styles.AllFiltersComponent}>
          <AllFilters />
        </View>
      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.lightGrey,
    },
    AllFiltersComponent: {
      flex: 1,
      marginTop: 0,
    },
  });
