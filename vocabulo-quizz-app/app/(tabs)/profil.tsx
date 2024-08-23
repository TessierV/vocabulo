import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileScreen from '../screens/ProfileScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Page = () => {
  return (
    <GestureHandlerRootView>
      <ProfileScreen  />
    </GestureHandlerRootView>
  );
};


export default Page

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
