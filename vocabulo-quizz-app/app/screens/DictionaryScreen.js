import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';

const DictionaryScreen = () => {
  const [darkMode] = useDarkMode();
  const { width, height } = useWindowDimensions();

  return (
    <>
          <Header darkMode={darkMode} title="Category" firstLink="/home" secondLink="none" />
      <View style={[styles.textContainer, { width: width * 0.9, height: height * 0.8 }]}>
        <Text style={[styles.text, { color: darkMode ? darkTheme.textColor : lightTheme.textColor }]}>
          This is a simple page with text content. Adjust the background and text colors based on the selected theme.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default DictionaryScreen;
