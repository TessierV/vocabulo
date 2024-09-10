import { Stack, Tabs, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import TopNavBar from '@/components/Navigation/TopNavBar';
import LoginScreen from './screens/LoginScreen';
import DictionnaryScreen from './otherScreens/DictionaryScreen';
import Dictionnary from './(tabs)/Dictionary';
import TakePhoto from './(tabs)/TakePhoto';
import TakePhotoScreen from './otherScreens/TakePhotoScreen';
import ParametersScreen from './screens/SettingsScreen';
import TabLayout from './(tabs)/_layout';
import SplashScreen from './screens/SplashScreen';
import LogoSplash from '@/components/Splash/LogoSplash';
import AllFilters from '@/components/Dictionary/AllFilters';
import CustomProfile from '@/components/Settings/CustomProfile';
import SettingsScreen from './screens/SettingsScreen';
import OCRScannedTextScreen from '@/components/ScannedText/OCRScannedTextScreen';
import ScreensLayout from './screens/_layout';
import RootLayout from './_layout';
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
