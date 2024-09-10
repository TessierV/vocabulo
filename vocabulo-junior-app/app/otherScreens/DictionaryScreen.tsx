import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import { Colors } from '@/constants/Colors';
import AllFilters from '@/components/Dictionary/AllFilters';


export default function DictionaryScreen() {
  return (
      <SafeAreaView style={styles.container}>
        <TopNavBar title="Dictionnaire" tintColor={Colors.darkGreen} color={Colors.darkGreen} />
        <View style={styles.AllFiltersComponent}>
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
