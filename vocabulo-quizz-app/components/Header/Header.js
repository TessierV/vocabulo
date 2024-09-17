import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import logoImage from '@/assets/images/Logo_vocabuloText.png';
import logoImage_white from '@/assets/images/Logo_vocabuloText_white.png';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { Paragraph } from '@/constants/StyledText';
import InterfaceSvg from '@/SVG/InterfaceSvg';

const Header = ({ darkMode, PageTitle, firstLink, secondLink, iconName }) => {
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
            <InterfaceSvg iconName="arrowLeft" fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} width={26} height={26} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.logoContainer} onPress={() => navigateTo("/home")}>
        <Image source={darkMode ? logoImage_white : logoImage} style={styles.logo} />
        <Paragraph style={{ marginTop: 2, fontSize: 10, color: darkMode ? darkTheme.neutral : lightTheme.neutral }}>{PageTitle}</Paragraph>
      </TouchableOpacity>

      <View style={styles.rightContainer}>
        {secondLink !== "none" && (
          <TouchableOpacity onPress={() => navigateTo(secondLink)}>
            {/* Use iconName prop to dynamically choose the icon */}
            <InterfaceSvg iconName={iconName || "settings"} fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} width={26} height={26} />
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
    height: 110,
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
    textAlign: 'center',
  },
  logo: {
    width: 105,
    height: 25,
  },
});

export default Header;
