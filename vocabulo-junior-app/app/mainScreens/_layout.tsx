// This file defines the MainScreensLayout component to manage the navigation for main-related screens.

import { Stack } from "expo-router";
import React from "react";


export default function MainScreensLayout() {
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