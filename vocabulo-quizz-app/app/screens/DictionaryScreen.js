import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import SearchAndKeyboard from '@/components/Dictionary/SearchAndKeyboard';
import WordSuggestionsDisplay from '@/components/Dictionary/WordSuggestionsDisplay';
import VideoModal from '@/components/Dictionary/VideoModal';
import Header from '@/components/Header/Header';
import useDarkMode from '@/components/useDarkMode';
import SliderDictionary from '@/components/Dictionary/SliderDictionary';
import { lightTheme, darkTheme, grammaticalCategoryColors, grammaticalCategoryColorsDaltonian } from '@/constants/Colors'; // Import both color sets
import { dictionary } from '@/constants/texts';

// Fetch function to get words by search term
async function fetchWordsBySearchTerm(searchTerm) {
  try {
    const response = await fetch(`http://192.168.0.12:3000/api/alphabet/search?searchTerm=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la récupération des mots: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du fetch des mots:', error);
    throw error;
  }
}

const DictionaryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordSuggestions, setWordSuggestions] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [isDaltonianMode, setIsDaltonianMode] = useState(false);

  // Debounce effect to delay search requests
  useEffect(() => {
    if (searchTerm.length > 1) {
      const delayDebounceFn = setTimeout(() => {
        fetchSuggestionsByLetter(searchTerm); // Call the correct function for fetching suggestions
      }, 300); // 300ms debounce

      return () => clearTimeout(delayDebounceFn); // Cleanup debounce
    }
  }, [searchTerm]);

  // Function to fetch suggestions based on the search term
  const fetchSuggestionsByLetter = async (term) => {
    try {
      const data = await fetchWordsBySearchTerm(term);

      if (!data || !Array.isArray(data.words)) {
        setError('Données inattendues reçues.');
        return;
      }

      // Set total word count only on the first search
      if (totalWordCount === 0) {
        setTotalWordCount(data.totalCount);
      }

      const filteredWords = data.words.filter((word) =>
        word.mot.toLowerCase().startsWith(term.toLowerCase())
      );

      setWordSuggestions(filteredWords.slice(0, 50)); // Limit to first 50 suggestions
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handles when a letter from the keyboard is pressed
  const handleLetterPress = (letter) => {
    setSearchTerm((prevSearchTerm) => `${prevSearchTerm}${letter}`); // Add the letter to the search term
    setWordSuggestions([]);
    setFinalResults([]);
  };

  // Validate the search term and trigger a fetch
  const handleSearchValidation = () => {
    setLoading(true);
    fetchWordsBySearchTerm(searchTerm)
      .then(data => {
        if (!data || !Array.isArray(data.words)) {
          throw new Error('Données inattendues reçues.');
        }

        setFinalResults(data.words);
        setTotalWordCount(data.totalCount);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Opens the modal for playing a video
  const openVideoModal = (url) => {
    setVideoUrl(url);
    setModalVisible(true);
  };

  // Closes the video modal
  const closeModal = () => {
    setModalVisible(false);
    setVideoUrl('');
  };

  // Toggle between daltonian and standard color mode
  const toggleDaltonianMode = () => {
    setIsDaltonianMode(!isDaltonianMode);
  };

  // Determine the correct color set based on daltonian mode
  const currentColorSet = isDaltonianMode ? grammaticalCategoryColorsDaltonian : grammaticalCategoryColors;

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
      <Header darkMode={darkMode} PageTitle={dictionary.header.title} title="Dictionary" firstLink="/home" secondLink="none" />
      <ScrollView>
        <SliderDictionary
          darkMode={darkMode}
          isDaltonianMode={isDaltonianMode}
          toggleDaltonianMode={toggleDaltonianMode}
        />
        <SearchAndKeyboard
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleLetterPress={handleLetterPress}
          handleSearchValidation={handleSearchValidation}
          darkMode={darkMode}
        />
        <WordSuggestionsDisplay
          wordSuggestions={wordSuggestions}
          openVideoModal={openVideoModal}
          darkMode={darkMode}
          colorSet={currentColorSet}
        />
        <VideoModal
          videoUrl={videoUrl}
          modalVisible={modalVisible}
          closeModal={closeModal}
          darkMode={darkMode}
        />
      </ScrollView>
    </View>
  );
};

export default DictionaryScreen;
