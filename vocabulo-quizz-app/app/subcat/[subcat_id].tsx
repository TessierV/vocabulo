import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

const NewPage = () => {
  const route = useRoute();
  const { subcat_id } = route.params;

  const [subcategory, setSubcategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (subcat_id) {
      const fetchSubcategory = async (id) => {
        try {
          const response = await fetch(`http://192.168.1.15:3000/api/categories/basique/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Fetched subcategory:', data);
          setSubcategory(data);
        } catch (error) {
          console.error('Error fetching subcategory:', error);
          setError(error.message);
        }
      };

      fetchSubcategory(subcat_id);
    } else {
      console.error('subcat_id is undefined');
      setError('ID de sous-catégorie manquant');
    }
  }, [subcat_id]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Récapitulatif</Text>
      {subcategory && (
        <View style={styles.subcategoryContainer}>
          <Text style={styles.subcategoryName}>{subcategory.subcategory_name}</Text>

          <ScrollView>
            {Array.isArray(subcategory.words) && subcategory.words.length > 0 ? (
              subcategory.words.map((word) => (
                <View key={word.mot_id} style={styles.wordContainer}>
                  <Text style={styles.wordText}>
                    {word.mot} - {word.definition}
                  </Text>
                  {Array.isArray(word.signes) && word.signes.length > 0 ? (
                    word.signes.map((sign, index) => (
                      <View key={index} style={styles.signContainer}>
                        {sign.url_sign && sign.url_sign !== 'Non spécifié' ? (
                          <TouchableOpacity onPress={() => Linking.openURL(sign.url_sign)}>
                            <Text style={styles.signText}>Sign Video: {sign.url_sign}</Text>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.signText}>Sign Video: N/A</Text>
                        )}
                        {sign.url_def && sign.url_def !== 'Non spécifié' ? (
                          <TouchableOpacity onPress={() => Linking.openURL(sign.url_def)}>
                            <Text style={styles.signText}>Definition Video: {sign.url_def}</Text>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.signText}>Definition Video: N/A</Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.signText}>No signs available</Text>
                  )}
                </View>
              ))
            ) : (
              <Text>No words available</Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
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
    color: 'blue', // Optional: To indicate that it's a link
  },
});

export default NewPage;
