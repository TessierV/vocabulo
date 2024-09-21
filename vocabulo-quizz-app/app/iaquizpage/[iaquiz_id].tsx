import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import HeaderQuiz from '@/components/Quizz/HeaderQuiz';
import AnswerButton from '@/components/Quizz/AnswerButton';
import { color, lightTheme } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { Paragraph, Subtitle } from '@/constants/StyledText';
import VideoModal from '@/components/Quizz/HintVideoModal';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { GradientBackgroundButton } from '@/components/Button';
import CongratsModal from '@/components/Ai/CongratsModal';
import useDarkMode from '@/components/useDarkMode';
import config from '@/backend/config/config';
import CategoryWordSvg from '@/SVG/CategoryWordSvg';

// Define interfaces for better type checking
interface Word {
  mot: string;
  mot_id: number;
  definition: string;
  url_def?: string;
  url_sign?: string;
}

interface Question {
  correctWord: Word;
  incorrectWords: Word[];
}

interface Answer {
  text: string;
  correct: boolean;
  definition: string;
}

interface GeneratedQuestion {
  questionText: JSX.Element;
  svgIconWord: JSX.Element | null;
  answers: Answer[];
  correctWord: Word;
}

interface WordDefinitions {
  [key: number]: Word;
}

export default function IAQuizPage() {
  // State variables
  const [darkMode] = useDarkMode();
  const route = useRoute();
  const navigation = useNavigation();
  const { iaquiz_id } = route.params as { iaquiz_id: string };
  const [quizData, setQuizData] = useState<Question[] | null>(null);
  const [wordDefinitions, setWordDefinitions] = useState<WordDefinitions>({});
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [highlightCorrect, setHighlightCorrect] = useState(false);
  const [disabledAnswers, setDisabledAnswers] = useState<Answer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [definitionContent, setDefinitionContent] = useState<string | null>(null);
  const [showDefinitionModal, setShowDefinitionModal] = useState(false);
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState<number[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState<number[]>([]);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Fetch quiz data on component mount
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

  // Fetch definitions for all words in the quiz
  const fetchDefinitions = async (questions: Question[]) => {
    try {
      const allDefinitions: WordDefinitions = {};
      for (const question of questions) {
        const correctMotId = question.correctWord.mot_id;
        const correctResponse = await fetchDefinition(correctMotId);
        if (correctResponse) {
          allDefinitions[correctMotId] = correctResponse;
        }
        for (const incorrectWord of question.incorrectWords) {
          const incorrectMotId = incorrectWord.mot_id;
          const incorrectResponse = await fetchDefinition(incorrectMotId);
          if (incorrectResponse) {
            allDefinitions[incorrectMotId] = incorrectResponse;
          }
        }
      }
      setWordDefinitions(allDefinitions);
      generateQuestions(questions, allDefinitions);
    } catch (error) {
      console.error('Error fetching word definitions:', error);
    }
  };

  // Fetch definition for a single word
  const fetchDefinition = async (mot_id: number): Promise<Word | null> => {
    try {
      const response = await axios.get(`${config.BASE_URL}:3000/api/mot/${mot_id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching mot ${mot_id}:`, error);
      return null;
    }
  };

  // Generate questions from fetched data
  const generateQuestions = (questionsData: Question[], definitions: WordDefinitions) => {
    const generatedQuestions: GeneratedQuestion[] = [];
    for (const questionData of questionsData) {
      const correctWord = questionData.correctWord;
      const incorrectWords = questionData.incorrectWords;

      // Check if there's an SVG icon for the word
      const hasImage = CategoryWordSvg.hasOwnProperty(correctWord.mot);
      const svgIconWord = hasImage ? (
        <TouchableOpacity onPress={() => {
          setDefinitionContent(definitions[correctWord.mot_id]?.definition || 'No definition');
          setShowDefinitionModal(true);
        }}>
          <View style={{ position: 'relative', width: '100%', alignSelf: 'center', alignItems: 'center' }}>
            <SvgXml xml={CategoryWordSvg[correctWord.mot]} width="110" height="110" />
            <Feather style={{ position: 'absolute', right: 0, top: 0 }} name="help-circle" size={18} color={lightTheme.light_darkShade} />
          </View>
        </TouchableOpacity>
      ) : null;

      // Create question text based on whether there's an SVG icon
      const questionText = svgIconWord ? (
        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Paragraph style={{ fontSize: 15, color: color.neutral }}>
            What word does this image represent?{'\n\n'}
          </Paragraph>
        </View>
      ) : (
        <View>
          <Paragraph style={{ fontSize: 15, color: lightTheme.light_darkShade }}>
            What is the answer to this definition?{'\n\n'}
          </Paragraph>
          <Subtitle style={{ color: lightTheme.dark_lightShade }}>
            {definitions[correctWord.mot_id]?.definition || 'No definition'}
          </Subtitle>
        </View>
      );

      // Generate answers
      const answers: Answer[] = [
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

      generatedQuestions.push({
        questionText,
        svgIconWord,
        answers,
        correctWord,
      });
    }
    setQuestions(generatedQuestions);
  };

  // Handle answer selection
  const handleAnswerSelection = (answer: Answer) => {
    setSelectedAnswer(answer);
  };

  // Validate the selected answer
  const validateAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert('Attention', 'Please select an answer before validating.');
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

  // Move to the next question or show summary
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setAttempts(0);
      setDisabledAnswers([]);
    } else {
      setShowSummaryModal(true);
    }
  };

  // Handle quitting the quiz
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

  // Close the quiz and navigate back
  const closeQuiz = () => {
    setShowSummaryModal(false);
    navigation.goBack();
  };

  // Show loading screen if questions are not loaded yet
  if (!questions.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 10, width: '100%', backgroundColor: lightTheme.darkShade }}>
      {/* Quiz header */}
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'flex-start' }}>
        <HeaderQuiz
          handleQuit={handleQuit}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          categoryName="AI Quizz"
          darkMode={false}
        />
      </View>

      {/* Question display */}
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', marginVertical: 20 }}>
        {currentQuestion.questionText}
        {currentQuestion.svgIconWord}
      </View>

      {/* Answer buttons */}
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

      {/* Video hint buttons */}
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center' }}>
        <View style={styles.videoButtonsContainer}>
          <TouchableOpacity
            style={[styles.hintButton, { borderColor: color.neutralBlue }]}
            onPress={() => {
              setVideoUrl(currentQuestion.correctWord.url_def || '');
              setVideoModalVisible(true);
            }}
          >
            <InterfaceSvg iconName="url_def" fillColor={color.neutralBlue} width={18} height={18} />
            <Paragraph style={{ color: color.neutralBlue, fontSize: 12 }}>
              LSF Definition
            </Paragraph>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.hintButton, { borderColor: color.darkPlum }]}
            onPress={() => {
              setVideoUrl(currentQuestion.correctWord.url_sign || '');
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

      {/* Validate button */}
      <View style={{ width: '90%', alignContent: 'center', marginTop: 10, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <GradientBackgroundButton
          text="Validate"
          textColor={'light'}
          onPress={validateAnswer}
        />
      </View>

      {/* Congratulations modal */}
      <CongratsModal
        visible={showSummaryModal}
        questions={questions}
        firstAttemptCorrect={firstAttemptCorrect}
        incorrectAttempts={incorrectAttempts}
        wordDefinitions={wordDefinitions}
        onClose={closeQuiz}
        darkMode={darkMode}
      />

      {/* Video modal */}
      <VideoModal
        visible={videoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        videoUrl={videoUrl}
      />

      {/* Definition modal */}
      <Modal
        visible={showDefinitionModal}
        transparent={true}
        onRequestClose={() => setShowDefinitionModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Definition</Text>
            <Text style={styles.modalText}>{definitionContent}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowDefinitionModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: color.neutralBlue,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
