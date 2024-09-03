import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import CategoryWordSvg from '@/SVG/CategoryWordSvg'; // Assurez-vous que vous importez correctement votre SvgIcon

const HomeListQuizz = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { categorie_id, filter } = route.params;

  const [words, setWords] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://10.3.0.8:3000/api/words/${categorie_id}`);
        const textResponse = await response.text();
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
        generateQuestions(filteredWords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [categorie_id, filter]);

  const generateQuestions = (words) => {
    const questions = [];
    const usedWords = new Set(); // To keep track of words already used in questions

    const getRandomWord = () => {
      let randomWord;
      do {
        randomWord = words[Math.floor(Math.random() * words.length)];
      } while (usedWords.has(randomWord));
      usedWords.add(randomWord);
      return randomWord;
    };

    while (questions.length < 4) { // Generate 4 questions
      if (words.length < 4) {
        Alert.alert('Error', 'Not enough words to generate questions.');
        return;
      }

      const correctWord = getRandomWord();
      const correctWordIndex = words.indexOf(correctWord);

      const incorrectWords = [];
      while (incorrectWords.length < 3) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        if (randomIndex !== correctWordIndex && !incorrectWords.includes(word) && !usedWords.has(word)) {
          incorrectWords.push(word);
        }
      }

      // Check if the word has an SVG icon
      const hasImage = correctWord.signes.some(signe => signe.url_sign && signe.url_sign !== 'Non spécifié');
      let svgIcon = null;

      if (hasImage) {
        svgIcon = <CategoryWordSvg icon={correctWord.mot} width="60" height="60" />;
      }

      let questionText;
      let hints;

      if (hasImage) {
        questionText = 'À quel mot correspond cette image?';
        hints = [
          `Définition : ${correctWord.definitions}`,
          `Définition : ${correctWord.definitions}, URL Définition : ${correctWord.signes[0]?.url_def || 'Non spécifié'}`,
          `Définition : ${correctWord.definitions}, URL Définition : ${correctWord.signes[0]?.url_def || 'Non spécifié'}, URL Signe : ${correctWord.signes[0]?.url_sign || 'Non spécifié'}`
        ];
      } else {
        questionText = `Quelle est la réponse correcte pour la définition suivante :\n${correctWord.definitions}`;
        hints = [
          `URL Définition : ${correctWord.signes[0]?.url_def || 'Non spécifié'}`,
          `URL Définition : ${correctWord.signes[0]?.url_def || 'Non spécifié'}, URL Signe : ${correctWord.signes[0]?.url_sign || 'Non spécifié'}`,
          `URL Signe : ${correctWord.signes[0]?.url_sign || 'Non spécifié'}`
        ];
      }

      const question = {
        questionText,
        svgIcon,
        answers: [
          ...incorrectWords.map(word => ({
            text: word.mot,
            correct: false,
            definition: word.definitions,
            url_def: word.signes[0]?.url_def || 'Non spécifié',
            url_sign: word.signes[0]?.url_sign || 'Non spécifié',
          })),
          {
            text: correctWord.mot,
            correct: true,
            definition: correctWord.definitions,
            url_def: correctWord.signes[0]?.url_def || 'Non spécifié',
            url_sign: correctWord.signes[0]?.url_sign || 'Non spécifié',
          }
        ].sort(() => 0.5 - Math.random()),
        hints
      };

      questions.push(question);
    }

    setQuestions(questions);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const validateAnswer = () => {
    if (selectedAnswer) {
      if (selectedAnswer.correct) {
        setScore(prevScore => prevScore + 1);
        moveToNextQuestion();
      } else {
        Alert.alert('Incorrect', 'Try again!');
      }
    } else {
      Alert.alert('Warning', 'Please select an answer before validating.');
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowModal(true);
    }
  };

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (error) {
    return <Text style={styles.errorText}>Erreur: {error}</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex] || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Quiz: {categoryName}</Text>
      <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      {currentQuestion.svgIcon}

      {currentQuestion.answers && currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === answer && styles.selectedAnswerButton,
          ]}
          onPress={() => handleAnswerSelection(answer)}
        >
          <Text style={styles.answerText}>{answer.text}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.validateButton} onPress={validateAnswer}>
        <Text style={styles.validateButtonText}>Validate</Text>
      </TouchableOpacity>

      {showModal && (
        <View style={styles.modal}>
          <Text style={styles.modalText}>Quiz finished! Your score: {score}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={words}
        keyExtractor={(item) => item.mot}
        renderItem={({ item }) => (
          <View style={styles.wordItem}>
            <CategoryWordSvg icon={item.mot} width="60" height="60" />
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
        )}
        ListHeaderComponent={<Text style={styles.listHeader}>Word List:</Text>}
        style={styles.list}
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
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  answerButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedAnswerButton: {
    backgroundColor: '#cce5ff',
  },
  answerText: {
    fontSize: 16,
  },
  validateButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginTop: 20,
  },
  validateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
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
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  wordText: {
    fontSize: 16,
    marginLeft: 10,
  },
  definitionText: {
    fontSize: 14,
    color: 'gray',
  },
  signContainer: {
    marginLeft: 10,
  },
  signItem: {
    marginBottom: 5,
  },
  signText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeListQuizz;
