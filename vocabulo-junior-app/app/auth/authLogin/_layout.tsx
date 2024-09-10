import React, { useEffect, useState } from "react";
import useCustomFonts from '@/constants/useCustomFonts';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/app/screens/HomeScreen";
import Signup from "../authSignup/Signup";
import Login from "../authLogin/Login";

const Stack = createStackNavigator();

export default function LoginLayout() {
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
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
