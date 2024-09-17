// This file defines the RootLayout component to manage the navigation for all-related screens.

import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import useCustomFonts from '@/constants/useCustomFonts';

// Export the ErrorBoundary component from expo-router
export {
  ErrorBoundary,
} from 'expo-router';

// Define unstable settings for navigation, specifying the initial route
export const unstable_settings = {
  initialRouteName: 'screens',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  useEffect(() => {
    // Function to load custom fonts
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
      <Stack.Screen name="mainScreens"  options={{ headerShown: false }} />
    </Stack>
  );
}