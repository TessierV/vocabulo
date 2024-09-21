import React from 'react'
import ProfileScreen from '../screens/ProfileScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Profil page
const Page = () => {
  return (
    <GestureHandlerRootView>
      <ProfileScreen  />
    </GestureHandlerRootView>
  );
};


export default Page
