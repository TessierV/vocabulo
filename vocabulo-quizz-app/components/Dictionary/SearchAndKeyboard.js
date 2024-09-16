import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Paragraph } from '@/constants/StyledText';
import { color, lightTheme, darkTheme } from '@/constants/Colors';
import { imageDictionary } from '@/SVG/imageDictionary';
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from '@expo/vector-icons';
import { dictionary } from '@/constants/texts';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const normalizeCharacter = (char) => {
  const map = {
    'é': 'e',
    'ë': 'e',
    'ê': 'e',
    'è': 'e',
    'à': 'a',
    'â': 'a',
    'ï': 'i',
    'ç': 'c',
  };
  return map[char.toLowerCase()] || char.toLowerCase();
};

const normalizeSearchTerm = (term) => term.split('').map(normalizeCharacter).join('');

const SearchAndKeyboard = ({ searchTerm, setSearchTerm, handleLetterPress, darkMode, handleSearchValidation }) => {
  const [showImageKeyboard, setShowImageKeyboard] = useState(false);

  // Normalize the search term before passing it to the search handler
  const handleSearchChange = (text) => {
    const normalizedText = normalizeSearchTerm(text);
    setSearchTerm(normalizedText);
    handleSearchValidation(normalizedText); // Pass the normalized text to the search handler
  };

  const renderLetterKeyboard = () => (
    <View style={styles.keyboardContainer}>
      {alphabet.map((letter) => (
        <TouchableOpacity
          key={letter}
          onPress={() => handleLetterPress(letter)}
          style={[styles.button, {
            borderWidth: 1,
            borderColor: darkMode ? darkTheme.light_darkShade : color.neutral,
          }]}
        >
          <Paragraph style={[styles.buttonText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade }]}>{letter}</Paragraph>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => setShowImageKeyboard(!showImageKeyboard)}
        style={styles.toggleButton}
      >
        <Icon name={showImageKeyboard ? 'refresh-cw' : 'refresh-ccw'} size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderImageKeyboard = () => (
    <View style={styles.keyboardContainer}>
      {alphabet.map((letter) => (
        <TouchableOpacity
          key={letter}
          onPress={() => handleLetterPress(letter)}
          style={[styles.button, {
            borderWidth: 1,
            borderColor: darkMode ? darkTheme.light_darkShade : color.neutral,
          }]}
        >
          <Image
            source={imageDictionary[letter]}
            style={styles.image}
            tintColor={darkMode ? darkTheme.neutral : lightTheme.darkShade}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => setShowImageKeyboard(!showImageKeyboard)}
        style={[styles.toggleButton ]}
      >
        <Icon name={showImageKeyboard ? 'refresh-cw' : 'refresh-ccw'} size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        minHeight: 40,
        paddingHorizontal: 10,
        marginBottom: 10,
        gap: 10,
        backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade, borderColor: darkMode ? darkTheme.light_darkShade : color.neutral, borderWidth: 1,
      }}>
        <Feather name="search" size={20} color={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade} />
        <TextInput
          value={searchTerm}
          onChangeText={handleSearchChange}
          placeholder={dictionary.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade} // Placeholder color
          keyboardType="default"
          style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade }}
        />
      </View>
      {showImageKeyboard ? renderImageKeyboard() : renderLetterKeyboard()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: lightTheme.lightShade,
    padding: 10,
    minHeight: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
  image: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  toggleButton: {
    width: 80,
    height: 40,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.darkShade,
  },
  validateButton: {
    marginTop: 20,
  },
  validateButtonText: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default SearchAndKeyboard;
