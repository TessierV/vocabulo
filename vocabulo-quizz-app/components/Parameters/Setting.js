import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '@/constants/Colors';

const Setting = ({ iconName, text, buttonText, onPress, darkMode, isLast }) => {
  return (
    <View style={[styles.setting, isLast && styles.lastSetting, {borderColor: darkMode ? darkTheme.background : lightTheme.background}]}>
      <Feather name={iconName} size={15} color={darkMode ? darkTheme.icon_container : lightTheme.icon_container} />
      <Text style={[styles.settingText, { color: darkMode ? darkTheme.text_container : lightTheme.text_container }]}>{text}</Text>
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
