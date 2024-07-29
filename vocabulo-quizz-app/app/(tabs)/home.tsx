import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { Paragraph } from '@/constants/StyledText';
import HomeScreen from '../screens/HomeScreen';

const Page = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <View style={[
      styles.container,
      { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }
    ]}>

      <HomeScreen darkMode={darkMode} />
    </View>
  );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
