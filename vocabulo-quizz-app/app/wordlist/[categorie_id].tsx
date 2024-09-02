// wordlist/[categorie_id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import SvgIcon from '@/SVG/CategoryWordSvg'; // Assurez-vous que ce fichier existe et est correct

const WordListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { categorie_id, filter = 'all' } = route.params;

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour filtrer les mots par difficulté
  const filterWordsByDifficulty = (words, difficulty) => {
    console.log('Filter Words By Difficulty');
    console.log('Words:', words);
    console.log('Difficulty:', difficulty);

    if (!Array.isArray(words)) {
      console.error('Expected an array of words, but got:', words);
      return [];
    }

    const filteredWords = words.filter(word => {
      if (!word.signes || !Array.isArray(word.signes)) {
        console.warn('Skipping word due to invalid signes:', word);
        return false;
      }

      const hasUrlSign = word.signes.some(signe => signe.url_sign && signe.url_sign !== 'Non spécifié');
      const hasUrlDef = word.signes.some(signe => signe.url_def && signe.url_def !== 'Non spécifié');

      if (difficulty === 'easy') {
        return hasUrlSign && hasUrlDef;
      }
      if (difficulty === 'medium') {
        return (hasUrlSign || hasUrlDef) && !(hasUrlSign && hasUrlDef);
      }
      if (difficulty === 'hard') {
        return !hasUrlSign && !hasUrlDef;
      }
      return true;
    });

    console.log('Filtered Words:', filteredWords);
    return filteredWords;
  };

  // Appliquer le filtre
  const applyFilter = (wordsArray) => {
    console.log('Applying Filter');
    const filtered = filterWordsByDifficulty(wordsArray, filter);
    console.log('Filtered Words After Apply:', filtered);
    setWords(filtered);
  };

  // Charger les mots filtrés lors du changement de catégorie ou de filtre
  useEffect(() => {
    console.log('useEffect triggered');
    const fetchWords = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching words from API...');
        const response = await fetch(`http://192.168.0.12:3000/api/words/${categorie_id}`);
        const data = await response.json();

        console.log('API Response Data:', data);

        if (!data) {
          throw new Error('Aucune donnée trouvée pour cette catégorie');
        }

        // Assurez-vous que la structure de `data` correspond à ce qui est attendu
        console.log('Data Structure:', data);

        applyFilter(data);
      } catch (err) {
        console.error('Fetch Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [categorie_id, filter]);

  const renderItem = ({ item }) => {
    console.log('Rendering Item:', item);

    const svgIconName = item.mot.toLowerCase(); // Supposons que item.mot donne un nom pour l'icône SVG
    return (
      <View style={styles.wordItem}>
        <SvgIcon icon={svgIconName} style={styles.svgIcon} />
        <Text style={styles.wordText}>{item.mot}</Text>
        <Text style={styles.definitionText}>Définition: {item.definition || 'Non spécifiée'}</Text>
        {item.signes && item.signes.map((signe, index) => (
          <View key={index} style={styles.signContainer}>
            <Text>URL Sign: {signe.url_sign || 'Non spécifié'}</Text>
            <Text>URL Def: {signe.url_def || 'Non spécifié'}</Text>
          </View>
        ))}
      </View>
    );
  };

  const keyExtractor = (item) => item.mot_id ? item.mot_id.toString() : Math.random().toString();

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>Erreur: {error}</Text>;
  }

  if (!categorie_id) {
    return <Text>Catégorie non spécifiée</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Liste des mots pour la catégorie {categorie_id}</Text>
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
    marginVertical: 5,
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
});

export default WordListScreen;
