import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import useCustomFonts from '@/constants/useCustomFonts';


export default function OtherScreensLayout() {
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
      <Stack.Screen name="CategoryScreen" options={{ headerShown: false }} />
      <Stack.Screen name="DictionaryScreen" options={{ headerShown: false }} />
      <Stack.Screen name="TakePhotoScreen"  options={{ headerShown: false }} />
      <Stack.Screen name="ScannedTextScreen"  options={{ headerShown: false }} />
    </Stack>
  );
}