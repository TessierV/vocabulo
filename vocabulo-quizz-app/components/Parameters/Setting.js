import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '@/constants/Colors';

const Setting = ({ iconName, text, buttonText, onPress, darkMode, isLast }) => {
  return (
    <View style={[styles.setting, isLast && styles.lastSetting, {borderColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade}]}>
      <Feather name={iconName} size={15} color={darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade} />
      <Text style={[styles.settingText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>{text}</Text>
      <Button title={buttonText} onPress={onPress}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    borderBottomWidth: 1,
    padding: 5,
    paddingHorizontal: 8,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
  },
  lastSetting: {
    borderBottomWidth: 0,
  },
});

export default Setting;
