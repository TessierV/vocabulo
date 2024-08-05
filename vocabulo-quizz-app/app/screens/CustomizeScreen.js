import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Text, TouchableOpacity } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import SelectDifficulty from '@/components/Category/SelectDifficulty';
import SectionTitle from '@/components/SectionTitle';
import { texts } from '@/constants/texts';
import CategoryCard from '@/components/Customize/CategoryCard';
import CustomizeRow from '@/components/Customize/CustomizeRow';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import { SvgXml } from 'react-native-svg';

const Page = () => {
  const [darkMode] = useDarkMode();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [selectedColumns, setSelectedColumns] = useState([null, null, null, null]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    setSelectedCategory(category);
  };

  const handleRemoveCategory = (index) => {
    const newSelectedColumns = [...selectedColumns];
    newSelectedColumns[index] = null;
    setSelectedColumns(newSelectedColumns);
  };

  const handleValidation = () => {
    console.log("Validate button clicked");
    setSummaryModalVisible(true);
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
        <View style={styles.selectedCategories}>
          {selectedColumns.map((category, index) => (
            <CustomizeRow
              key={index}
              category={category || { textLabel: '?', icon: null }}
              darkMode={darkMode}
              onSelect={() => handleCategorySelect(category)}
              onRemove={() => handleRemoveCategory(index)}
            />
          ))}
        </View>
        {allColumnsFilled && (
          <TouchableOpacity
            style={[styles.validateButton, { backgroundColor: darkMode ? 'yellow' : 'yellow' }]}
            onPress={handleValidation}
          >
            <Text style={[styles.validateButtonText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
              Validate Selection
            </Text>
          </TouchableOpacity>
        )}
        <CategoryCard
          categories={filteredCategories}
          darkMode={darkMode}
          selectedColumns={selectedColumns}
          onCategorySelect={(category) => {
            handleCategorySelect(category);
            const index = selectedColumns.indexOf(null);
            if (index !== -1) {
              const newSelectedColumns = [...selectedColumns];
              newSelectedColumns[index] = category;
              setSelectedColumns(newSelectedColumns);
            }
          }}
        />
      </ScrollView>
      {summaryModalVisible && (
        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>
          <Button style={styles.modalCancel} title="x" onPress={handleSummaryModalClose} />

            <Text style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }}>
              {`You are about to start your exercise with the following ${selectedColumns.filter(Boolean).length} categories:`}
            </Text>
            {selectedColumns.map((category, index) => (
              category ? (
                <View key={index} style={styles.categoryRow}>
                  <View style={styles.categoryRowIcon}>
                  <SvgXml xml={category.icon} width={30} height={30} />
                  <Text style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade, marginLeft: 10 }}>
                    {category.textLabel}
                  </Text>

                  </View>

                  <Text style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade, marginLeft: 10 }}>
                    {`${category.difficulty}`}
                  </Text>
                </View>
              ) : null
            ))}
            <Button title="Start Exercise" onPress={handleSummaryModalClose} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  selectedCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  validateButton: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  validateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCancel: {
    
    justifyContent: 'flex-end',
    right: 0,
  },
  modalContent: {
    width: 280,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: darkTheme.darkShade,
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius:8,

  },
  categoryRowIcon:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default Page;
