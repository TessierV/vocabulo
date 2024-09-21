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

// Main functional component
const Page = () => {
  // Using dark mode hook to manage theme
  const [darkMode] = useDarkMode();
  // State variables for managing component data
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Selected difficulty level
  const [searchText, setSearchText] = useState(''); // Search text for filtering categories
  const [sortOption, setSortOption] = useState('A-Z'); // Current sort option
  const [selectedColumns, setSelectedColumns] = useState([null, null, null, null]); // Selected categories
  const [summaryModalVisible, setSummaryModalVisible] = useState(false); // Control visibility of summary modal

  // Handle change in selected difficulty
  const handleFilterChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  // Handle changes in search input
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  // Handle changes in sorting options
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Handle category selection and ensure it fills available columns
  const handleCategorySelect = (category) => {
    const index = selectedColumns.indexOf(null); // Find the first empty column
    if (index !== -1) {
      const newSelectedColumns = [...selectedColumns]; // Copy current selections
      newSelectedColumns[index] = category; // Add selected category to the empty column
      setSelectedColumns(newSelectedColumns); // Update state
    }
  };

  // Handle category removal from selected columns
  const handleRemoveCategory = (index) => {
    const newSelectedColumns = [...selectedColumns];
    newSelectedColumns[index] = null; // Reset the column to null
    setSelectedColumns(newSelectedColumns); // Update state
  };

  // Handle validation of selected categories and show summary modal if any are selected
  const handleValidation = () => {
    console.log("Validate button clicked");
    if (selectedColumns.some(col => col !== null)) {
      setSummaryModalVisible(true); // Show summary modal
    }
  };

  // Close the summary modal
  const handleSummaryModalClose = () => {
    setSummaryModalVisible(false);
  };

  // Filter categories based on difficulty and search text, then sort them
  const filteredCategories = texts.categories
    .filter((category) =>
      (!selectedDifficulty || category.difficulty === selectedDifficulty) && // Filter by selected difficulty
      category.textLabel.toLowerCase().includes(searchText.toLowerCase()) // Filter by search text
    )
    .sort((a, b) => { // Sort categories based on selected sort option
      switch (sortOption) {
        case 'A-Z':
          return a.textLabel.localeCompare(b.textLabel); // Alphabetical order A-Z
        case 'Z-A':
          return b.textLabel.localeCompare(a.textLabel); // Alphabetical order Z-A
        case 'OLD':
          return a.id - b.id; // Sort by oldest first
        case 'NEW':
          return b.id - a.id; // Sort by newest first
        default:
          return 0; // Default case, no sorting
      }
    });

  // Check if all columns are filled
  const allColumnsFilled = selectedColumns.every(col => col !== null);

  return (
    <>
      <Header darkMode={darkMode} PageTitle="Personalisé" title="Category" firstLink="/home" secondLink="none" />
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
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
              text="Validate Selection" // Button text
              textColor={darkMode ? 'light' : 'dark'} // Button text color based on theme
              onPress={handleValidation} // Function to call on button press
            />
          </View>
        )}
        <CategoryCard
          categories={filteredCategories} // Filtered and sorted categories
          darkMode={darkMode}
          selectedColumns={selectedColumns} // Currently selected categories
          onCategorySelect={handleCategorySelect} // Handle category selection
        />
      </ScrollView>
      <SummaryModal
        visible={summaryModalVisible} // Modal visibility
        categories={selectedColumns.filter(Boolean)} // Pass selected categories that are not null
        darkMode={darkMode}
        onClose={handleSummaryModalClose} // Function to close the modal
      />
    </>
  );
};

// Styles for the component
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
