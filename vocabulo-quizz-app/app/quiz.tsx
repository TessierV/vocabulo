import React from 'react';

import { StyleSheet, Text, View } from 'react-native'
import QuizScreen from './screens/QuizScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const QuizPage = () => {

    return (
      <GestureHandlerRootView>
        <QuizScreen  />
      </GestureHandlerRootView>
    );
  };

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

export default QuizScreen;
