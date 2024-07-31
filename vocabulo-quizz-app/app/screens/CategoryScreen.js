import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import SelectDifficulty from '@/components/Category/SelectDifficulty';
import SectionTitle from '@/components/SectionTitle';
import { texts } from '@/constants/texts';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';

const Page = () => {
  const [darkMode] = useDarkMode();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleFilterChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const filteredCategories = texts.categories.filter((category) =>
    !selectedDifficulty || category.difficulty === selectedDifficulty
  );

  return (
    <>
      <Header darkMode={darkMode} title="Category" firstLink="/home" secondLink="none" />
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}
      >
        <SelectDifficulty darkMode={darkMode} onFilterChange={handleFilterChange} />
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
