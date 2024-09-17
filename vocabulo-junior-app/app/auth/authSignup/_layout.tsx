// This file defines the SignupLayout component to manage the navigation for signup-related screens.

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import the screen components used in the navigator
import Detail from "./Detail";
import Signup from "./Signup";
import Login from "../authLogin/Login";

// Create a Stack Navigator instance
const Stack = createStackNavigator();

export default function SignupLayout() {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
