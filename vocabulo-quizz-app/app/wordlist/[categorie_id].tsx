//wordlist/[categorie_id].tsx
import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
  import HomeListQuizz from '@/app/screens/Quizz/HomeListQuizz';

  const WordListScreen = () => {
    return (
      <View style={styles.container}>
        <HomeListQuizz />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });



export default WordListScreen;
