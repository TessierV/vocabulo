// SOON REMOVE
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import SvgIcon from '@/components/Card/SvgIcon';
import { Paragraph, BigTitle, ContainerParagraph, Subtitle } from '@/constants/StyledText';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HomeModalCategory from './HomeModalCategory';

const CategoryModal = ({ isVisible, onClose, category, darkMode }) => {
  const router = useRouter();
  const { contentContainerColor, textColor } = {
    contentContainerColor: darkMode ? color.neutralCoral : lightTheme.lightShade,
    textColor: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
  };

  const categoryName = category?.categorie_name?.trim() || 'Unknown Category';

  const [words, setWords] = useState([]);
  const [subcategoryWords, setSubcategoryWords] = useState(new Map()); // Mots par sous-catégorie
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [subcategoryTotalWordCount, setSubcategoryTotalWordCount] = useState(0);
  const [filter, setFilter] = useState('TOUT');
  const [filteredWordCount, setFilteredWordCount] = useState(0);
  const [groupedSubcategories, setGroupedSubcategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSubcategories, setSelectedSubcategories] = useState(new Set());
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    if (category) {
      fetchWords(category.categorie_id);
      groupSubcategories();
    }
  }, [category]);

  useEffect(() => {
    if (words.length > 0) {
      updateFilteredWordCount();
    }
  }, [filter, words, selectedSubcategories]);

  useEffect(() => {
    if (category?.subcategories) {
      calculateSubcategoryTotalWordCount();
    }
    groupSubcategories();
  }, [category?.subcategories]);

  const fetchWords = async (categorieId) => {
    try {
      const response = await fetch(`http://192.168.1.15:3000/api/words/${categorieId}`);
      const data = await response.json();
      const validWords = Array.isArray(data) ? data : [];
      setWords(validWords);
      setTotalWordCount(validWords.length);

      // Map words to subcategories
      const subcategoryWordsMap = new Map();
      validWords.forEach(word => {
        const subcategoryId = word.subcategory_id;
        if (subcategoryId) {
          if (!subcategoryWordsMap.has(subcategoryId)) {
            subcategoryWordsMap.set(subcategoryId, []);
          }
          subcategoryWordsMap.get(subcategoryId).push(word);
        }
      });
      setSubcategoryWords(subcategoryWordsMap);
    } catch (error) {
      console.error('Erreur lors de la récupération des mots:', error);
    }
  };


  const filterWordsByDifficulty = (difficulty) => {
    return words.filter(word => {
      const hasUrlSign = word.signes.some(signe => signe.url_sign && signe.url_sign !== 'Non spécifié');
      const hasUrlDef = word.signes.some(signe => signe.url_def && signe.url_def !== 'Non spécifié');

      if (difficulty === 'EASY') {
        return hasUrlSign && hasUrlDef;
      }
      if (difficulty === 'MIDDLE') {
        return (hasUrlSign || hasUrlDef) && !(hasUrlSign && hasUrlDef);
      }
      if (difficulty === 'HARD') {
        return !hasUrlSign && !hasUrlDef;
      }
      return true;
    });
  };

  const updateFilteredWordCount = () => {
    const filteredWords = filterWordsByDifficulty(filter);
    setFilteredWordCount(filteredWords.length);
  };

  const calculateSubcategoryTotalWordCount = () => {
    const totalWords = category.subcategories.reduce((sum, subcat) => {
      return sum + (subcat.subcategory_word_count || 0);
    }, 0);
    setSubcategoryTotalWordCount(totalWords);
  };

  const groupSubcategories = () => {
    const validSubcategories = category?.subcategories?.filter(subcat =>
      subcat?.subcategory_id && subcat?.subcategory_name?.trim() && subcat?.subcategory_word_count
    ) || [];

    const grouped = [];
    for (let i = 0; i < validSubcategories.length; i += 3) {
      grouped.push(validSubcategories.slice(i, i + 3));
    }
    setGroupedSubcategories(grouped);
  };

  const handleScroll = (event) => {
    const slideWidth = Dimensions.get('window').width - 50;
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / slideWidth
    );
    setCurrentIndex(slideIndex);
  };

  const handleSubcategorySelection = async (subcategoryId) => {
    // Toggle selection
    setSelectedSubcategories(prevSelected => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(subcategoryId)) {
        updatedSelection.delete(subcategoryId);
      } else {
        updatedSelection.add(subcategoryId);
      }
      return updatedSelection;
    });

    // Update selected words
    const selectedWordsList = Array.from(selectedSubcategories).reduce((acc, subcatId) => {
      const wordsForSubcat = subcategoryWords.get(subcatId) || [];
      return acc.concat(wordsForSubcat);
    }, []);
    setSelectedWords(selectedWordsList);
  };

  const handleGoToWordList = () => {
    if (category && category.categorie_id) {
      onClose();
      router.push(`/wordlist/${category.categorie_id}?filter=${filter}`);
    } else {
      console.error('Category or category ID is missing');
    }
  };

  const filteredWords = words.filter(word => {
    const subcategoryIds = category?.subcategories?.filter(subcat =>
      selectedSubcategories.has(subcat.subcategory_id)
    ).map(subcat => subcat.subcategory_id);
    return subcategoryIds ? subcategoryIds.includes(word.subcategory_id) : true;
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, { backgroundColor: contentContainerColor }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <SvgIcon icon={categoryName} fillColor={textColor} width="60" height="60" />
            <BigTitle>Récapitulatif</BigTitle>
            <ContainerParagraph style={{ color: textColor }}>
              Vous allez commencer
            </ContainerParagraph>

            {groupedSubcategories.length > 0 ? (
              <>
                <View style={styles.subcategoryContainer}>
                  <Subtitle>Thème</Subtitle>
                  <View style={[styles.subcategoryItem, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]}>
                    <View style={styles.categoryRowIcon}>
                      <SvgIcon icon={categoryName} fillColor={textColor} />
                      <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
                        {categoryName}
                      </Paragraph>
                    </View>
                    <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
                      {subcategoryTotalWordCount}
                    </Paragraph>
                  </View>

                  <Subtitle>Sous-Thème</Subtitle>
                  <FlatList
                    data={groupedSubcategories}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    keyExtractor={(item, index) => `slide-${index}`}
                    renderItem={({ item }) => (
                      <View style={styles.sliderContainer}>
                        {item.map((subcat) => {
                          const subcategoryName = subcat?.subcategory_name?.trim() || 'Unknown Subcategory';
                          return (
                            <TouchableOpacity
                              key={subcat.subcategory_id}
                              style={[styles.subcategoryItem, {
                                backgroundColor: selectedSubcategories.has(subcat.subcategory_id) ? (darkMode ? darkTheme.activeShade : lightTheme.activeShade) : (darkMode ? darkTheme.darkShade : lightTheme.darkShade)
                              }]}
                              onPress={() => handleSubcategorySelection(subcat.subcategory_id)}
                            >
                              <View style={styles.categoryRowIcon}>
                                <SvgIcon icon={subcategoryName} fillColor={textColor} width="20" height="20" />
                                <Text style={[styles.subcategoryText, { color: textColor }]}>
                                  {subcategoryName}
                                </Text>
                              </View>
                              <Text style={[styles.subcategoryText, { color: textColor }]}>
                                {subcat?.subcategory_word_count || '0'} mots
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  />
                  <View style={styles.paginationContainer}>
                    {groupedSubcategories.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.paginationDot,
                          currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                      />
                    ))}
                  </View>

                </View>
              </>
            ) : (
              <>
                <HomeModalCategory
                  categoryName={categoryName}
                  filteredWordCount={filteredWordCount}
                  totalWordCount={totalWordCount}
                  filter={filter}
                  setFilter={setFilter}
                  darkMode={darkMode}
                  handleGoToWordList={handleGoToWordList}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalContent: {
    alignItems: 'center',
    width: '100%',
  },
  subcategoryContainer: {
    marginTop: 20,
    gap: 5,
    width: '100%',
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  categoryRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  subcategoryText: {
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeFilterButton: {
    backgroundColor: '#333',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  wordListButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  wordListButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 5,
    width: Dimensions.get('window').width - 50,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  wordItem: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#f8f8f8',
  },
  wordText: {
    fontSize: 14,
  },
});

export default CategoryModal;
