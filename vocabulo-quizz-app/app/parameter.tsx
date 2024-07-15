import React from 'react';

import { StyleSheet, Text, View } from 'react-native'
import ParameterScreen from './screens/ParameterScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ParametersPage = () => {

    return (
      <GestureHandlerRootView>
        <ParameterScreen  />
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

export default ParametersPage;
