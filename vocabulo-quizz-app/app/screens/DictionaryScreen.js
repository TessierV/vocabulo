import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Papa from 'papaparse';
import Section from '@/components/Dictionary/Section';
import { darkTheme, lightTheme } from '@/constants/Colors';
import csvData from '@/constants/data';
import FilterBar from '@/components/FilterBar';
import BannerContainer from '@/components/Banner';
import { texts } from '@/constants/texts';
import Header from '@/components/Header';

const DictionaryScreen = () => {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // Example state for dark mode
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAlphabeticalFilter, setShowAlphabeticalFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  useEffect(() => {
    Papa.parse(csvData, {
      delimiter: ',', // Specify the delimiter
      header: true, // Indicates that the first row contains headers
      skipEmptyLines: true,
      complete: (results) => {
        // Group data by word and grammatical category
        const groupedData = results.data.reduce((acc, item) => {
          const key = `${item.mot}-${item.categorie_grammaticale}`;
          if (!acc[key]) {
            acc[key] = {
              mot: item.mot,
              categorie_grammaticale: item.categorie_grammaticale,
              items: []
            };
          }
          acc[key].items.push(item);
          return acc;
        }, {});

        // Convert the object to an array
        setData(Object.values(groupedData));
      },
      error: (error) => {
        console.error('Parse error:', error);
      },
    });
  }, []);

  // Handle changes to the search input
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  // Handle changes to the sort option
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Toggle selection of a letter filter
  const handleLetterClick = (letter) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
  };

  // Toggle selection of a category filter
  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // Toggle visibility of the alphabetical filter
  const toggleAlphabeticalFilter = () => {
    setShowAlphabeticalFilter(!showAlphabeticalFilter);
  };

  // Toggle visibility of the category filter
  const toggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };

  // Get the description for a grammatical category
  const getCategoryDescription = (category) => {
    switch (category) {
      case 'n.m.':
        return 'Masculine noun';
      case 'n.f.':
        return 'Feminine noun';
      case 'n.':
        return 'Noun';
      case 'n.prop.':
        return 'Proper noun';
      case 'adj.':
        return 'Adjective';
      case 'adv.':
        return 'Adverb';
      case 'v.':
        return 'Verb';
      case 'Faute Ortho':
        return 'Orthographic Errors';
      default:
        return 'Other';
    }
  };

  // Generate a sorted array of unique alphabetical letters
  const alphabeticalIndex = Array.from(new Set(data.map(group => group.mot[0].toUpperCase()))).sort();
  // Generate a sorted array of unique grammatical categories
  const categories = Array.from(new Set(data.map(group => group.categorie_grammaticale))).sort();

  // Filter and sort the data based on user selections
  const filteredData = data
    .filter(group =>
      (selectedLetter ? group.mot[0].toUpperCase() === selectedLetter : true) &&
      (selectedCategory ? group.categorie_grammaticale === selectedCategory : true) &&
      (group.mot.toLowerCase().includes(searchText.toLowerCase()) ||
       group.categorie_grammaticale.toLowerCase().includes(searchText.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'A-Z':
          return a.mot.localeCompare(b.mot);
        case 'Z-A':
          return b.mot.localeCompare(a.mot);
        case 'OLD':
          return a.mot.localeCompare(b.mot); // Ascending by word
        case 'NEW':
          return b.mot.localeCompare(a.mot); // Descending by word
        default:
          return 0;
      }
    });

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
      <Header darkMode={darkMode} firstLink="/home" secondLink="/parameter" />
      <BannerContainer
        title={texts.profilScreen.banner.title}
        text={texts.profilScreen.banner.text}
        popuptitle={texts.profilScreen.banner.popup.title}
        popuptext={texts.profilScreen.banner.popup.text}
        popupbutton={texts.profilScreen.banner.popup.button}
        darkMode={darkMode}
      />
      <FilterBar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        darkMode={darkMode}
        sortOption={sortOption}
      />
      <ScrollView horizontal style={styles.filtersScrollView}>
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            onPress={toggleAlphabeticalFilter}
            style={[
              styles.filterToggleButton,
              showAlphabeticalFilter && styles.selectedFilterToggleButton
            ]}
          >
            <Text style={styles.filterToggleText}>Alphabetical Index</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCategoryFilter}
            style={[
              styles.filterToggleButton,
              showCategoryFilter && styles.selectedFilterToggleButton
            ]}
          >
            <Text style={styles.filterToggleText}>Grammatical Category</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showAlphabeticalFilter && (
        <ScrollView horizontal style={styles.alphabeticalFilterScrollView}>
          <View style={styles.alphabeticalFilterContainer}>
            {alphabeticalIndex.map(letter => (
              <TouchableOpacity
                key={letter}
                onPress={() => handleLetterClick(letter)}
                style={[
                  styles.filterButton,
                  selectedLetter === letter && styles.selectedFilterButton
                ]}
              >
                <Text style={[styles.filterText, { color: darkMode ? darkTheme.text : lightTheme.text }]}>
                  {letter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {showCategoryFilter && (
        <ScrollView horizontal style={styles.categoryFilterScrollView}>
          <View style={styles.categoryFilterContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryClick(category)}
                style={[
                  styles.filterButton,
                  selectedCategory === category && styles.selectedFilterButton
                ]}
              >
                <Text style={[styles.filterText, { color: darkMode ? darkTheme.text : lightTheme.text }]}>
                  {getCategoryDescription(category)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      <ScrollView>
        {filteredData.map((group, index) => (
          <Section
            key={index}
            mot={group.mot}
            categorie_grammaticale={group.categorie_grammaticale}
            items={group.items}
            iconName="book"
            darkMode={darkMode}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
  filtersScrollView: {
    paddingBottom: 10,
    alignContent: 'flex-start',
    marginBottom: 10,
    height: 90,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterToggleButton: {
    paddingHorizontal: 20,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: lightTheme.darkShade,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  selectedFilterToggleButton: {
    backgroundColor: 'pink',
  },
  filterToggleText: {
    fontSize: 14,
    color: '#333',
  },
  alphabeticalFilterScrollView: {
    marginBottom: 10,
  },
  alphabeticalFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryFilterScrollView: {
    marginBottom: 10,
  },
  categoryFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    margin: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: 'orange',
  },
  filterText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DictionaryScreen;
