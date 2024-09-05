import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Button, ActivityIndicator, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import Header from '@/components/Header/Header';
import SvgDifficulty from '@/SVG/DifficultySvgIcon'; // Import your SVG component
import { SvgXml } from 'react-native-svg';
import SvgIcon from '@/SVG/CategorySvgIcon';
import GradientSVG from '@/SVG/GradientSVG';
import { Paragraph } from '@/constants/StyledText';

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

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryResponse = await fetch('http://192.168.0.12:3000/api/categories/basique');
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
        setFilteredSubcategories(subcategoriesWithDetails); // Initialize filtered subcategories
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
          .filter(subcat => subcat.words.length > 0); // Only include subcategories that have words with the selected difficulty

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
    const totalWords = subcat.word_count; // Use word_count from the server
    const filteredWords = filterWordsByDifficulty(subcat.words, difficulty);
    return { totalWords, filteredCount: filteredWords.length };
  };

  const getCircularProgressSvg = (filteredCount, totalWords) => {
    const progress = (filteredCount / totalWords) * 100;
    const radius = 15;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return `
      <svg width="45" height="45" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color.neutralPlum};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${color.neutralBlue};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color.neutralGreen};stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="15" stroke=${lightTheme.dark_lightShade} stroke-width="5" fill="none" />
        <circle cx="20" cy="20" r="15" stroke="url(#progress-gradient)" stroke-width="5" fill="none"
          stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" transform="rotate(-90 20 20)" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="6" fill="${lightTheme.light_darkShade}">
          ${filteredCount}/${totalWords}
        </text>
      </svg>
    `;
  };

  if (loading) return <ActivityIndicator size="large" color={darkMode ? lightTheme.primary : darkTheme.primary} />;
  if (error) return <Text style={{ color: darkMode ? darkTheme.text : lightTheme.text }}>Error: {error}</Text>;

  return (
    <>
      <Header darkMode={darkMode} title={categoryName} firstLink="/home" secondLink="none" />
      <ScrollView contentContainerStyle={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
        <View style={styles.container}>

          <View style={[styles.searchContainer, { backgroundColor: darkMode ? darkTheme.inputBackground : lightTheme.inputBackground }]}>
            <Feather name="search" size={20} color={darkMode ? darkTheme.text : lightTheme.text} />
            <TextInput
              style={[styles.searchBar, { color: darkMode ? darkTheme.text : lightTheme.text }]}
              placeholder="Search subcategories..."
              placeholderTextColor={darkMode ? darkTheme.placeholder : lightTheme.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={toggleSortOption} style={styles.sortToggleButton}>
              <Text style={[styles.sortToggleText, { color: darkMode ? darkTheme.text : lightTheme.text }]}>
                {sortOption}
              </Text>

            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.filterScrollView}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterBar}
          >
            {['all', 'easy', 'medium', 'hard'].map(option => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setFilter(option);
                  setSelectedFilter(option);
                }}
                style={[
                  styles.filterButton,
                  {
                    borderColor: selectedFilter === option
                      ? option === 'all' ? lightTheme.dark_lightShade :
                        option === 'easy' ? color.neutralGreen :
                          option === 'medium' ? color.neutralBlue :
                            color.neutralPlum
                      : color.neutral,
                    backgroundColor: selectedFilter === option ?
                      option === 'all' ? lightTheme.dark_lightShade :
                        option === 'easy' ? color.neutralGreen :
                          option === 'medium' ? color.neutralBlue :
                            color.neutralPlum
                      : 'transparent'
                  }
                ]}
              >
                {selectedFilter === option && (
                  <View style={styles.gradientContainer}>
                    <GradientSVG
                      colors={
                        option === 'all' ? [color.neutralGreen, color.neutralBlue, color.neutralPlum] :
                          option === 'easy' ? [color.lightGreen, color.neutralGreen, color.darkGreen] :
                            option === 'medium' ? [color.lightBlue, color.neutralBlue, color.darkBlue] :
                              [color.lightPlum, color.neutralPlum, color.darkPlum]
                      }
                    />
                  </View>
                )}
                <SvgDifficulty difficulty={option} isSelected={selectedFilter === option} />
                <Text style={[styles.filterButtonText, { color: selectedFilter === option ? lightTheme.darkShade : lightTheme.lightDarkShade }]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Display filtered subcategories */}
          {filteredSubcategories.length > 0 ? (
            filteredSubcategories.map(subcat => {
              const { totalWords, filteredCount } = getWordCountByDifficulty(subcat, filter);

              return (
                <TouchableOpacity key={subcat.subcat_id} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                  minHeight: 60,
                  backgroundColor: lightTheme.lightShade,
                  borderRadius: 8,
                  paddingHorizontal: 20,

                  justifyContent: 'space-between',
                }} onPress={() => handleSectionClick(subcat, filter)}>
                  <View style={{
                    flexDirection: 'row', flexDirection: 'row',
                    gap: 20,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                    <SvgIcon icon={subcat.subcategory_name} fillColor={color.darkBlue} width="30" height="30" />
                    <Text style={[styles.subcategoryText, { color: darkMode ? darkTheme.text : lightTheme.text }]}>
                      {subcat.subcategory_name}
                    </Text>
                  </View>

                  {filter === 'all' ? (

                    <Paragraph style={[{ color: darkMode ? darkTheme.text : lightTheme.text }]}>
                      {filteredCount} / {totalWords}
                    </Paragraph>
                  ) : <View style={styles.circularProgressContainer}>
                    <SvgXml xml={getCircularProgressSvg(filteredCount, totalWords)} />
                  </View>}



                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={{ color: darkMode ? darkTheme.text : lightTheme.text }}>No subcategories found</Text>
          )}

          {selectedSection && (
            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>{selectedSection.subcat.subcategory_name} - {selectedSection.difficulty.charAt(0).toUpperCase() + selectedSection.difficulty.slice(1)}</Text>
                  <ScrollView style={{ height: 200 }}>
                    {filterWordsByDifficulty(selectedSection.subcat.words, selectedSection.difficulty).map(word => (
                      <View key={word.mot_id}>
                        <Text style={{ color: darkMode ? darkTheme.text : lightTheme.text }}>
                          {word.mot} - {word.definition}
                        </Text>
                        {word.signs.map((sign, index) => (
                          <View key={index}>
                            <Text>Sign Video: {sign.urlSign}</Text>
                            <Text>Definition Video: {sign.urlDef}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                  <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
  },
  sortToggleButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  sortToggleText: {
    fontSize: 16,
  },
  filterScrollView: {
    marginBottom: 16,
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
    justifyContent: 'center',
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
  filterButtonText: {
    fontSize: 16,
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
  filterScrollView: {
    width: '100%',
    maxHeight: 45,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    gap: 5,
    height: 40,
    width: '100%',
  },
  filterButton: {
    minWidth: 80,
    flexWrap: 'wrap',
    borderRadius: 8,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 5,
    overflow: 'hidden',
    position: 'relative',
    padding: 5,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 12,
  },
});

export default Page;
