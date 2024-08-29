import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SvgIcon from '@/components/Card/SvgIcon';
import { Paragraph, Subtitle } from '@/constants/StyledText';
import { darkTheme, lightTheme } from '@/constants/Colors';

const HomeModalCategory = ({ categoryName, filteredWordCount, totalWordCount, filter, setFilter, darkMode, handleGoToWordList }) => {
  const textColor = darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade;

  return (
    <View style={styles.subcategoryContainer}>
      <Subtitle>Thème</Subtitle>
      <View style={[styles.subcategoryItem, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]}>
        <View style={styles.categoryRowIcon}>
          <SvgIcon icon={categoryName} fillColor={textColor} />
          <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
            {categoryName}
          </Paragraph>
        </View>
        <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
          {filteredWordCount} / {totalWordCount}
        </Paragraph>
      </View>

      <View style={styles.filterContainer}>
        {['TOUT', 'EASY', 'MIDDLE', 'HARD'].map(difficulty => (
          <TouchableOpacity
            key={difficulty}
            style={[styles.filterButton, filter === difficulty && styles.activeFilterButton]}
            onPress={() => setFilter(difficulty)}
          >
            <Text style={[styles.filterText, filter === difficulty && styles.activeFilterText]}>
              {difficulty}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.wordListButton} onPress={handleGoToWordList}>
        <Text style={styles.wordListButtonText}>Voir la liste des mots</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subcategoryContainer: {
    marginTop: 20,
    gap: 5,
    width: '100%',
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  categoryRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  subcategoryText: {
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeFilterButton: {
    backgroundColor: '#333',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  wordListButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  wordListButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeModalCategory;
