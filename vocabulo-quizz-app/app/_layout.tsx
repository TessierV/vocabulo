import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import useCustomFonts from '@/constants/useCustomFonts';
import useDarkMode from '@/components/useDarkMode';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    async function loadFonts() {
      const fontsSuccessfullyLoaded = await useCustomFonts();
      if (fontsSuccessfullyLoaded) {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      } else {
        // Handle the case where fonts did not load successfully
        console.error('Échec du chargement des polices.');
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="parameter" options={{ headerShown: false, title: 'Paramètre' }} />
      <Stack.Screen name="random" options={{ headerShown: false, title: 'Random' }} />
      <Stack.Screen name="customize" options={{ headerShown: false, title: 'Customize' }} />
      <Stack.Screen name="quiz" options={{ headerShown: false, title: 'Quizz' }} />

      <Stack.Screen name="index" options={{ headerShown: false, title: 'Index' }} />
      <Stack.Screen name="wordlist/[categorie_id]" initialParams={{ mainCategoryWords: [], subcategories: [] }}
        options={{ headerShown: false, title: 'Liste des mots' }} />
      <Stack.Screen name="subcat/[subcat_id]" options={{ title: 'Subcategory Details' }} />

    </Stack>
  );
}
