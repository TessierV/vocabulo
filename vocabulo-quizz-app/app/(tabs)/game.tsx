import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import AIScreen from '../screens/AIScreen';

//Hybrid page
const Page = () => {
  const [darkMode] = useDarkMode();

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
      <AIScreen />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
