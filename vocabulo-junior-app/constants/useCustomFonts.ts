import * as Font from 'expo-font';

const useCustomFonts = async (): Promise<boolean> => {
  try {
    await Font.loadAsync({
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