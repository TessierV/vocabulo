import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import uuid from 'react-native-uuid'; // For generating unique quiz IDs
import { useNavigation } from '@react-navigation/native'; // Navigation between screens
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing quiz progress locally
import Header from '@/components/Header/Header'; // Header component
import { darkTheme, lightTheme, color } from '@/constants/Colors'; // Color themes for dark and light modes
import useDarkMode from '@/components/useDarkMode'; // Custom hook for managing dark mode
import { BigTitle, Paragraph } from '@/constants/StyledText'; // Styled text components
import ExplanationModal from '@/components/Ai/ExplanationModal'; // Modal component to explain features
import { ai } from '@/constants/texts'; // Text content for internationalization
import SliderAI from '@/components/Ai/SliderAI'; // Custom AI slider component
import QuizStartModal from '@/components/Ai/QuizStartModal'; // Modal component for starting a quiz
import config from '@/backend/config/config';

export default function AIScreen() {
  // State variables
  const [darkMode, toggleDarkMode] = useDarkMode(); // Manage dark mode state
  const [recommendations, setRecommendations] = useState([]); // Store quiz word recommendations
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [errorMessage, setErrorMessage] = useState(''); // Error message if recommendations fetching fails
  const [modalVisible, setModalVisible] = useState(false); // Control the visibility of the quiz start modal
  const [sliderModalVisible, setSliderModalVisible] = useState(false); // Control the visibility of the slider modal
  const [generatedQuestions, setGeneratedQuestions] = useState([]); // Store the generated quiz questions
  const [expirationTime, setExpirationTime] = useState(null); // Store the expiration time for the quiz
  const [iaquizId, setIaquizId] = useState(null); // Store the unique ID for each quiz session
  const navigation = useNavigation(); // Hook for navigation between screens

  // Fetch recommendations on component mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Call the backend API to fetch word recommendations for the quiz
        const response = await axios.post(`${config.BASE_URL}:8000/get_recommendations`, {
          user_id: '001b6789-96de-448c-9ede-5c787514be27', // Example user ID
        });
        setRecommendations(response.data.recommendations); // Set recommendations from API response
      } catch (error) {
        setErrorMessage('Error fetching recommendations'); // Set error message if API call fails
      } finally {
        setLoading(false); // Stop loading state after fetching data
      }
    };
    fetchRecommendations();
  }, []); // Empty dependency array to run once when component mounts

  // Function to generate quiz questions based on the number of questions requested
  const generateQuestions = (numQuestions) => {
    // If there aren't enough recommendations to generate a quiz
    if (recommendations.length < numQuestions * 2) {
      Alert.alert('Erreur', 'Pas assez de mots pour générer des questions.');
      return;
    }

    const questions = [];
    const usedWords = new Set(); // Track used words to avoid duplication

    // Function to get a random word from the recommendations
    const getRandomWord = () => {
      let randomWord;
      do {
        randomWord = recommendations[Math.floor(Math.random() * recommendations.length)];
      } while (usedWords.has(randomWord)); // Ensure the word hasn't been used already
      usedWords.add(randomWord); // Add word to used words set
      return randomWord;
    };

    // Generate questions until the requested number is met
    while (questions.length < numQuestions) {
      const correctWord = getRandomWord(); // Get a correct word
      const incorrectWords = [];

      // Add 3 incorrect words to the question
      while (incorrectWords.length < 3) {
        const word = recommendations[Math.floor(Math.random() * recommendations.length)];
        if (!incorrectWords.includes(word) && word !== correctWord) {
          incorrectWords.push(word); // Ensure incorrect words are not duplicated
        }
      }

      questions.push({ correctWord, incorrectWords }); // Add the question with correct and incorrect words
    }

    // Generate a new quiz ID and set the expiration time for 24 hours
    const newIaquizId = uuid.v4();
    setIaquizId(newIaquizId);
    setExpirationTime(Date.now() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    setGeneratedQuestions(questions); // Save generated questions
    setModalVisible(true); // Open the quiz start modal
  };

  // Function to navigate to the quiz page and save the quiz data
  const handleQuizNavigation = async () => {
    await AsyncStorage.setItem(`iaquiz_${iaquizId}`, JSON.stringify({ questions: generatedQuestions, expirationTime }));
    navigation.navigate('iaquizpage/[iaquiz_id]', { iaquiz_id: iaquizId }); // Navigate to quiz page with quiz ID
    setModalVisible(false); // Close the modal after navigation
  };

  // Function to render buttons with different numbers of questions
  const renderButton = (numQuestions) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: darkMode ? 'transparent' : lightTheme.dark_lightShade, borderColor: darkMode ? darkTheme.neutral : color.neutral }]}
      onPress={() => generateQuestions(numQuestions)}
    >
      <Paragraph style={[styles.buttonText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>
        {ai.renderQuestion} {/* Render the text for the button */}
      </Paragraph>
      <BigTitle style={[styles.buttonQuestionNumber, { color: darkMode ? darkTheme.neutral : lightTheme.darkShade }]}>
        {numQuestions} {/* Render the number of questions on the button */}
      </BigTitle>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      {/* Header component with dark mode toggle */}
      <Header darkMode={darkMode} PageTitle={ai.header.title} firstLink="home" iconName="profil" secondLink="/profil" />

      {/* Slider AI component */}
      <SliderAI darkMode={darkMode} setSliderModalVisible={setSliderModalVisible} />

      {/* Main content area */}
      <View style={styles.container}>
        {/* Show ActivityIndicator while loading */}
        {loading ? (
          <ActivityIndicator size="large" color={darkMode ? color.darkPlum : color.darkBlue} />
        ) : (
          <View style={styles.buttonContainer}>
            {/* Render buttons for generating 1, 3, or 5 questions */}
            {renderButton(1)}
            {renderButton(3)}
            {renderButton(5)}
          </View>
        )}

        {/* If there's a quiz expiration time, show the "Resume Quiz" button */}
        {expirationTime && (
          <TouchableOpacity
            style={[styles.buttonSave, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}
            onPress={async () => {
              const savedProgress = await AsyncStorage.getItem(`iaquiz_progress_${iaquizId}`);
              if (savedProgress) {
                navigation.navigate('iaquizpage/[iaquiz_id]', { iaquiz_id: iaquizId });
              } else {
                Alert.alert(ai.container.errorsave, ai.container.errornosave); // Show an alert if there's no saved progress
              }
            }}
          >
            <Paragraph style={[styles.buttonText, { color: darkMode ? color.neutral : lightTheme.dark_lightShade }]}>
              {ai.container.title} {/* Text for resuming the quiz */}
            </Paragraph>
            <Paragraph style={[styles.expirationTime, { color: darkMode ? darkTheme.neutral : lightTheme.neutral }]}>
              {ai.container.subtitle}{new Date(expirationTime).toLocaleString()} {/* Show quiz expiration time */}
            </Paragraph>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal for starting the quiz */}
      <QuizStartModal modalVisible={modalVisible} setModalVisible={setModalVisible} darkMode={darkMode} navigateToQuiz={handleQuizNavigation} />

      {/* Modal for explaining features */}
      <ExplanationModal visible={sliderModalVisible} onClose={() => setSliderModalVisible(false)} darkMode={darkMode} />
    </View>
  );
}

// Styles for the screen components
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    width: '90%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '30%',
    minHeight: 100,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonSave: {
    width: '100%',
    bottom: 20,
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonQuestionNumber: {
    fontSize: 30,
  },
  buttonText: {
    fontSize: 12,
  },
  expirationTime: {
    marginTop: 5,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(38, 45, 52, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
