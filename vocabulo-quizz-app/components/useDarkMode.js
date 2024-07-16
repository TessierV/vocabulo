import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadDarkModeState = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setDarkMode(storedDarkMode === 'true');
        }
      } catch (error) {
        console.error('Failed to load dark mode state from AsyncStorage:', error);
      }
    };

    loadDarkModeState();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      await AsyncStorage.setItem('darkMode', newMode.toString());
    } catch (error) {
      console.error('Failed to save dark mode state to AsyncStorage:', error);
    }
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
