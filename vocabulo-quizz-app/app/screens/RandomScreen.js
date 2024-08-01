import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { texts } from '@/constants/texts';
import Header from '@/components/Header';

const categories = texts.categories;

const getRandomCategory = (categories) => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

const RandomScreen = () => {
  const [darkMode] = useDarkMode();
  const [randomCategory, setRandomCategory] = useState(getRandomCategory(categories));
  const navigation = useNavigation();

  const handleRandomize = () => {
    setRandomCategory(getRandomCategory(categories));
  };

  const handleValidate = () => {
    const routeName = randomCategory.route.replace('/', '');
    navigation.navigate(routeName);
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }
    ]}>
            <Header darkMode={darkMode} title="Random Category" firstLink="/home" secondLink="none" />

      <Text style={[styles.header, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>
        Aléatoire
      </Text>

      <View style={styles.iconContainer}>
        <SvgXml xml={randomCategory.icon} width={50} height={50} />
      </View>

      <Text style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>
        {`Text Label: ${randomCategory.textLabel}`}
      </Text>

      <Text style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>
        {`Difficulty: ${randomCategory.difficulty}`}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Randomize" onPress={handleRandomize} />
        <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
          <Text style={styles.validateButtonText}>Validate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  validateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  validateButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RandomScreen;
