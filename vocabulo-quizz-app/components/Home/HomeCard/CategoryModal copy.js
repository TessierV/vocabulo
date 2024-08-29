import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SvgIcon from '@/components/Card/SvgIcon';
import { Paragraph, BigTitle, ContainerParagraph, Subtitle } from '@/constants/StyledText';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';

const CategoryModal = ({ isVisible, onClose, category, darkMode }) => {
  const { contentContainerColor, textColor } = {
    contentContainerColor: darkMode ? color.neutralCoral : lightTheme.lightShade,
    textColor: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
  };

  const categoryName = category?.categorie_name?.trim() || 'Unknown Category';
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [filter, setFilter] = useState('TOUT');

  useEffect(() => {
    if (category) {
      fetchWords(category.categorie_id);
    }
  }, [category]);

  useEffect(() => {
    if (words.length > 0) {
      setFilteredWords(filterWordsByDifficulty(filter));
    }
  }, [filter, words]);

  const fetchWords = async (categorieId) => {
    try {
      const response = await fetch(`http://192.168.1.15:3000/api/words/${categorieId}`);
      const data = await response.json();
      setWords(Array.isArray(data) ? data : []);
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

  const getFilteredWords = () => {
    return filterWordsByDifficulty(filter);
  };

  const getFilteredWordCount = () => {
    return getFilteredWords().length;
  };

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

            <View style={styles.subcategoryContainer}>
              <Subtitle>Thème</Subtitle>
              <View style={[styles.categoryItem, { backgroundColor: contentContainerColor }]}>
                <View style={styles.categoryRowIcon}>
                  <SvgIcon icon={categoryName} fillColor={textColor} />
                  <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
                    {categoryName}
                  </Paragraph>
                </View>
                <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
                  {getFilteredWordCount()} mots
                </Paragraph>
              </View>

              <View style={styles.filterContainer}>
                {['TOUT', 'EASY', 'MIDDLE', 'HARD'].map(difficulty => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[styles.filterButton, filter === difficulty && styles.activeFilterButton]}
                    onPress={() => setFilter(difficulty)}
                  >
                    <Text style={[styles.filterText, filter === difficulty && styles.activeFilterText]}>
                      {difficulty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <ScrollView style={styles.wordsContainer}>
                <Subtitle>Mots</Subtitle>
                {getFilteredWords().length > 0 ? (
                  getFilteredWords().map((word) => (
                    <View key={word.mot_id} style={[styles.wordItem, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]}>
                      <Text style={[styles.wordText, { color: textColor }]}>
                        {word.mot}
                      </Text>
                      <View style={styles.signeContainer}>
                        {word.signes.map((signe, index) => (
                          <View key={index}>
                            <Text style={[styles.signeText, { color: textColor }]}>
                              URL Sign: {signe.url_sign}
                            </Text>
                            <Text style={[styles.signeText, { color: textColor }]}>
                              URL Def: {signe.url_def}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.subcategoryText, { color: textColor }]}>Aucun mot correspondant</Text>
                )}
              </ScrollView>
            </View>
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
    width: '100%',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  categoryRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  subcategoryText: {
    fontSize: 12,
  },
  wordsContainer: {
    marginTop: 20,
    width: '100%',
  },
  wordItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  wordText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signeContainer: {
    paddingLeft: 10,
    marginTop: 5,
  },
  signeText: {
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
  },
  activeFilterButton: {
    backgroundColor: darkTheme.activeFilterBackground,
  },
  filterText: {
    fontSize: 14,
    color: darkTheme.filterText,
  },
  activeFilterText: {
    color: lightTheme.activeFilterText,
  },
});

export default CategoryModal;
