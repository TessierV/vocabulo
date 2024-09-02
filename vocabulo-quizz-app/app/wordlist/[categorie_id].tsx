// wordlist/[categorie_id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const WordListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { categorie_id, filter } = route.params as { categorie_id: string; filter: string }; // Extract `categorie_id` and `filter` from route parameters

  const [words, setWords] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching category and words from API...');
        const response = await fetch(`http://192.168.0.12:3000/api/words/${categorie_id}`);

        const textResponse = await response.text();
        console.log('Raw API Response:', textResponse);

        const data = JSON.parse(textResponse);

        if (!data) {
          throw new Error('Aucune donnée trouvée pour cette catégorie');
        }

        const wordMap = new Map();

        data.categoryWords.forEach(word => {
          if (wordMap.has(word.mot_id)) {
            wordMap.get(word.mot_id).definitions.add(word.definition || 'Non spécifiée');
            wordMap.get(word.mot_id).signes = [
              ...wordMap.get(word.mot_id).signes,
              ...(word.signes || [])
            ];
          } else {
            wordMap.set(word.mot_id, {
              mot: word.mot,
              definitions: new Set([word.definition || 'Non spécifiée']),
              signes: word.signes || []
            });
          }
        });

        data.subcategories.forEach(subcat => {
          subcat.words.forEach(word => {
            if (wordMap.has(word.mot_id)) {
              wordMap.get(word.mot_id).definitions.add(word.definition || 'Non spécifiée');
              wordMap.get(word.mot_id).signes = [
                ...wordMap.get(word.mot_id).signes,
                ...(word.signes || [])
              ];
            } else {
              wordMap.set(word.mot_id, {
                mot: word.mot,
                definitions: new Set([word.definition || 'Non spécifiée']),
                signes: word.signes || []
              });
            }
          });
        });

        const allWords = Array.from(wordMap.values()).map(word => ({
          ...word,
          definitions: Array.from(word.definitions).join(', ')
        }));

        const filteredWords = allWords.filter(word => {
          const hasUrlSign = word.signes.some(signe => signe.url_sign && signe.url_sign !== 'Non spécifié');
          const hasUrlDef = word.signes.some(signe => signe.url_def && signe.url_def !== 'Non spécifié');

          if (filter === 'easy') {
            return hasUrlSign && hasUrlDef;
          }
          if (filter === 'medium') {
            return (hasUrlSign || hasUrlDef) && !(hasUrlSign && hasUrlDef);
          }
          if (filter === 'hard') {
            return !hasUrlSign && !hasUrlDef;
          }
          return true;
        });

        filteredWords.sort((a, b) => a.mot.localeCompare(b.mot));

        setWords(filteredWords);
        setCategoryName(data.categorie_name || 'Nom de catégorie non spécifié');
      } catch (err) {
        console.error('Fetch Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [categorie_id, filter]);

  const renderItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text style={styles.wordText}>{item.mot}</Text>
      <Text style={styles.definitionText}>Définition(s): {item.definitions}</Text>
      {item.signes.length > 0 && (
        <View style={styles.signContainer}>
          {item.signes.map((sign, index) => (
            <View key={index} style={styles.signItem}>
              <Text style={styles.signText}>Définition du signe: {sign.url_def}</Text>
              <Text style={styles.signText}>Définition du signe: {sign.url_sign}</Text>

            </View>
          ))}
        </View>
      )}
    </View>
  );

  const keyExtractor = (item) => item.mot_id ? item.mot_id.toString() : Math.random().toString();

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (error) {
    return <Text style={styles.errorText}>Erreur: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Liste des mots pour la catégorie {categorie_id}: {categoryName}</Text>
      <FlatList
        data={words}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  wordItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  wordText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  definitionText: {
    fontSize: 14,
    marginVertical: 5,
  },
  signContainer: {
    marginTop: 10,
  },
  signItem: {
    marginBottom: 10,
  },
  signImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  signText: {
    fontSize: 14,
    color: '#007bff',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WordListScreen;
