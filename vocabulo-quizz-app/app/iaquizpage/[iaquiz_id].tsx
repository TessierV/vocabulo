import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import HeaderQuiz from '@/components/Quizz/HeaderQuiz'; // Import the HeaderQuiz component
import AnswerButton from '@/components/Quizz/AnswerButton'; // Import the AnswerButton component
import { color, lightTheme } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg'; // Import SVG rendering library
import Feather from 'react-native-vector-icons/Feather'; // Import Feather icons
import { Paragraph, Subtitle } from '@/constants/StyledText';
import VideoModal from '@/components/Quizz/HintVideoModal'; // Import the VideoModal
import InterfaceSvg from '@/SVG/InterfaceSvg';

// Mock for CategoryWordSvg (you should replace this with actual import)
const CategoryWordSvg = {
  word1: '<svg></svg>', // Example SVG, replace with actual SVG strings
  word2: '<svg></svg>',
};

export default function IAQuizPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { iaquiz_id } = route.params;
  const [quizData, setQuizData] = useState(null);
  const [wordDefinitions, setWordDefinitions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [highlightCorrect, setHighlightCorrect] = useState(false);
  const [disabledAnswers, setDisabledAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]); // Track correct answers
  const [showSummaryModal, setShowSummaryModal] = useState(false); // Control summary modal
  const [definitionContent, setDefinitionContent] = useState(null); // Track definition content for modal
  const [showDefinitionModal, setShowDefinitionModal] = useState(false); // Show definition modal

  // State for managing video modal
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const storedQuiz = await AsyncStorage.getItem(`iaquiz_${iaquiz_id}`);
        const storedProgress = await AsyncStorage.getItem(`iaquiz_progress_${iaquiz_id}`);

        if (storedQuiz) {
          const parsedQuizData = JSON.parse(storedQuiz);
          setQuizData(parsedQuizData.questions);

          await fetchDefinitions(parsedQuizData.questions);

          if (storedProgress) {
            const { currentQuestionIndex, score } = JSON.parse(storedProgress);
            setCurrentQuestionIndex(currentQuestionIndex);
            setScore(score);
          }
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [iaquiz_id]);

  const fetchDefinitions = async (questions) => {
    try {
      const allDefinitions = {};
      for (const question of questions) {
        const correctMotId = question.correctWord.mot_id;
        const correctResponse = await fetchDefinition(correctMotId);
        allDefinitions[correctMotId] = correctResponse;

        for (const incorrectWord of question.incorrectWords) {
          const incorrectMotId = incorrectWord.mot_id;
          const incorrectResponse = await fetchDefinition(incorrectMotId);
          allDefinitions[incorrectMotId] = incorrectResponse;
        }
      }
      setWordDefinitions(allDefinitions);
      generateQuestions(questions, allDefinitions);
    } catch (error) {
      console.error('Error fetching word definitions:', error);
    }
  };

  const fetchDefinition = async (mot_id) => {
    try {
      const response = await axios.get(`http://192.168.1.15:3000/api/mot/${mot_id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching mot ${mot_id}:`, error);
      return { mot: 'Unknown', definition: 'No definition available' };
    }
  };

  const generateQuestions = (questionsData, definitions) => {
    const generatedQuestions = [];

    for (const questionData of questionsData) {
      const correctWord = questionData.correctWord;
      const incorrectWords = questionData.incorrectWords;

      const answers = [
        ...incorrectWords.map(word => ({
          text: word.mot,
          correct: false,
          definition: definitions[word.mot_id]?.definition || 'No definition',
        })),
        {
          text: correctWord.mot,
          correct: true,
          definition: definitions[correctWord.mot_id]?.definition || 'No definition',
        }
      ].sort(() => 0.5 - Math.random());

      const hasImage = CategoryWordSvg[correctWord.mot];
      const svgIconWord = hasImage ? (
        <TouchableOpacity onPress={() => {
          setDefinitionContent(correctWord.definitions);
          setShowDefinitionModal(true);
        }}>
          <View style={{ position: 'relative', width: '100%', alignSelf: 'center', alignItems: 'center', }}>
            <SvgXml xml={CategoryWordSvg[correctWord.mot]} width="110" height="110" />
            <Feather style={{ position: 'absolute', right: 0, top: 0, }} name="help-circle" size={18} color={lightTheme.light_darkShade} />
          </View>
        </TouchableOpacity>
      ) : null;

      const questionText = (
        <View>
          {svgIconWord ? (
            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Paragraph style={{ fontSize: 15, color: color.neutral }}>
                Quel mot cette image représente-t-elle ?
              </Paragraph>
            </View>
          ) : (
            <>
              <Paragraph style={{ fontSize: 15, color: lightTheme.light_darkShade }}>
                Quelle est la réponse à cette définition ?{'\n\n'}
              </Paragraph>
              <Subtitle style={{ color: lightTheme.dark_lightShade }}>
                {definitions[correctWord.mot_id]?.definition || 'No definition'}
              </Subtitle>
            </>
          )}
        </View>
      );

      generatedQuestions.push({
        questionText,
        answers,
        correctWord,
      });
    }

    setQuestions(generatedQuestions);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const validateAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert('Attention', 'Veuillez sélectionner une réponse avant de valider.');
      return;
    }

    if (selectedAnswer.correct) {
      setScore(prevScore => prevScore + 1);
      setCorrectAnswers([...correctAnswers, selectedAnswer.text]); // Track correct answers
      setHighlightCorrect(true);
      setTimeout(() => {
        setHighlightCorrect(false);
        moveToNextQuestion();
      }, 2000);
    } else {
      setAttempts(prevAttempts => prevAttempts + 1);
      setDisabledAnswers([...disabledAnswers, selectedAnswer]);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setAttempts(0);
      setDisabledAnswers([]);
    } else {
      setShowSummaryModal(true); // Show summary modal when the quiz ends
    }
  };

  // Function to save progress and quit
  const saveAndQuit = async () => {
    try {
      await AsyncStorage.setItem(
        `iaquiz_progress_${iaquiz_id}`,
        JSON.stringify({ currentQuestionIndex, score })
      );
      Alert.alert('Progress saved!', 'You can resume your quiz later.');
      navigation.goBack(); // Exit the quiz page
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Function to handle quit action
  const handleQuit = () => {
    Alert.alert(
      'Quit Quiz',
      'Are you sure you want to quit the quiz?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Quit', onPress: () => navigation.goBack() },
      ],
      { cancelable: false }
    );
  };

  // Function to close the summary modal and quit
  const closeQuiz = () => {
    setShowSummaryModal(false);
    navigation.goBack();
  };

  if (!questions.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement du quiz...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 10, width: '100%', backgroundColor: lightTheme.darkShade }}>
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'flex-start' }}>
        <HeaderQuiz
          handleQuit={saveAndQuit}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          categoryName="AI Quizz"
          darkMode={false}
        />
      </View>
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', marginVertical: 20, }}>
        {currentQuestion.questionText}
      </View>

      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center' }}>
        {currentQuestion.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            answer={answer}
            onPress={() => handleAnswerSelection(answer)}
            isSelected={selectedAnswer === answer}
            isDisabled={disabledAnswers.includes(answer)}
            isCorrect={answer.correct}
            index={index}
            highlightCorrect={highlightCorrect}
          />
        ))}
      </View>
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center' }}>

      <View style={styles.videoButtonsContainer}>

        <TouchableOpacity
          style={[styles.hintButton, { borderColor: color.neutralBlue }]}
          onPress={() => {
            setVideoUrl(currentQuestion.correctWord.url_def);
            setVideoModalVisible(true);
          }}
        >
          <InterfaceSvg iconName="url_def" fillColor={color.neutralBlue} width={18} height={18} />
          <Paragraph style={{ color: color.neutralBlue, fontSize: 12 }}>
            Définition LSF
          </Paragraph>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.hintButton, { borderColor: color.darkPlum }]}
          onPress={() => {
            setVideoUrl(currentQuestion.correctWord.url_sign);
            setVideoModalVisible(true);
          }}
        >
          <InterfaceSvg iconName="url_sign" fillColor={color.darkPlum} width={18} height={18} />
          <Paragraph style={{ color: color.darkPlum, fontSize: 12 }}>
            Sign
          </Paragraph>
        </TouchableOpacity>
      </View>
      </View>

      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.validateButton} onPress={validateAnswer}>
          <Text>Valider</Text>
        </TouchableOpacity>
      </View>

      {/* Summary modal */}
      <Modal visible={showSummaryModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Résumé du Quiz</Text>
            <Text style={styles.modalText}>Mots corrects :</Text>
            {correctAnswers.map((word, index) => (
              <Text key={index} style={styles.modalWord}>{word}</Text>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={closeQuiz}>
              <Text>Terminer le Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Definition modal */}
      <Modal visible={showDefinitionModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Définition</Text>
            <Text>{definitionContent}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowDefinitionModal(false)}>
              <Text>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Video modal for url_def and url_sign */}
      <VideoModal
        visible={videoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        videoUrl={videoUrl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.darkShade,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: lightTheme.lightShade,
  },
  validateButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#f39c12',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalWord: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  hintButton: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center',
    borderWidth: 1,
    maxWidth: 230,
    minHeight: 40,
  },
  videoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 10,
  },
  videoButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  videoButtonText: {
    color: '#fff',
  },
});
