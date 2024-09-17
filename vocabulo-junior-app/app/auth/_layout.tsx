// This file defines the AuthLayout component to manage the navigation for authentification-related screens.

import { Stack } from "expo-router";
import React from "react";


export {
  ErrorBoundary,
} from 'expo-router';

// Define unstable settings for navigation, specifying the initial route
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return <AuthLayout />;
}

function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="authSignup" options={{ headerShown: false }} />
      <Stack.Screen name="authLogin" options={{ headerShown: false }} />
    </Stack>
  );
}