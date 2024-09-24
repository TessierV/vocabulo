import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { Paragraph } from '@/constants/StyledText';

const Separator = ({ text }) => {
  const [darkMode] = useDarkMode();

  return (
    <View style={styles.separatorContainer}>
      <View
        style={[
          styles.separator,
          {
            borderTopColor: darkMode ? darkTheme.light_darkShade : '#CCC',
          },
        ]}
      />
      <Paragraph
        style={{
          color: darkMode ? darkTheme.light_darkShade : '#CCC',
        }}
      >
        {text}
      </Paragraph>
      <View
        style={[
          styles.separator,
          {
            borderTopColor: darkMode ? darkTheme.light_darkShade : '#CCC',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    borderTopWidth: 1,
    width: '40%',
  },
});

export default Separator;
