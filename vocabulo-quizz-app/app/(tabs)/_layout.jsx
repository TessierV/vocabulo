import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import logoImage from '../../assets/images/Logo_typo.png';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import FooterSVG from '@/constants/svg';

const Layout = () => {
  const [darkMode] = useDarkMode();

  const getFillColor = (focused) => {
    const { neutralBlue, neutralPlum } = color;
    const { dark_lightShade, light_darkShade } = darkMode ? darkTheme : lightTheme;
    return focused ? (darkMode ? neutralBlue : neutralPlum) : (darkMode ? dark_lightShade : light_darkShade);
  };

  const tabBarBackgroundColor = darkMode ? darkTheme.light_darkShade : lightTheme.lightShade;
  const routesToHideTabBar = ['profile', 'index'];

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Tabs screenOptions={({ route }) => ({
        tabBarStyle: routesToHideTabBar.includes(route.name) ? { display: 'none' } : [styles.tabBar, { backgroundColor: tabBarBackgroundColor }],
        tabBarInactiveTintColor: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
        tabBarActiveTintColor: color.darkGreen,
        tabBarShowLabel: false,
      })}>
        {['home', 'category'].map((screen) => (
          <Tabs.Screen
            key={screen}
            name={screen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <FooterSVG
                  icon={screen}
                  fillColor={getFillColor(focused)}
                />
              ),
            }}
          />
        ))}
        <Tabs.Screen
          name='game'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={[
                styles.middleContainer,
                { borderColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade },
                focused && { backgroundColor: color.neutralPlum }
              ]}>
                <Image source={logoImage} style={[
                  styles.logoImage,
                  { tintColor: darkMode ? darkTheme.darkShade : lightTheme.lightShade }
                ]} />
              </View>
            ),
          }}
        />
        {['dictionary', 'profile'].map((screen) => (
          <Tabs.Screen
            key={screen}
            name={screen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <FooterSVG
                  icon={screen}
                  fillColor={getFillColor(focused)}
                  width={screen === 'dictionary' ? 30 : 24}
                  height={screen === 'dictionary' ? 30 : 24}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    padding: 0,
    borderTopWidth: 0,
    height: 75,
    marginBottom: 5,
    borderRadius: 8,
    elevation: 0,
    marginHorizontal: 5,
  },
  middleContainer: {
    backgroundColor: color.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    bottom: 25,
    borderRadius: 50,
    borderWidth: 5,
  },
  logoImage: {
    width: 50,
    height: 41,
    right: 2,
  },
});

export default Layout;
