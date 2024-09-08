import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

// Définir le type pour les paramètres de route
type RootStackParamList = {
  'subcat/[subcat_id]': {
    subcat_id: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'all';
    words?: Array<{
      mot: string;
      definition: string;
      mot_id: number;
      signs: Array<{
        urlSign: string;
        urlDef: string;
      }>;
    }>;
  };
};

// Définir le type pour les paramètres spécifiques de cette route
type NewPageRouteProp = RouteProp<RootStackParamList, 'subcat/[subcat_id]'>;

const NewPage = () => {
  const route = useRoute<NewPageRouteProp>();
  const { subcat_id, difficulty, words } = route.params || {};

  const [subcategoryData, setSubcategoryData] = useState<{ words: any[] } | null>(null);
  const [loading, setLoading] = useState(!words);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Route params:", route.params);

    if (!words) {
      const fetchSubcategoryData = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`http://192.168.0.12:3000/api/subcategories/${subcat_id}`);
          const data = await response.json();
          console.log("Fetched data:", data);

          if (!data || !data.words) {
            throw new Error('Subcategory not found or missing words');
          }

          // Applique le filtre de difficulté
          const filteredWords = filterWordsByDifficulty(data.words, difficulty);
          setSubcategoryData({ words: filteredWords });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSubcategoryData();
    } else {
      // Si les mots sont déjà fournis, on les utilise directement
      setSubcategoryData({ words });
    }
  }, [subcat_id, difficulty, words]);

  const filterWordsByDifficulty = (words: any[], filter: string) => {
    console.log("Filtering words with filter:", filter);
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!subcategoryData || !subcategoryData.words || subcategoryData.words.length === 0) {
    return <Text>No subcategory data available</Text>;
  }

  return (
    <ScrollView>
      <View>
        <Text>Difficulty: {difficulty || "No difficulty specified"}</Text>

        {subcategoryData.words.map((word, index) => (
          <View key={index}>
            <Text>{word.mot} - {word.definition}</Text>
            {word.signs && word.signs.length > 0 && word.signs.map((sign, index) => (
              <View key={index}>
                <Text>Sign Video: {sign.urlSign || "Not available"}</Text>
                <Text>Definition Video: {sign.urlDef || "Not available"}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subcategoryContainer: {
    marginVertical: 20,
  },
  subcategoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wordContainer: {
    marginVertical: 10,
  },
  wordText: {
    fontSize: 14,
  },
  signContainer: {
    marginTop: 5,
  },
  signText: {
    fontSize: 12,
    color: 'blue',
  },
});

export default NewPage;
