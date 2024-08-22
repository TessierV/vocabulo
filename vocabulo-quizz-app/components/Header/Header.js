import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import logoImage from '@/assets/images/Logo_vocabuloText.png';
import logoImage_white from '@/assets/images/Logo_vocabuloText_white.png';
import { darkTheme, lightTheme } from '@/constants/Colors';
import HeaderSvg from './SvgIcon';

const Header = ({ darkMode, firstLink, secondLink, customSvg }) => {
  const router = useRouter();

  const navigateTo = (path) => {
    if (path !== "none") {
      router.push(path);
    }
  };

  return (
    <View style={[styles.header, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <View style={styles.leftContainer}>
        {firstLink !== "none" && (
          <TouchableOpacity onPress={() => navigateTo(firstLink)}>
            <HeaderSvg icon="arrowLeft" fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.logoContainer}>
        <Image source={darkMode ? logoImage_white : logoImage} style={styles.logo} />
      </View>
      <View style={styles.rightContainer}>
        {secondLink !== "none" && (
          <TouchableOpacity onPress={() => navigateTo(secondLink)}>
            {customSvg ? customSvg : <HeaderSvg icon="settings" fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    height: 100,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 105,
    height: 25,
  },
});

export default Header;
