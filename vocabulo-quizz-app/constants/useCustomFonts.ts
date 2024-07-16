import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'font-base': require('../assets/fonts/Montserrat-Regular.ttf'),
    'font-base-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'font-h1': require('../assets/fonts/Arima-Medium.ttf'),
    'font-h1-bold': require('../assets/fonts/Arima/Arima-Bold.ttf'),
  });

  return fontsLoaded;
};

export default useCustomFonts;
