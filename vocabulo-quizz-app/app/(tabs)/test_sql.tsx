import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Button, Linking } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { BigTitle } from '@/constants/StyledText';

const Page = () => {
  const [darkMode] = useDarkMode();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomItem, setRandomItem] = useState(null);
  const [filter, setFilter] = useState('Tout');

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.0.12:3000/api/categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleRandomize = () => {
    if (categories.length === 0) return;

    let validRandomItem = null;

    while (!validRandomItem) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      if (Math.random() < 0.5 && randomCategory.subcategories?.length > 0) {
        const randomSubcategory = randomCategory.subcategories[Math.floor(Math.random() * randomCategory.subcategories.length)];

        if ((randomSubcategory.words || []).length >= 5) {
          validRandomItem = {
            type: 'subcategory',
            data: randomSubcategory,
            parentCategoryName: randomCategory.categorie_name,
          };
        }
      } else if ((randomCategory.categoryWords || []).length >= 5) {
        validRandomItem = {
          type: 'category',
          data: randomCategory,
        };
      }
    }

    setRandomItem(validRandomItem);
  };

  const getFilteredWords = (words) => {
    switch (filter) {
      case 'Easy':
        return words.filter(word =>
          word.signes.every(sign => sign.url_def !== 'Non spécifié' && sign.url_sign !== 'Non spécifié')
        );
      case 'Middle':
        return words.filter(word => {
          const hasSignUrl = word.signes.some(sign => sign.url_sign !== 'Non spécifié');
          const hasDefUrl = word.signes.some(sign => sign.url_def !== 'Non spécifié');
          return (hasSignUrl && !hasDefUrl) || (!hasSignUrl && hasDefUrl);
        });
      case 'Hard':
        return words.filter(word =>
          word.signes.every(sign => sign.url_def === 'Non spécifié' && sign.url_sign === 'Non spécifié')
        );
      default:
        return words;
    }
  };


  const countWordsByDifficulty = (words) => {
    return words.reduce((counts, word) => {
      const hasSignUrl = word.signes.some(sign => sign.url_sign !== 'Non spécifié');
      const hasDefUrl = word.signes.some(sign => sign.url_def !== 'Non spécifié');

      if (hasSignUrl && hasDefUrl) {
        counts.Easy += 1;
      } else if ((hasSignUrl && !hasDefUrl) || (!hasSignUrl && hasDefUrl)) {
        counts.Middle += 1;
      } else {
        counts.Hard += 1;
      }

      return counts;
    }, { Easy: 0, Middle: 0, Hard: 0 });
  };

  const getRandomItemCounts = () => {
    if (!randomItem) return { total: 0, Easy: 0, Middle: 0, Hard: 0 };

    const words = randomItem.type === 'category' ? randomItem.data.categoryWords : randomItem.data.words;

    const counts = countWordsByDifficulty(words);
    const total = words.length;

    return { total, ...counts };
  };

  const getTotalWordCounts = () => {
    let easyCount = 0;
    let middleCount = 0;
    let hardCount = 0;

    categories.forEach(category => {
      if (filter === 'Tout' || filter === 'Easy') {
        easyCount += countWordsByDifficulty(category.categoryWords || []).Easy;
        category.subcategories.forEach(subcat => {
          easyCount += countWordsByDifficulty(subcat.words || []).Easy;
        });
      }
      if (filter === 'Tout' || filter === 'Middle') {
        middleCount += countWordsByDifficulty(category.categoryWords || []).Middle;
        category.subcategories.forEach(subcat => {
          middleCount += countWordsByDifficulty(subcat.words || []).Middle;
        });
      }
      if (filter === 'Tout' || filter === 'Hard') {
        hardCount += countWordsByDifficulty(category.categoryWords || []).Hard;
        category.subcategories.forEach(subcat => {
          hardCount += countWordsByDifficulty(subcat.words || []).Hard;
        });
      }
    });

    return { Easy: easyCount, Middle: middleCount, Hard: hardCount };
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={darkMode ? color.neutralCoral : color.neutralCoral} />
      </View>
    );
  }

  const totalWordCounts = getTotalWordCounts();
  const randomItemWordCounts = randomItem ? getRandomItemCounts() : { Easy: 0, Middle: 0, Hard: 0 };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <BigTitle style={{ color: darkMode ? color.neutralCoral : color.neutralCoral, marginBottom: 20 }}>
          Categories
        </BigTitle>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {['Tout', 'Easy', 'Middle', 'Hard'].map((filterOption) => (
            <TouchableOpacity
              key={filterOption}
              style={[
                styles.filterButton,
                filter === filterOption && styles.selectedFilterButton
              ]}
              onPress={() => setFilter(filterOption)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === filterOption && styles.selectedFilterButtonText
                ]}
              >
                {filterOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Randomize" onPress={handleRandomize} color={color.neutralCoral} />

        {randomItem && (
          <View style={styles.randomContainer}>
            <Text style={styles.randomTitle}>
              {randomItem.type === 'category' ?
                `Random Category: ${randomItem.data.categorie_name}` :
                `Random Subcategory: ${randomItem.data.subcategory_name} (from ${randomItem.parentCategoryName})`}
            </Text>

            {(() => {
              const { total, Easy, Middle, Hard } = randomItemWordCounts;

              return (
                <View>
                  <Text>Total Words: {total}</Text>
                  <Text>Easy: {Easy}/{total}</Text>
                  <Text>Middle: {Middle}/{total}</Text>
                  <Text>Hard: {Hard}/{total}</Text>
                  {(randomItem.type === 'category' ? getFilteredWords(randomItem.data.categoryWords || []) : getFilteredWords(randomItem.data.words || [])).map((word) => (
                    <View key={word.mot_id} style={styles.wordItemContainer}>
                      <Text style={styles.word}>{word.mot}</Text>
                      <Text style={styles.definition}>{word.definition}</Text>
                      {word.signes.map((sign) => (
                        <View key={sign.signe_id} style={styles.signContainer}>
                          <Text style={styles.signText}>Sign URL:</Text>
                          <Text
                            style={styles.signUrl}
                            onPress={() => Linking.openURL(sign.url_sign)}
                          >
                            {sign.url_sign}
                          </Text>
                          <Text style={styles.signText}>Definition URL:</Text>
                          <Text
                            style={styles.signUrl}
                            onPress={() => Linking.openURL(sign.url_def)}
                          >
                            {sign.url_def}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              );
            })()}
          </View>
        )}
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
    flexGrow: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.neutralCoral,
  },
  selectedFilterButton: {
    backgroundColor: color.neutralCoral,
  },
  filterButtonText: {
    color: color.neutralCoral,
  },
  selectedFilterButtonText: {
    color: '#fff',
  },
  randomContainer: {
    marginTop: 20,
  },
  randomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  signContainer: {
    marginTop: 10,
  },
  signText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  signUrl: {
    fontSize: 12,
    color: 'blue',
  },
});

export default Page;
