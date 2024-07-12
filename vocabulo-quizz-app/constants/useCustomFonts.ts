import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  useFonts({
    'font-base': require('../assets/fonts/Montserrat-Regular'),
    'font-base-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'font-h1': require('../assets/fonts/Arima/Arima.ttf'),
  });
};

export default useCustomFonts;
