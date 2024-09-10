import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const Page = () => {
  const [subcategories, setSubcategories] = useState([]); // État pour stocker les sous-catégories
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [selectedCategory, setSelectedCategory] = useState(null); // État pour stocker la catégorie sélectionnée
  const [words, setWords] = useState([]); // État pour stocker les mots associés

  // Fonction pour récupérer les données de l'API des sous-catégories
  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://192.168.1.12:3000/api/subcategories'); // Remplacez par l'adresse IP de votre machine
      const data = await response.json();
      setSubcategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des sous-catégories:', error);
      setLoading(false);
    }
  };

  // Fonction pour récupérer les mots associés à une catégorie
  const fetchWords = async (categorieId: any) => {
    try {
      const response = await fetch(`http://192.168.1.12:3000/api/words/${categorieId}`); // Remplacez par l'adresse IP de votre machine
      const data = await response.json();
      setWords(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des mots:', error);
    }
  };

  // Utilisez useEffect pour récupérer les données lors du montage du composant
  useEffect(() => {
    fetchSubcategories();
  }, []);

  // Gestion du clic sur une sous-catégorie
  const handleCategoryClick = (categorieId: React.SetStateAction<null>) => {
    if (selectedCategory === categorieId) {
      // Si la catégorie est déjà sélectionnée, on la désélectionne
      setSelectedCategory(null);
      setWords([]);
    } else {
      // Sinon, on sélectionne la catégorie et récupère les mots associés
      setSelectedCategory(categorieId);
      fetchWords(categorieId);
    }
  };

  // Affiche un indicateur de chargement pendant que les données sont récupérées
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.neutralCoral} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors.darkBlue}}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={{ color: Colors.lightCoral, marginBottom: 20 }}>
          Sous-catégories
        </Text>
        {subcategories.map((subcategory) => (
          <View key={subcategory.categorie_id}>
            <TouchableOpacity
              style={styles.subcategoryContainer}
              onPress={() => handleCategoryClick(subcategory.categorie_id)}
            >
              <Text style={{ color: Colors.lightPlum, marginLeft: 10 }}>
                {subcategory.categorie_name} (Nombre de mots: {subcategory.word_count})
              </Text>
            </TouchableOpacity>
            {selectedCategory === subcategory.categorie_id && (
              <View style={styles.wordsContainer}>
                {words.map((word) => (
                  <Text key={word.mot_id} style={styles.wordItem}>
                    {word.mot}
                  </Text>
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
  wordsContainer: {
    paddingLeft: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 10,
  },
  wordItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default Page;