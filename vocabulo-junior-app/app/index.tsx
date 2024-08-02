import { Stack, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';

export default function Index() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <LoginScreen />
    </View>
  );
}
