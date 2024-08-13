import { Stack, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import TopNavBar from '@/components/navigation/TopNavBar';

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
      <HomeScreen />
    </View>
  );
}
