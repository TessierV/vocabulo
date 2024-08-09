import { View, Text } from 'react-native'
import React from 'react'
import TopNavBar from '@/components/navigation/TopNavBar'
import { Colors } from '@/constants/Colors'

export default function HomeScreen() {
  return (
    <View>
      <TopNavBar title="Accueil" tintColor={Colors.darkPlum} color={Colors.darkPlum} />
    </View>
  )
}