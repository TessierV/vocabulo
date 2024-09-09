import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Paragraph } from '@/constants/StyledText';
import { color, lightTheme, darkTheme } from '@/constants/Colors';
import { imageDictionary } from '@/SVG/imageDictionary';
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from '@expo/vector-icons'; // Import Feather icons

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
          style={styles.button}
        >
          <Paragraph style={styles.buttonText}>{letter}</Paragraph>
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
          style={styles.button}
        >
          <Image
            source={imageDictionary[letter]}
            style={styles.image}
          />
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

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        minHeight: 40,
        paddingHorizontal: 10,
        marginBottom: 10,
        gap: 10,
        backgroundColor: darkMode ? darkTheme.dark_lightShade : lightTheme.lightShade,
      }}>
        <Feather name="search" size={20} color={darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade} />
        <TextInput
          value={searchTerm}
          onChangeText={handleSearchChange}
          placeholder="Rechercher un mot..."
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
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
    backgroundColor: lightTheme.dark_lightShade,
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
    borderColor: color.neutral,
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
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
    backgroundColor: lightTheme.darkShade,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
