import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme, color } from '@/constants/Colors';

const SearchBar = ({ darkMode, searchQuery, setSearchQuery, placeholder }) => {
  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade, borderColor: darkMode ? darkTheme.light_darkShade : color.neutral }]}>
      <Feather name="search" size={20} color={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade} />
      <TextInput
        style={[styles.input, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}
        placeholder={placeholder}
        placeholderTextColor={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    minHeight: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
  },
});

export default SearchBar;
