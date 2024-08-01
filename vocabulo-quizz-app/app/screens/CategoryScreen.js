import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import SelectDifficulty from '@/components/Category/SelectDifficulty';
import SectionTitle from '@/components/SectionTitle';
import { texts } from '@/constants/texts';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      if (sortOption === 'A-Z') {
        return a.textLabel.localeCompare(b.textLabel);
      } else {
        return b.textLabel.localeCompare(a.textLabel);
      }
    });

  return (
    <>
      <Header darkMode={darkMode} title="Category" firstLink="/home" secondLink="none" />
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}
      >
        <SelectDifficulty darkMode={darkMode} onFilterChange={handleFilterChange} />
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
  },
});

export default Page;
