import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

import { darkTheme, lightTheme } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Paragraph } from '@/constants/StyledText';
// CustomizeRow component for displaying a customizable row
const CustomizeRow = ({ category, darkMode, onSelect, onRemove }) => {
  // Determine the theme based on darkMode prop
  const theme = darkMode ? darkTheme : lightTheme;

  // Check if a category is selected
  const isCategorySelected = category && category.textLabel;

  return (
    <View style={styles.container}>
      {/* TouchableOpacity for category selection */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.cardBackground }]}
        onPress={onSelect}
      >
        {/* Display category icon if available, otherwise show a search icon */}
        {category && category.icon ? (
          <SvgXml xml={category.icon} width={30} height={30} />
        ) : (
          <Feather
            name="search"
            size={25}
            color={darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade}
            style={styles.searchIcon}
          />
        )}
        {/* Display category difficulty if available */}
        {category && category.difficulty ? (
          <Paragraph style={[styles.label, { color: theme.textColor }]}>
            {category.difficulty}
          </Paragraph>
        ) : null}
      </TouchableOpacity>
      {/* Display remove button if a category is selected and onRemove prop is provided */}
      {isCategorySelected && onRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
        >
          <MaterialIcons name="cancel" size={20} color={theme.textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

// PropTypes validation for CustomizeRow component
CustomizeRow.propTypes = {
  category: PropTypes.shape({
    textLabel: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 80,
    height: 80,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  questionMark: {
    fontSize: 40,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default CustomizeRow;
