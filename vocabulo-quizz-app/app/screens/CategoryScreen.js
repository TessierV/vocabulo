import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import SelectDifficulty from '@/components/Category/SelectDifficulty';
import SectionTitle from '@/components/SectionTitle';
import { texts } from '@/constants/texts';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';

const Page = () => {
  const [darkMode] = useDarkMode();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');

  const handleFilterChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const filteredCategories = texts.categories
    .filter((category) =>
      (!selectedDifficulty || category.difficulty === selectedDifficulty) &&
      category.textLabel.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'A-Z':
          return a.textLabel.localeCompare(b.textLabel);
        case 'Z-A':
          return b.textLabel.localeCompare(a.textLabel);
        case 'OLD':
          return a.id - b.id; // Ascending by ID
        case 'NEW':
          return b.id - a.id; // Descending by ID
        default:
          return 0;
      }
    });

  return (
    <>
      <Header darkMode={darkMode} title="Category" firstLink="/home" secondLink="none" />
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}
      >
        <SelectDifficulty
          darkMode={darkMode}
          onFilterChange={handleFilterChange}
          categories={texts.categories}
        />
        <FilterBar onSearchChange={handleSearchChange} onSortChange={handleSortChange} darkMode={darkMode}/>
        <SectionTitle
          title={texts.categoryScreen.Category.title}
          text={texts.categoryScreen.Category.text}
          iconName="help-circle"
          popupTitle={texts.categoryScreen.Category.popup.title}
          popupText={texts.categoryScreen.Category.popup.text}
          popupButtonText={texts.categoryScreen.Category.popup.button}
          darkMode={darkMode}
        />
        <CategoryCard categories={filteredCategories} darkMode={darkMode} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
});

export default Page;
