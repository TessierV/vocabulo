import React, { useEffect, useState } from "react";
import useCustomFonts from '@/constants/useCustomFonts';
import { Stack } from "expo-router";


export default function RootLayout() {
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

    <Stack>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}
