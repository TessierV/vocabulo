import { FontAwesome } from "@expo/vector-icons";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import useDarkMode from '@/components/useDarkMode';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/Arima-Medium.ttf'), ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />
}

function RootLayoutNav() {
  const [darkMode, toggleDarkMode] = useDarkMode();


  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="parameter" options={{ headerShown: false, title: 'Test Screen' }} />
    </Stack>
  );
}

