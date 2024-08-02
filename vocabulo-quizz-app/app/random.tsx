import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import {Paragraph} from '@/constants/StyledText';
import RandomScreen from './screens/RandomScreen'

const randomPage = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <View style={[
      styles.container,
      { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }
    ]}>
        <RandomScreen  />
        </View>
  );
}

export default randomPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
