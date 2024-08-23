import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Papa from 'papaparse';
import Section from '@/components/Dictionary/Section';
import { darkTheme, lightTheme } from '@/constants/Colors';
import csvData from '@/constants/data';
import FilterBar from '@/components/FilterBar';
import BannerContainer from '@/components/Banner';
import { texts } from '@/constants/texts';
import Header from '@/components/Header/Header';
import { BigTitle } from '@/constants/StyledText';

const ITEMS_PER_PAGE = 10;

const DictionaryScreen = () => {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAlphabeticalFilter, setShowAlphabeticalFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
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

        const groupedArray = Object.values(groupedData);
        setData(groupedArray);
        setVisibleData(groupedArray.slice(0, ITEMS_PER_PAGE));
        setLoading(false);
        if (groupedArray.length <= ITEMS_PER_PAGE) {
          setAllDataLoaded(true);
        }
      },
      error: (error) => {
        console.error('Parse error:', error);
        setLoading(false);
      },
    });
  }, []);

  const handleSearchChange = (text) => {
    setSearchText(text);
    setAllDataLoaded(false);
    filterAndSetVisibleData(text, selectedLetter, selectedCategory, sortOption);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    filterAndSetVisibleData(searchText, selectedLetter, selectedCategory, option);
  };

  const handleLetterClick = (letter) => {
    const newSelectedLetter = selectedLetter === letter ? null : letter;
    setSelectedLetter(newSelectedLetter);
    setAllDataLoaded(false);
    filterAndSetVisibleData(searchText, newSelectedLetter, selectedCategory, sortOption);
  };

  const handleCategoryClick = (category) => {
    const newSelectedCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newSelectedCategory);
    setAllDataLoaded(false);
    filterAndSetVisibleData(searchText, selectedLetter, newSelectedCategory, sortOption);
  };

  const toggleAlphabeticalFilter = () => {
    setShowAlphabeticalFilter(!showAlphabeticalFilter);
  };

  const toggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };

  const filterAndSetVisibleData = (searchText, selectedLetter, selectedCategory, sortOption) => {
    setLoading(true);
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
            return a.mot.localeCompare(b.mot);
          case 'NEW':
            return b.mot.localeCompare(a.mot);
          default:
            return 0;
        }
      });

    setVisibleData(filteredData.slice(0, ITEMS_PER_PAGE));
    setLoading(false);
    if (filteredData.length <= ITEMS_PER_PAGE) {
      setAllDataLoaded(true);
    }
  };

  const loadMoreData = () => {
    if (loading || allDataLoaded) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = visibleData.length;
      const moreData = data
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
              return a.mot.localeCompare(b.mot);
            case 'NEW':
              return b.mot.localeCompare(a.mot);
            default:
              return 0;
          }
        })
        .slice(currentLength, currentLength + ITEMS_PER_PAGE);
      setVisibleData(prevData => [...prevData, ...moreData]);
      setLoading(false);
      if (currentLength + moreData.length >= data.length) {
        setAllDataLoaded(true);
      }
    }, 500);
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
      case 'int.':
        return 'Interjection';
      case 'cnj.':
        return 'Conjonction';
      case 'n.m.p.':
        return 'Noms masculins pluriels';
      case 'v.':
        return 'Verbe';
      case 'n.f.p.':
        return 'Nom féminin pluriel';
      case 'pro.':
        return 'Pronom';
      case 'prp.':
        return 'Pronominal';
      case 'suff.':
        return 'Suffixe';
      case 'aff.':
        return 'Affixe';
      case 'Phrase':
        return 'Phrase';
      case 'adj. et n.':
        return 'Adjectif et nom';
      case 'nominal':
        return 'Nominal';
      case 'symb.':
        return 'Symbolique';
      case 'Faute Ortho':
        return 'Erreurs orthographiques';
      default:
        return 'Autre';
    }
  };

  const renderItem = ({ item, index }) => {
    const currentLetter = item.mot[0].toUpperCase();
    const previousLetter = index > 0 ? visibleData[index - 1].mot[0].toUpperCase() : null;

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

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={darkMode ? darkTheme.text : lightTheme.text} />;
    }
    if (!loading && !allDataLoaded) {
      return (
        <TouchableOpacity onPress={loadMoreData} style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    }
    if (allDataLoaded) {
      return <Text style={styles.noMoreText}>No more data</Text>;
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
      <Header darkMode={darkMode} firstLink="/home" secondLink="none" />

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
            <Text style={styles.filterToggleText}>
              {showAlphabeticalFilter ? 'Hide Letters' : 'Filter by Letters'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCategoryFilter}
            style={[
              styles.filterToggleButton,
              showCategoryFilter && styles.selectedFilterToggleButton
            ]}
          >
            <Text style={styles.filterToggleText}>
              {showCategoryFilter ? 'Hide Categories' : 'Filter by Categories'}
            </Text>
          </TouchableOpacity>
        </View>
        {showAlphabeticalFilter && (
          <ScrollView contentContainerStyle={styles.alphabeticalFilterContainer} horizontal>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <TouchableOpacity
                key={letter}
                onPress={() => handleLetterClick(letter)}
                style={[
                  styles.filterButton,
                  selectedLetter === letter && styles.selectedFilterButton
                ]}
              >
                <Text style={styles.filterText}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {showCategoryFilter && (
          <ScrollView contentContainerStyle={styles.categoryFilterContentContainer} horizontal>
            {Array.from(new Set(data.map(item => item.categorie_grammaticale))).map((category, index) => (
              <TouchableOpacity
                key={index}
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
          </ScrollView>
        )}
        <FlatList
          data={visibleData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
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
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  categoryFilterContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    paddingHorizontal: 5,
  },

  filterButton: {
    padding: 8,
    marginHorizontal: 2,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: 'pink',
  },
  filterText: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionList: {
    flexGrow: 1,
    paddingBottom: 600,
  },
  loadMoreButton: {
    padding: 10,
    marginVertical: 20,
    backgroundColor: lightTheme.light_darkShade,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 16,
    color: 'white',
  },
  noMoreText: {
    fontSize: 16,
    textAlign: 'center',
    color: lightTheme.light_darkShade,
    padding: 20,
  },
});

export default DictionaryScreen;
