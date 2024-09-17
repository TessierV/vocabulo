import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import SvgIcon from '@/components/Card/SvgIcon';
import { BigTitle } from '@/constants/StyledText';

const Page = () => {
  const [darkMode] = useDarkMode();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {

      const response = await fetch('http://192.168.0.12:3000/api/categories');
      //const response = await fetch('http://10.10.0.8:3000/api/categories');
      //const response = await fetch('http://192.168.0.12:3000/api/categories');

      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle click on a category
  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      // If the category is already selected, deselect it
      setSelectedCategory(null);
    } else {
      // Otherwise, select the category
      setSelectedCategory(categoryId);
    }
  };

  // Show a loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={darkMode ? color.neutralCoral : color.neutralCoral} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <BigTitle style={{ color: darkMode ? color.neutralCoral : color.neutralCoral, marginBottom: 20 }}>
          Categories
        </BigTitle>
        {categories.map((category) => (
          <View key={category.categorie_id}>
            <TouchableOpacity
              style={styles.subcategoryContainer}
              onPress={() => handleCategoryClick(category.categorie_id)}
            >
              <SvgIcon icon={category.categorie_name} fillColor={color.neutralCoral} />
              <Text style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade, marginLeft: 10 }}>
                {category.categorie_name} ({category.totalWordCount} words)
              </Text>
            </TouchableOpacity>
            {selectedCategory === category.categorie_id && (
              <View style={styles.subcategoriesContainer}>
                {/* Words directly associated with the category */}
                {(category.categoryWords || []).map((word) => (
                  <View key={word.mot_id} style={styles.wordItemContainer}>
                    <Text style={styles.word}>{word.mot}</Text>
                    <Text style={styles.definition}>{word.definition}</Text>
                    {word.signes && word.signes.map((signe, index) => (
                      <View key={index}>
                        <Text>Sign URL: {signe.url_sign}</Text>
                        <Text>Definition URL: {signe.url_def}</Text>
                      </View>
                    ))}
                  </View>
                ))}

                {/* Subcategories */}
                {(category.subcategories || []).map((subcategory) => (
                  <View key={subcategory.subcat_id} style={styles.subcategoryDetailContainer}>
                    <Text style={styles.subcategoryTitle}>{subcategory.subcategory_name} ({subcategory.wordCount} words)</Text>
                    {(subcategory.words || []).map((word) => (
                      <View key={word.mot_id} style={styles.wordItemContainer}>
                        <Text style={styles.word}>{word.mot}</Text>
                        <Text style={styles.definition}>{word.definition}</Text>
                        {word.signes && word.signes.map((signe, index) => (
                          <View key={index}>
                            <Text>Sign URL: {signe.url_sign}</Text>
                            <Text>Definition URL: {signe.url_def}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: 20,
  },
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  subcategoriesContainer: {
    paddingLeft: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 10,
  },
  subcategoryDetailContainer: {
    marginBottom: 10,
  },
  subcategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'pink',
  },
  wordItemContainer: {
    marginBottom: 10,
  },
  word: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  definition: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Page;
