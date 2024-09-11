import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import SelectDifficulty from '@/components/Category/SelectDifficulty';
import SectionTitle from '@/components/SectionTitle';
import { texts } from '@/constants/texts';
import CategoryCard from '@/components/Customize/CategoryCard';
import Header from '@/components/Header/Header';
import FilterBar from '@/components/FilterBar';
import SelectedCategoryRow from '@/components/Customize/SelectedCategoryRow';
import SummaryModal from '@/components/Customize/SummaryModal';
import { GradientBackgroundButton } from '@/components/Button';

const Page = () => {
  const [darkMode] = useDarkMode();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [selectedColumns, setSelectedColumns] = useState([null, null, null, null]);
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);

  const handleFilterChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleCategorySelect = (category) => {
    const index = selectedColumns.indexOf(null);
    if (index !== -1) {
      const newSelectedColumns = [...selectedColumns];
      newSelectedColumns[index] = category;
      setSelectedColumns(newSelectedColumns);
    }
  };

  const handleRemoveCategory = (index) => {
    const newSelectedColumns = [...selectedColumns];
    newSelectedColumns[index] = null;
    setSelectedColumns(newSelectedColumns);
  };

  const handleValidation = () => {
    console.log("Validate button clicked");
    if (selectedColumns.some(col => col !== null)) {
      setSummaryModalVisible(true);
    }
  };

  const handleSummaryModalClose = () => {
    setSummaryModalVisible(false);
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
          return a.id - b.id;
        case 'NEW':
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const allColumnsFilled = selectedColumns.every(col => col !== null);

  return (
    <>
      <Header darkMode={darkMode} PageTitle="Personalisé" title="Category" firstLink="/home" secondLink="none" />
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
        <SelectedCategoryRow
          categories={selectedColumns}
          darkMode={darkMode}
          onCategorySelect={handleCategorySelect}
          onRemoveCategory={handleRemoveCategory}
        />
        {allColumnsFilled && (
          <View style={styles.buttonContainer}>
          <GradientBackgroundButton
            text="Validate Selection"
            textColor={darkMode ? 'light' : 'dark'}
            onPress={handleValidation}
          />
        </View>
        )}
        <CategoryCard
          categories={filteredCategories}
          darkMode={darkMode}
          selectedColumns={selectedColumns}
          onCategorySelect={handleCategorySelect}
        />
      </ScrollView>
      <SummaryModal
        visible={summaryModalVisible}
        categories={selectedColumns.filter(Boolean)}
        darkMode={darkMode}
        onClose={handleSummaryModalClose}
      />


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default Page;
