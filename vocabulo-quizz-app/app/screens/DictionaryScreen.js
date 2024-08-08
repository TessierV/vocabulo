import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Papa from 'papaparse';
import Section from '@/components/Dictionary/Section';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import csvData from '@/constants/data';
import FilterBar from '@/components/FilterBar';
import BannerContainer from '@/components/Banner';
import { texts } from '@/constants/texts';
import Header from '@/components/Header';
import { AnnonceTitle, BigTitle } from '@/constants/StyledText';

const DictionaryScreen = () => {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAlphabeticalFilter, setShowAlphabeticalFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  useEffect(() => {
    Papa.parse(csvData, {
      delimiter: ',',
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
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

        setData(Object.values(groupedData));
      },
      error: (error) => {
        console.error('Parse error:', error);
      },
    });
  }, []);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const toggleAlphabeticalFilter = () => {
    setShowAlphabeticalFilter(!showAlphabeticalFilter);
  };

  const toggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };

  const getCategoryDescription = (category) => {
    switch (category) {
      case 'n.m.':
        return 'Nom masculin';
      case 'n.f.':
        return 'Nom féminin';
      case 'n.':
        return 'Nom';
      case 'n.prop.':
        return 'Nom propre';
      case 'adj.':
        return 'Adjectif';
      case 'adv.':
        return 'Adverbe';
      case 'v.':
        return 'Verbe';
      case 'Faute Ortho':
        return 'Erreurs orthographiques';
      default:
        return 'Autre';
    }
  };

  const alphabeticalIndex = Array.from(new Set(data.map(group => group.mot[0].toUpperCase()))).sort();
  const categories = Array.from(new Set(data.map(group => group.categorie_grammaticale))).sort();

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

  const renderItem = ({ item, index }) => {
    const currentLetter = item.mot[0].toUpperCase();
    const previousLetter = index > 0 ? filteredData[index - 1].mot[0].toUpperCase() : null;

    return (
      <View>
        {currentLetter !== previousLetter && (
          <BigTitle style={[styles.letterTitle, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>
            {currentLetter}.
          </BigTitle>
        )}
        <Section
          mot={item.mot}
          categorie_grammaticale={item.categorie_grammaticale}
          items={item.items}
          iconName="book"
          darkMode={darkMode}
        />
      </View>
    );
  };

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
      <View style={styles.section}>
        <FilterBar
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          darkMode={darkMode}
          sortOption={sortOption}
        />
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
        {showAlphabeticalFilter && (
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
        )}
        {showCategoryFilter && (
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
        )}
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.sectionList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    width: '90%',
    alignSelf: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterToggleButton: {
    paddingHorizontal: 20,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: lightTheme.light_darkShade,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  selectedFilterToggleButton: {
    backgroundColor: lightTheme.darkShade,
    color: 'white',
  },
  filterToggleText: {
    fontSize: 12,
    color: lightTheme.light_darkShade,
  },
  alphabeticalFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  categoryFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    fontSize: 12,
    textAlign: 'center',
  },
  sectionList: {
    flexGrow: 1,
    paddingBottom: 400,
  },
});

export default DictionaryScreen;
