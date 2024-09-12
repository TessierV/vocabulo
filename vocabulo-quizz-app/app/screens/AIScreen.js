import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather'; // Import Feather icons
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import Header from '@/components/Header/Header';
import useDarkMode from '@/components/useDarkMode';

export default function AIScreen() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(3);

  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://192.168.0.12:8000/get_recommendations', {
          user_id: '001b6789-96de-448c-9ede-5c787514be27',
        });
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setErrorMessage('Error fetching recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Function to generate questions
  const generateQuestions = (numQuestions) => {
    const questions = [];
    const usedWords = new Set();

    const getRandomWord = () => {
      let randomWord;
      do {
        randomWord = recommendations[Math.floor(Math.random() * recommendations.length)];
      } while (usedWords.has(randomWord));
      usedWords.add(randomWord);
      return randomWord;
    };

    while (questions.length < numQuestions) {
      if (recommendations.length < numQuestions * 2) {
        Alert.alert('Erreur', 'Pas assez de mots pour générer des questions.');
        return;
      }

      const correctWord = getRandomWord();
      const correctWordIndex = recommendations.indexOf(correctWord);

      const incorrectWords = [];
      while (incorrectWords.length < 3) {
        const randomIndex = Math.floor(Math.random() * recommendations.length);
        const word = recommendations[randomIndex];
        if (randomIndex !== correctWordIndex && !incorrectWords.includes(word)) {
          incorrectWords.push(word);
        }
      }

      questions.push({
        correctWord,
        incorrectWords,
      });
    }

    setGeneratedQuestions(questions);
    setModalVisible(true); // Show modal with generated questions
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  return (
    <View style={styles.mainContainer}>

    <View style={styles.container}>
    <Header darkMode={darkMode} PageTitle="Profile" firstLink="home" secondLink="/profil" />

      <View style={styles.header}>
        <Text style={styles.title}>Recommendations</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Feather name="home" size={30} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('profil')}>
            <Feather name="user" size={30} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons to generate 3, 5, or 7 questions */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setNumQuestions(1);
            generateQuestions(1);
          }}>
          <Text style={styles.buttonText}>1 Question</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setNumQuestions(3);
            generateQuestions(3);
          }}>
          <Text style={styles.buttonText}>3 Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setNumQuestions(5);
            generateQuestions(5);
          }}>
          <Text style={styles.buttonText}>5 Questions</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Quizz non fini</Text>
      </View>

      {/* Modal to display generated questions */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Generated Questions</Text>
          <ScrollView>
            {generatedQuestions.map((item, index) => (
              <View key={index} style={styles.questionCard}>
                <Text style={styles.mot}>Correct Word: {item.correctWord.mot}</Text>
                <Text>Category: {item.correctWord.category}</Text>
                <Text>Subcategory: {item.correctWord.subcategory}</Text>
                <TouchableOpacity onPress={() => console.log('Play sign video', item.correctWord.url_sign)}>
                  <Text style={styles.link}>Play Correct Sign Video</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Play definition video', item.correctWord.url_def)}>
                  <Text style={styles.link}>Play Correct Definition Video</Text>
                </TouchableOpacity>

                <Text style={styles.mot}>Incorrect Words:</Text>
                {item.incorrectWords.map((word, i) => (
                  <View key={i}>
                    <Text style={styles.incorrectWord}>Mot: {word.mot}</Text>
                    <Text>Category: {word.category}</Text>
                    <Text>Subcategory: {word.subcategory}</Text>
                    <TouchableOpacity onPress={() => console.log('Play sign video', word.url_sign)}>
                      <Text style={styles.link}>Play Incorrect Sign Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Play definition video', word.url_def)}>
                      <Text style={styles.link}>Play Incorrect Definition Video</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: '10%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {

    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  mot: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incorrectWord: {
    color: '#ff4d4d',
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
