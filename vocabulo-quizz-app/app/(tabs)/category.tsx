import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
const Page = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <View style={[
      styles.container,
      { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }
    ]}>
      <Text style={{ color: darkMode ? darkTheme.text : lightTheme.text }}>Category</Text>
    </View>
  );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: lightTheme.text,
  }
});
