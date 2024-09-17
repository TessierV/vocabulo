// This file defines the ScreensLayout component to manage the navigation for secondary-related screens.

import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

// Import the screen components used in the navigator
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";

// Define the types for the parameters of the stack navigator's screens
type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

// Create a Stack Navigator instance
const Stack = createStackNavigator<RootStackParamList>();

export default function ScreensLayout() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}