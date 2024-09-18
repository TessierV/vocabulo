// This file defines the TabLayout component for rendering the tab navigation bar in the application.

import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TabBarMaterialCommunityIcon, TabBarMaterialIcon } from '@/components/Navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    // Main Tabs component which holds the screenOptions and individual tab screens
    <Tabs
      screenOptions={() => ({
        // Styling for the tab bar (background color, border, position, etc.)
        tabBarStyle: {
          backgroundColor: Colors.darkGreen,
          borderRadius: 100,
          height: 45,
          paddingLeft: 0,
          paddingRight: 0,
          position: 'absolute',
          left: '10%',
          right: '10%',
          bottom: '3%',
          shadowColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: Colors.darkGreen
        },
        // Active tab icon color
        tabBarActiveTintColor: Colors.white,
        // Inactive tab icon color
        tabBarInactiveTintColor: Colors.white,
        // Hide the header on the top of the screen
        headerShown: false,
      })}
    >
      {/* First Tab: Dictionary */}
      <Tabs.Screen
        name="Dictionary"
        options={{
          // No title for this tab
          title: '',
          // Render custom icon for the Dictionary tab
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconLeft}>
              <TabBarMaterialCommunityIcon
                name={focused ? 'book-open-page-variant' : 'book-open-blank-variant'}
                color={color}
                style={[focused && styles.activeIcon]}
              />
            </View>
          ),
        }}
      />
      
      {/* Second Tab: TakePhoto */}
      <Tabs.Screen
        name="TakePhoto"
        options={{
          // No title for this tab
          title: '',
          // Render custom icon for the TakePhoto tab
          tabBarIcon: ({ color, focused }) => (
            <View>
              <TabBarMaterialIcon
                name={focused ? 'camera' : 'camera-enhance'}
                color={color}
                style={[focused && styles.activeIcon]}
              />
            </View>
          ),
        }}
      />
      
      {/* Third Tab: ScannedText */}
      <Tabs.Screen
        name="ScannedText"
        options={{
          // No title for this tab
          title: '',
          // Render custom icon for the ScannedText tab
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconRight}>
              <TabBarMaterialCommunityIcon
                name={focused ? 'sticker-text' : 'sticker-text-outline'}
                color={color}
                style={[focused && styles.activeIcon]}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    backgroundColor: Colors.neutralGreen,
    borderRadius: 50,
    height: 60,
    width: 60,
    textAlignVertical: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  iconLeft: {
    marginLeft: '20%',
  },
  iconRight: {
    marginRight: '20%',
  },
});
