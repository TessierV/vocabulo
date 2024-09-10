import React, { useEffect, useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import useCustomFonts from '@/constants/useCustomFonts';


type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function ScreensLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      const fontsSuccessfullyLoaded = await useCustomFonts();
      if (fontsSuccessfullyLoaded) {
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}