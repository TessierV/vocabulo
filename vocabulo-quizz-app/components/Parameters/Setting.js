import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { ContainerParagraph } from '@/constants/StyledText';
import ArrowImage from '@/assets/images/angle-small-right.png';  // Import the image

const Setting = ({ iconName, text, buttonText, onPress, darkMode, isLast }) => {
  const renderButtonOrImage = () => {
    if (buttonText) {
      return <Button title={buttonText} onPress={onPress} />;
    } else {
      return (
        <TouchableOpacity onPress={onPress}>
          <Image source={ArrowImage} style={styles.arrowImage} tintColor={darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade}/>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.setting, isLast && styles.lastSetting, { borderColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Feather name={iconName} size={15} color={darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade} />
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
