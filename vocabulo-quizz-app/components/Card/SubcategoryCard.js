import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import SvgIcon from '@/components/Card/SvgIcon'; // Utilisez votre composant SvgIcon
import { AnnonceParagraph, Paragraph } from '@/constants/StyledText';

const SubcategoryCard = ({ darkMode, selectedCategory, onCategoryClick }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth / 3 - 25;

  const getStyleForSubcategory = () => ({
    contentContainerColor: darkMode ? color.neutralCoral : lightTheme.lightShade,
    textColor: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
  });

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://192.168.1.15:3000/api/subcategories');
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
      const response = await fetch(`http://192.168.1.15:3000/api/words/${categorieId}`);
      const data = await response.json();
      setWords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erreur lors de la récupération des mots:', error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleCategoryClick = (categorieId) => {
    if (selectedCategory === categorieId) {
      onCategoryClick(null);
      setWords([]);
    } else {
      onCategoryClick(categorieId);
      fetchWords(categorieId);
    }
  };

  const normalizeIconName = (name) => {
    return name.trim();
  };

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
        subcategories.map((subcategory) => {
          const { contentContainerColor, textColor } = getStyleForSubcategory();
          const iconName = normalizeIconName(subcategory.categorie_name);

          return (
            <TouchableOpacity
              key={subcategory.categorie_id}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: selectedCategory === subcategory.categorie_id ? contentContainerColor : lightTheme.lightShade,
                },
              ]}
              onPress={() => handleCategoryClick(subcategory.categorie_id)}
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
                <View
                  style={[
                    styles.iconContainer
                  ]}
                >
                  <SvgIcon icon={iconName} fillColor={textColor} />
                </View>
                <View>
                  <Paragraph style={[styles.label, { color: textColor }]}>
                    {subcategory.categorie_name}
                  </Paragraph>
                  <Paragraph style={[styles.label, { color: textColor }]}>
                    {subcategory.word_count}
                  </Paragraph>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.noDataText}>No categories available</Text>
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
