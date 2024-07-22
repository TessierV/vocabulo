import * as Font from 'expo-font';

const useCustomFonts = async (): Promise<boolean> => {
  try {
    await Font.loadAsync({
    'font-h15': require('./../assets/fonts/Arima/Arima-Bold.ttf'),
    'font-h12': require('./../assets/fonts/TitanOne-Regular.ttf'),
    'font-h13': require('./../assets/fonts/GochiHand-Regular.ttf'),
    'font-h14': require('./../assets/fonts/ConcertOne-Regular.ttf'),
    'Chewy': require('./../assets/fonts/Chewy-Regular.ttf'),
    'MontserratBold': require('./../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    'MontserratSemiBold': require('./../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    'MontserratRegular': require('./../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  });
  return true;
} catch (error) {
  console.error('Error loading fonts:', error);
  return false;
}
};

export default useCustomFonts;