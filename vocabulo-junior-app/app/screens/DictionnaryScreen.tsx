import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import TopNavBar from '@/components/Navigation/TopNavBar';
import SortByAlphabet from '@/components/Dictionnary/SortByAlphabet';
import { Colors } from '@/constants/Colors';
import DictionnaryCard from '@/components/Dictionnary/DictionnaryCard';
import SortByCategory from '@/components/Dictionnary/SortByCategory';

export default function DictionnaryScreen() {
  return (
      <SafeAreaView style={styles.container}>
        <TopNavBar title="Accueil" tintColor={Colors.darkCoral} color={Colors.darkCoral} />
        <View style={styles.SortByCategoryComponent}>
          <SortByCategory />
        </View>
        <View style={styles.SortByAphabetComponent}>
          <SortByAlphabet />
        </View>
        <View style={styles.DictionnaryCardComponent}>
          <DictionnaryCard />
        </View>

      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.lightGrey,
    },
    SortByAphabetComponent: {
      marginTop: 20,
    },
    SortByCategoryComponent: {
      marginTop: 20,
    },
    DictionnaryCardComponent: {
      marginTop: 20,
    },
  });
