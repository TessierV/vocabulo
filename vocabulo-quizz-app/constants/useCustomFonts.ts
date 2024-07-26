import * as Font from 'expo-font';

const useCustomFonts = async (): Promise<boolean> => {
  try {
    await Font.loadAsync({
      'font-h1-bold': require('../assets/fonts/Arima/Arima-Bold.ttf'),
      'font-base-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'font-base': require('../assets/fonts/Montserrat-Regular.ttf'),
    });
    return true;
  } catch (error) {
    console.error('Error loading fonts:', error);
    return false;
  }
};

export default useCustomFonts;
