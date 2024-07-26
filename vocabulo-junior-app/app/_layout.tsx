import React, { useEffect, useState } from "react";
import useCustomFonts from '@/constants/useCustomFonts';
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "./auth/Signup/Detail";
import Dashboard from "./auth/Signup/Dashboard";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
/*import { Stack } from "expo-router";*/

const Stack = createStackNavigator();

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
    /*<Stack >
      <Stack.Screen name="index"></Stack.Screen>
    </Stack>*/
    <Stack.Navigator initialRouteName="auth/Signup/Signup">
      <Stack.Screen name="auth/Signup/Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="auth/Signup/Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="auth/Signup/Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="auth/Login/Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
