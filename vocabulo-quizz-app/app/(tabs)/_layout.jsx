import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import useDarkMode from '@/components/useDarkMode';
import FooterSVG from '@/constants/svg';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { logoLetterSVG } from '@/SVG/logoSVG';

// Main layout component for the app
const Layout = () => {
  // Use custom hook to manage dark mode state
  const [darkMode] = useDarkMode();

  // Set tab bar background color based on dark mode
  const tabBarBgColor = darkMode ? darkTheme.light_darkShade : lightTheme.lightShade;

  // Function to determine icon fill color based on focus and dark mode
  const getIconFillColor = (focused) => (
    focused ? (darkMode ? color.darkPlum : color.darkBlue) : (darkMode ? darkTheme.dark_lightShade : lightTheme.neutral)
  );

  // Render the middle tab (logo) with special styling
  const renderMiddleTab = (focused) => (
    <View style={[
      styles.middleContainer,
      {
        borderColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade,
        backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade
      },
    ]}>
      <SvgXml xml={logoLetterSVG(focused, darkMode)} width="70%" height="70%" />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      {/* Tabs navigation setup */}
      <Tabs screenOptions={({ route }) => ({
        // Hide tab bar on index screen, customize appearance
        tabBarStyle: {
          ...styles.tabBar,
          display: route.name === 'index' ? 'none' : 'flex',
          backgroundColor: tabBarBgColor
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}>
        {/* Map through screen names to create tab bar items */}
        {['home', 'category', 'game', 'dictionary', 'profil'].map((screen, index) => (
          <Tabs.Screen
            key={screen}
            name={screen}
            options={{
              tabBarIcon: ({ focused }) =>
                // Render middle tab differently
                index === 2 ? renderMiddleTab(focused) : (
                  <FooterSVG
                    icon={screen}
                    fillColor={getIconFillColor(focused)}
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

// Styles for the layout
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    bottom: 25,
    borderRadius: 50,
    borderWidth: 5,
  },
});

export default Layout;