import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import logoImage from '@/assets/images/Logo_vocabuloText.png';
import logoImage_white from '@/assets/images/Logo_vocabuloText_white.png';

import { darkTheme, lightTheme } from '@/constants/Colors';

const Header = ({ darkMode, title, firstLink, secondLink }) => {
  const router = useRouter();

  const navigateTo = (path) => {
    if (path !== "none") {
      router.push(path);
    }
  };

  return (
    <View style={[styles.header, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
      <TouchableOpacity onPress={() => navigateTo(firstLink)}>
        {firstLink !== "none" && (
          <Feather name="chevron-left" size={24} color={darkMode ? darkTheme.icon : lightTheme.icon} />
        )}
      </TouchableOpacity>
      <Image source={darkMode ? logoImage_white : logoImage } style={styles.logo} />
      <TouchableOpacity onPress={() => navigateTo(secondLink)}>
        {secondLink !== "none" && (
          <Feather name="settings" size={24} color={darkMode ? darkTheme.icon : lightTheme.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    height: 100,
  },
  logo: {
    width: 105,
    height: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
