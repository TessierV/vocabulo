import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Octicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import logoImage from '../../assets/images/Logo_typo.png';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';

export default function Layout() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Tabs screenOptions={({ route }) => ({
        tabBarStyle: ((route) => {
          const routesToHideTabBar = ['profile', 'index'];
          if (routesToHideTabBar.includes(route.name)) {
            return { display: 'none' };
          }
          return [
            styles.tabBar,
            { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }
          ];
        })(route),
        tabBarInactiveTintColor: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
        tabBarActiveTintColor: color.darkGreen,
        tabBarShowLabel: false,
      })}>
        <Tabs.Screen
          name='home'
          options={{
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <Feather name="home" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='category'
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="food-apple-outline" style={styles.categoryIcon} size={32} color={color} />
            ),
          }}
        />
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
        <Tabs.Screen
          name='dictionary'
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="book-open" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    padding: 0,
    borderTopWidth: 0,
    height: 75,
    margin: 5,
    borderRadius: 7,
    elevation: 0,
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
  categoryIcon: {
    bottom: 3,
  },
  logoImage: {
    width: 50,
    height: 41,
    right: 2,
  },
});
