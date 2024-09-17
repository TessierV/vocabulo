import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import HeaderQuiz from '@/components/Quizz/HeaderQuiz';
import AnswerButton from '@/components/Quizz/AnswerButton';
import { color, lightTheme } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import { Paragraph, Subtitle } from '@/constants/StyledText';
import VideoModal from '@/components/Quizz/HintVideoModal';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { GradientBackgroundButton } from '@/components/Button';
import CongratsModal from '@/components/Ai/CongratsModal'; // Assuming CongratsModal is in the correct directory
import useDarkMode from '@/components/useDarkMode';


// Mock for CategoryWordSvg (replace with actual import)
const CategoryWordSvg = {
  word1: '<svg></svg>',
  word2: '<svg></svg>',
};

export default function IAQuizPage() {
  const [darkMode, toggleDarkMode] = useDarkMode();
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
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false); // Correct state for modal visibility
  const [definitionContent, setDefinitionContent] = useState(null);
  const [showDefinitionModal, setShowDefinitionModal] = useState(false);
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState([]);
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
      const response = await axios.get(`http://192.168.0.12:3000/api/mot/${mot_id}`);
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

      const questionText = (
        <View>
          <Paragraph style={{ fontSize: 15, color: lightTheme.light_darkShade }}>
            Quelle est la réponse à cette définition ?{'\n\n'}
          </Paragraph>
          <Subtitle style={{ color: lightTheme.dark_lightShade }}>
            {definitions[correctWord.mot_id]?.definition || 'No definition'}
          </Subtitle>
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
      if (attempts === 0) {
        setFirstAttemptCorrect((prev) => [...prev, currentQuestionIndex]);
      }
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswers([...correctAnswers, selectedAnswer.text]);
      setHighlightCorrect(true);
      setTimeout(() => {
        setHighlightCorrect(false);
        moveToNextQuestion();
      }, 2000);
    } else {
      if (attempts === 0) {
        setIncorrectAttempts((prev) => [...prev, currentQuestionIndex]);
      }
      setAttempts((prevAttempts) => prevAttempts + 1);
      setDisabledAnswers([...disabledAnswers, selectedAnswer]);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setAttempts(0);
      setDisabledAnswers([]);
    } else {
      setShowSummaryModal(true); // Display modal after last question
    }
  };

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

  const closeQuiz = () => {
    setShowSummaryModal(false); // Close modal when finished
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
          handleQuit={handleQuit}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          categoryName="AI Quizz"
          darkMode={false}
        />
      </View>
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', marginVertical: 20 }}>
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

      <View style={{ width: '90%', alignContent: 'center', marginTop: 10, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <GradientBackgroundButton
          text="Valider"
          textColor={'light'}
          onPress={validateAnswer}
        />
      </View>

      {/* Congrats Modal */}
      <CongratsModal
        visible={showSummaryModal}
        questions={questions}
        firstAttemptCorrect={firstAttemptCorrect}
        incorrectAttempts={incorrectAttempts}
        wordDefinitions={wordDefinitions}
        onClose={closeQuiz}
        darkMode={darkMode}
      />

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  videoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 10,
  },
  hintButton: {
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    maxWidth: '48%',
    minWidth: 150,
    gap: 10,
    minHeight: 40,
  },
});
