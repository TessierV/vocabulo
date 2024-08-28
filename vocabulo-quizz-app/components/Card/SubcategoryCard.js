import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import SvgIcon from '@/components/Card/SvgIcon';
import { Paragraph } from '@/constants/StyledText';
import CategoryModal from '@/components/Home/HomeCard/CategoryModal';

const SubcategoryCard = ({ darkMode, selectedCategory, onCategoryClick }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [filteredWords, setFilteredWords] = useState({ easy: [], middle: [], hard: [] });

  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth / 3 - 25;

  const getStyleForSubcategory = () => ({
    contentContainerColor: darkMode ? color.neutralCoral : lightTheme.lightShade,
    textColor: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
  });

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://192.168.23.25:3000/api/subcategories');
      const data = await response.json();
      setSubcategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erreur lors de la récupération des sous-catégories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWords = async (categorieId) => {
    try {
      const response = await fetch(`http://192.168.23.25:3000/api/words/${categorieId}`);
      const data = await response.json();
      const easyWords = data.find(d => d.difficulty === 'easy')?.words || [];
      const middleWords = data.find(d => d.difficulty === 'middle')?.words || [];
      const hardWords = data.find(d => d.difficulty === 'hard')?.words || [];
      setFilteredWords({ easy: easyWords, middle: middleWords, hard: hardWords });
    } catch (error) {
      console.error('Erreur lors de la récupération des mots:', error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category.categorie_id) {
      onCategoryClick(null);
      setFilteredWords({ easy: [], middle: [], hard: [] });
    } else {
      onCategoryClick(category.categorie_id);
      fetchWords(category.categorie_id);
      setSelectedCategoryData(category);
      setModalVisible(true);
    }
  };

  const normalizeIconName = (name) => name.trim();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkMode ? color.neutralCoral : color.neutralCoral} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.grid, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}
    >
      {subcategories.length > 0 ? (
        subcategories.map((category) => {
          const { contentContainerColor, textColor } = getStyleForSubcategory();
          const iconName = normalizeIconName(category.categorie_name);

          return (
            <View key={category.categorie_id}>
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor: selectedCategory === category.categorie_id ? contentContainerColor : lightTheme.lightShade,
                  },
                ]}
                onPress={() => handleCategoryClick(category)}
              >
                <View
                  style={[
                    styles.contentContainer,
                    {
                      width: squareSize,
                      height: squareSize,
                    }
                  ]}
                >
                  <View style={styles.iconContainer}>
                    <SvgIcon icon={iconName} fillColor={textColor} />
                  </View>
                  <View>
                    <Paragraph style={[styles.label, { color: textColor }]}>
                      {category.categorie_name}
                    </Paragraph>
                    <Paragraph style={[styles.label, { color: textColor }]}>
                      {category.word_count} mots
                    </Paragraph>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text style={styles.noDataText}>No categories available</Text>
      )}

      {selectedCategoryData && (
        <CategoryModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          category={selectedCategoryData}
          darkMode={darkMode}
          filteredWords={filteredWords}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
    alignItems: 'flex-start',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    gap: 10,
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: color.neutralCoral,
    padding: 20,
  },
});

export default SubcategoryCard;
