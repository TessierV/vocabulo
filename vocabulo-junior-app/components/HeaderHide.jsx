import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderHide = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Configure les options de navigation pour cacher l'en-tête
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return null;
};

const SomeScreen = () => {
  return (
    <View>
      <HeaderHide />
    </View>
  );
};

export default SomeScreen;
