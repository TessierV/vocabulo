import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Button, ActivityIndicator, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import Header from '@/components/Header/Header';
import SvgDifficulty from '@/SVG/DifficultySvgIcon';
import { SvgXml } from 'react-native-svg';
import SvgIcon from '@/SVG/CategorySvgIcon';
import GradientSVG from '@/SVG/GradientSVG';
import { Paragraph, Subtitle, BigTitle, ContainerParagraph } from '@/constants/StyledText';
import RadarEffect from '@/components/RadarEffect';
import { useNavigation } from '@react-navigation/native';
import { basic } from '@/constants/texts';
import SliderBasic from '@/components/Category/SliderCategory';

import config from '@/backend/config/config';
import SectionTitle from '@/components/General/SectionTitle';

import SearchBar from '@/components/Category/SearchBar';
import FilterButtons from '@/components/Category/FilterButtons';
import ModalComponent from '@/components/Category/ModalComponent';
import SubcategoryList from '@/components/Category/SubcategoryList';


const Page = () => {
  const [darkMode] = useDarkMode();
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // State for difficulty filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search
  const [sortOption, setSortOption] = useState('A-Z'); // State for sorting option
  const [selectedSection, setSelectedSection] = useState(null); // State for the selected section
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedFilter, setSelectedFilter] = useState('all'); // State for selected filter

  const navigation = useNavigation();


  const getRadarColors = (filter) => {
    switch (filter) {
      case 'easy':
        return [color.darkGreen, color.neutralGreen, color.lightGreen];
      case 'medium':
        return [color.darkBlue, color.neutralBlue, color.lightBlue];
      case 'hard':
        return [color.darkPlum, color.neutralPlum, color.lightPlum];
      case 'all':
      default:
        return [color.lightPlum, color.neutralBlue, color.neutralGreen];
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryResponse = await fetch(`${config.BASE_URL}:3000/api/categories/basique`);

        const categoryData = await categoryResponse.json();

        if (!categoryData) {
          throw new Error('Category not found');
        }

        setCategoryName(categoryData.categorie_name);

        const subcategoriesWithDetails = categoryData.subcategories.map(subcat => ({
          ...subcat,
          words: subcat.words.map(word => ({
            ...word,
            signs: word.signes.map(sign => ({
              urlSign: sign.url_sign,
              urlDef: sign.url_def
            }))
          }))
        }));

        setSubcategories(subcategoriesWithDetails);
        setFilteredSubcategories(subcategoriesWithDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const filterSubcategoriesByDifficulty = () => {
      if (filter === 'all') {
        setFilteredSubcategories(subcategories);
      } else {
        const filtered = subcategories
          .map(subcat => {
            const filteredWords = filterWordsByDifficulty(subcat.words, filter);
            return { ...subcat, words: filteredWords };
          })
          .filter(subcat => subcat.words.length > 0);

        setFilteredSubcategories(filtered);
      }
    };

    filterSubcategoriesByDifficulty();
  }, [filter, subcategories]);

  useEffect(() => {
    // Filter by search query
    const filteredBySearch = subcategories.filter(subcat =>
      subcat.subcategory_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort based on selected sorting option
    const sortedSubcategories = filteredBySearch.sort((a, b) => {
      if (sortOption === 'A-Z') return a.subcategory_name.localeCompare(b.subcategory_name);
      if (sortOption === 'Z-A') return b.subcategory_name.localeCompare(a.subcategory_name);
      if (sortOption === 'New to Old') return b.originalIndex - a.originalIndex;
      if (sortOption === 'Old to New') return a.originalIndex - b.originalIndex;
      return 0;
    });

    setFilteredSubcategories(sortedSubcategories);
  }, [searchQuery, sortOption, subcategories]);

  const filterWordsByDifficulty = (words, filter) => {
    if (filter === 'all') {
      return words;
    }
    return words.filter(word => {
      const hasUrlSign = word.signs.some(signe => signe.urlSign && signe.urlSign !== 'Non spécifié');
      const hasUrlDef = word.signs.some(signe => signe.urlDef && signe.urlDef !== 'Non spécifié');

      if (filter === 'easy') {
        return hasUrlSign && hasUrlDef;
      }
      if (filter === 'medium') {
        return (hasUrlSign || hasUrlDef) && !(hasUrlSign && hasUrlDef);
      }
      if (filter === 'hard') {
        return !hasUrlSign && !hasUrlDef;
      }
      return false;
    });
  };

  const handleSectionClick = (subcat, difficulty) => {
    setSelectedSection({ subcat, difficulty });
    setModalVisible(true);
  };

  const toggleSortOption = () => {
    setSortOption(prev => (prev === 'A-Z' ? 'Z-A' : 'A-Z'));
  };

  const getWordCountByDifficulty = (subcat, difficulty) => {
    const totalWords = subcat.word_count;
    const filteredWords = filterWordsByDifficulty(subcat.words, difficulty);
    return { totalWords, filteredCount: filteredWords.length };
  };

  const getCircularProgressSvg = (filteredCount, totalWords, gradientLight, gradientNeutral, gradientHard) => {
    const progress = (filteredCount / totalWords) * 100;
    const radius = 15;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    if (filteredCount < 6) {
      gradientHard = color.darkCoral;
      gradientNeutral = color.neutralCoral;
      gradientLight = color.lightCoral;
    }

    const strokeColor = filteredCount < 6
    ? darkMode
        ? darkTheme.neutral
        : color.neutral
    : darkMode
        ? darkTheme.darkShade
        : lightTheme.dark_lightShade;


    return `
      <svg width="45" height="45" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${gradientHard};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${gradientNeutral};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${gradientLight};stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="15" stroke=${strokeColor} stroke-width="5" fill="none" />
        <circle cx="20" cy="20" r="15" stroke="url(#progress-gradient)" stroke-width="5" fill="none"
          stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" transform="rotate(-90 20 20)" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="6" fill="${lightTheme.neutral}">
          ${filteredCount}/${totalWords}
        </text>
      </svg>
    `;
  };




  if (loading) return <ActivityIndicator size="large" color={darkMode ? color.darkPlum : color.darkBlue} />;
  if (error) return <Paragraph style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>Error: {error}</Paragraph>;

  return (
    <>
      <Header darkMode={darkMode} PageTitle={basic.header.title} title={categoryName} firstLink="/home" secondLink="none" />
      <ScrollView contentContainerStyle={[styles.mainContainer, { paddingBottom: 50 }]}>
        <SliderBasic darkMode={darkMode} />
        <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', marginTop: 10, }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            minHeight: 40,
            gap: 10,
          }}>
            <View style={{ flex: 5 }}>
              <SearchBar
                darkMode={darkMode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder={basic.section.textinput}
              />
            </View>
            <TouchableOpacity
              onPress={toggleSortOption}
              style={{
                flex: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: darkMode ? color.darkPlum : lightTheme.darkShade,
                minHeight: 40,
              }}
            >
              <Paragraph style={[styles.sortToggleText, { color: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
                {sortOption}
              </Paragraph>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%' }}>
            <FilterButtons
              darkMode={darkMode}
              selectedFilter={selectedFilter}
              setFilter={setFilter}
              setSelectedFilter={setSelectedFilter}
              options={['all', 'easy', 'medium', 'hard']}
            />
          </View>
          {filteredSubcategories.length > 0 ? (
            <>
              {filteredSubcategories.some(subcat => getWordCountByDifficulty(subcat, filter).filteredCount >= 6) && (
                <>
                  <SectionTitle
                    title={basic.section2.title}
                    darkMode={darkMode}
                    showTextAndIcon={false}
                  />
                  <SubcategoryList
                    subcategories={filteredSubcategories.filter(subcat => getWordCountByDifficulty(subcat, filter).filteredCount >= 6)}
                    filter={filter}
                    darkMode={darkMode}
                    getWordCountByDifficulty={getWordCountByDifficulty}
                    getCircularProgressSvg={getCircularProgressSvg}
                    handleSectionClick={handleSectionClick}
                  />
                </>
              )}

              {filteredSubcategories.some(subcat => getWordCountByDifficulty(subcat, filter).filteredCount < 6) && (
                <>
                  <SectionTitle
                    title={basic.section2.title2}
                    text={basic.section2.subtitle2}
                    iconName="info"
                    popupTitle={basic.section2.popup2.title}
                    popupText={basic.section2.popup2.text}
                    popupButtonText={basic.section2.popup2.button}
                    darkMode={darkMode}
                  />
                  <SubcategoryList
                    subcategories={filteredSubcategories.filter(subcat => getWordCountByDifficulty(subcat, filter).filteredCount < 6)}
                    filter={filter}
                    darkMode={darkMode}
                    getWordCountByDifficulty={getWordCountByDifficulty}
                    getCircularProgressSvg={getCircularProgressSvg}
                    handleSectionClick={handleSectionClick}
                  />
                </>
              )}
            </>
          ) : (
            <Paragraph style={{ color: darkMode ? color.neutral : color.neutral, textAlign: 'center', fontSize: 12 }}>{basic.error}</Paragraph>
          )}
          <ModalComponent
            darkMode={darkMode}
            modalVisible={modalVisible}
            closeModal={() => setModalVisible(false)}
            selectedSection={selectedSection}
            selectedFilter={selectedFilter}
            getRadarColors={getRadarColors}
            filterWordsByDifficulty={filterWordsByDifficulty}
            navigation={navigation}
            basic={basic}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
  },
  filterBar: {
    flexDirection: 'row',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    alignItems: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    overflow: 'hidden',
  },
  subcategoryContainer: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  subcategoryText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  recapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  recapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  //test
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width - 50,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
    minHeight: 40,
    marginTop: 20,
  },
  categoryRowIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  recapTitle: {
    color: lightTheme.lightShade,
  },
  // Filter
  recapCount: {
    fontSize: 12,
    color: lightTheme.dark_lightShade,
  },

});

export default Page;
