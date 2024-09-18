// This file defines the LoginLayout component to manage the navigation for login-related screens.

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import the screen components used in the navigator
import HomeScreen from "@/app/screens/HomeScreen";
import Signup from "../authSignup/Signup";
import Login from "../authLogin/Login";

// Create a Stack Navigator instance
const Stack = createStackNavigator();

export default function LoginLayout() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
