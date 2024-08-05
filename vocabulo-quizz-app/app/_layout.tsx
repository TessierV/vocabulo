import { FontAwesome } from "@expo/vector-icons";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import useCustomFonts from '@/constants/useCustomFonts';
import useDarkMode from '@/components/useDarkMode';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    async function loadFonts() {
      const fontsSuccessfullyLoaded = await useCustomFonts();
      if (fontsSuccessfullyLoaded) {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      } else {
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="parameter" options={{ headerShown: false, title: 'Paramètre' }} />
      <Stack.Screen name="random" options={{ headerShown: false, title: 'Random' }} />
      <Stack.Screen name="customize" options={{ headerShown: false, title: 'Customize' }} />

      <Stack.Screen name="index" options={{ headerShown: false, title: 'Index' }} />
    </Stack>
  );
}
