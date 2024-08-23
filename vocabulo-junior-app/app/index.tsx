import { Stack, Tabs, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import TopNavBar from '@/components/Navigation/TopNavBar';
import LoginScreen from './screens/LoginScreen';
import DictionnaryScreen from './screens/DictionnaryScreen';
import Dictionnary from './(tabs)/Dictionnary';
import TakePhoto from './(tabs)/TakePhoto';
import TakePhotoScreen from './screens/TakePhotoScreen';
import ParametersScreen from './screens/SettingsScreen';
import ScannedTextScreen from './screens/ScannedTextScreen';
import TabLayout from './(tabs)/_layout';
import SplashScreen from './screens/SplashScreen';
import LogoSplash from '@/components/Splash/LogoSplash';
import AllFilters from '@/components/Dictionnary/AllFilters';
import DisplayCommunWords from '@/components/ScannedText/DisplayCommonWords';
import ScannedTextAnalyzed from '@/components/ScannedText/ScannedTextAnalyzed';

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
      <Dictionnary/>
    </View>
  );
}
