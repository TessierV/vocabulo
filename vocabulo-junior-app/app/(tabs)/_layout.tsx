import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {

  return (
    <Tabs screenOptions={({ route }) => ({
      tabBarStyle: ((route) => {
        const routesToHideTabBar = [''];
        if (routesToHideTabBar.includes(route.name)) {
          return { display: 'none' };
        }
        return [
          styles.TapBarContainer
        ];
      })(route),
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
        headerShown: false,
      })}>
      <Tabs.Screen
        name="Dictionnary"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TakePhoto"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'scan-circle' : 'scan-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ScannedText"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  TapBarContainer: {
    backgroundColor: Colors.darkGreen,
    height: 80,
    padding: 0,
    paddingLeft: 30,
    paddingRight: 30,
  }
});