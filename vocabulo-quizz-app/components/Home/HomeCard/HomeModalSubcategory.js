import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import SvgIcon from '@/components/Card/SvgIcon'; // Assurez-vous que le chemin est correct
import { Title, BigTitle } from '@/constants/StyledText';

const HomeModalSubcategory = () => {
  const [darkMode] = useDarkMode();
  const [subcategories, setSubcategories] = useState([]); // État pour stocker les sous-catégories
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [selectedCategory, setSelectedCategory] = useState(null); // État pour stocker la catégorie sélectionnée

  // Fonction pour récupérer les données de l'API des sous-catégories
  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://192.168.1.15:3000/api/subcategories'); // Remplacez par l'adresse IP de votre machine
      const data = await response.json();
      setSubcategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des sous-catégories:', error);
      setLoading(false);
    }
  };

  // Utilisez useEffect pour récupérer les données lors du montage du composant
  useEffect(() => {
    fetchSubcategories();
  }, []);

  // Gestion du clic sur une sous-catégorie
  const handleCategoryClick = (categorieId) => {
    if (selectedCategory === categorieId) {
      // Si la catégorie est déjà sélectionnée, on la désélectionne
      setSelectedCategory(null);
    } else {
      // Sinon, on sélectionne la catégorie
      setSelectedCategory(categorieId);
    }
  };

  // Affiche un indicateur de chargement pendant que les données sont récupérées
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
          Sous-catégories
        </BigTitle>
        {subcategories.map((category) => (
          <View key={category.categorie_id}>
            <TouchableOpacity
              style={styles.subcategoryContainer}
              onPress={() => handleCategoryClick(category.categorie_id)}
            >
              <SvgIcon icon={category.categorie_name.toLowerCase()} fillColor={color.neutralCoral} />
              <Text style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade, marginLeft: 10 }}>
                {category.categorie_name} (Nombre de mots: {category.word_count})
              </Text>
            </TouchableOpacity>
            {selectedCategory === category.categorie_id && (
              <View style={styles.subcategoriesContainer}>
                {(category.subcategories || []).map((subcategory) => (
                  <View key={subcategory.subcategory_id} style={styles.subcategoryDetailContainer}>
                    <Text style={styles.subcategoryTitle}>{subcategory.subcategory_name}</Text>
                    {(subcategory.words || []).map((word) => (
                      <View key={word.mot_id} style={styles.wordItemContainer}>
                        <Text style={styles.word}>{word.mot}</Text>
                        <Text style={styles.definition}>{word.definition}</Text>
                        {word.url_sign && (
                          <View>
                            <Text>Sign URL: {word.url_sign}</Text>
                            <Text>Definition URL: {word.url_def}</Text>
                          </View>
                        )}
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
    backgroundColor: '#FFF', // Conteneur blanc
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

export default HomeModalSubcategory;
