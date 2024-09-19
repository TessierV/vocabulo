// This file defines a function to load custom fonts asynchronously in a React Native (Expo) app.

import * as Font from 'expo-font';


// Defining an asynchronous function that loads custom fonts
const useCustomFonts = async (): Promise<boolean> => {
  try {
    // Loading custom fonts using Font.loadAsync
    await Font.loadAsync({
      'Chewy': require('./../assets/fonts/Chewy-Regular.ttf'),               // Loading the 'Chewy' font
      'MontserratBold': require('./../assets/fonts/Montserrat/Montserrat-Bold.ttf'),       // Loading 'Montserrat-Bold'
      'MontserratSemiBold': require('./../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'), // Loading 'Montserrat-SemiBold'
      'MontserratRegular': require('./../assets/fonts/Montserrat/Montserrat-Regular.ttf'),  // Loading 'Montserrat-Regular'
    });
    // If fonts are loaded successfully, return true
    return true;
  } catch (error) {
    // If there is an error, log it to the console and return false
    console.error('Error loading fonts:', error);
    return false;
  }
};

// Exporting the useCustomFonts function as the default export
export default useCustomFonts;
