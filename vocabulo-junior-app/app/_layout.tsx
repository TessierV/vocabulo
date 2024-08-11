import { FontAwesome } from "@expo/vector-icons";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import useCustomFonts from '@/constants/useCustomFonts';


export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth"  options={{ headerShown: false }} />
      <Stack.Screen name="screens"  options={{ headerShown: false }} />
    </Stack>
  );
}