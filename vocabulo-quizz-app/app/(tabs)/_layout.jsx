import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Octicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import logoImage from '../../assets/images/Logo_transparent.png'
import Colors from '@/constants/Colors';

export default function Layout() {
  return (
    <View style={{ bottom: 0, flex: 1, backgroundColor: Colors.neutralBody }}>
      <Tabs screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.body,
          padding: 0,
          borderTopWidth: 0,
          height: 75,
          margin: 5,
          borderRadius: 5,
          elevation: 0,
        },
        tabBarInactiveTintColor: Colors.lightGreen,
        tabBarActiveTintColor: Colors.lightCoral,
        tabBarShowLabel: false,
      }}>
        <Tabs.Screen
          name='index'
          options={{
            tabBarIcon: ({ color }) => (
              <Octicons name="home" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='category'
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="food-apple-outline" style={{ bottom: 3 }} size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='game'
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[
                styles.middle_container,
                focused && { backgroundColor: Colors.darkCoral }
              ]}>
                <Image source={logoImage} style={{ width: 36, height: 36, bottom: 2, right:1, tintColor: color }} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='library'
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="book-open" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  middle_container: {
    backgroundColor: Colors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    bottom: 35,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: Colors.neutralBody,
  }
});
