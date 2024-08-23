import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { ContainerParagraph } from '@/constants/StyledText';
import ParameterSvg from './SvgIcon';

const Setting = ({ iconName, text, buttonText, onPress, darkMode, isLast }) => {
  const fillColor = darkMode ? darkTheme.lightShade : lightTheme.light_darkShade;

  const renderButtonOrImage = () => {
    if (buttonText) {
      return <Button title={buttonText} onPress={onPress} />;
    } else {
      return (
        <TouchableOpacity onPress={onPress}>
          <ParameterSvg icon="arrowRight" fillColor={fillColor} style={styles.arrowImage} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.setting, isLast && styles.lastSetting, { borderColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <ParameterSvg icon={iconName} fillColor={fillColor} />
      <ContainerParagraph style={[styles.settingText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>{text}</ContainerParagraph>
      {renderButtonOrImage()}
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
    gap: 10,
  },
  settingText: {
    flex: 1,
  },
  lastSetting: {
    borderBottomWidth: 0,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
});

export default Setting;
