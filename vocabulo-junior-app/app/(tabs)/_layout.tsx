import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBarIonicons, TabBarMaterialIcon } from '@/components/Navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: Colors.darkCoral,
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
          borderColor: Colors.darkCoral
        },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="Dictionnary"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconLeft}>
              <TabBarIonicons
                name='book'
                color={color}
                style={[focused && styles.activeIcon]}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="TakePhoto"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconCenter}>
              <TabBarMaterialIcon
                name='enhance-photo-translate'
                color={color}
                style={[focused && styles.activeIcon]}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ScannedText"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconRight}>
              <TabBarIonicons
                name='document-text'
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
    backgroundColor: Colors.neutralCoral,
    borderRadius: 50,
    height: 60,
    width: 60,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  iconLeft: {
    marginLeft: '20%',
  },
  iconCenter: {
  },
  iconRight: {
    marginRight: '20%',
  },
});
