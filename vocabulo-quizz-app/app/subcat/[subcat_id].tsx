import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Modal } from 'react-native';
import { useRoute, useNavigation, useIsFocused, RouteProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import useDarkMode from '@/components/useDarkMode';
import { lightTheme, color } from '@/constants/Colors';
import HeaderQuiz from '@/components/Quizz/HeaderQuiz';
import AnswerButton from '@/components/Quizz/AnswerButton';
import { Paragraph, Subtitle } from '@/constants/StyledText';
import CategoryWordSvg from '@/SVG/CategoryWordSvg';
import { GradientBackgroundButton } from '@/components/Button';
import HintComponent from '@/components/Quizz/HintComponent';
import VideoModal from '@/components/Quizz/HintVideoModal';
import CustomModal from '@/components/General/CustomModal';
import CongratulationsModal from '@/components/Quizz/CongratulationsModal';
import config from '@/backend/config/config';

import CancelModal from '@/components/Quizz/CancelModal';


type RootStackParamList = {
  'subcat/[subcat_id]': {
    subcat_id: string;
    subcat_name: string;
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

type NewPageRouteProp = RouteProp<RootStackParamList, 'subcat/[subcat_id]'>;

const NewPage = () => {
  const [darkMode] = useDarkMode();

  const route = useRoute<NewPageRouteProp>();
  const { subcat_id, difficulty, words } = route.params || {};
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [subcategoryData, setSubcategoryData] = useState<{ words: any[] } | null>(null);
  const [categoryName, setCategoryName] = useState('');

  const [loading, setLoading] = useState(!words);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFirstHint, setShowFirstHint] = useState(false);
  const [showSecondHint, setShowSecondHint] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintContent, setHintContent] = useState('');
  const [disabledAnswers, setDisabledAnswers] = useState<any[]>([]);
  const [showDefinitionModal, setShowDefinitionModal] = useState(false);
  const [definitionContent, setDefinitionContent] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<any[]>([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const [correctWords, setCorrectWords] = useState(new Set());

  const [correctFirstAttempt, setCorrectFirstAttempt] = useState(0);
  const [correctSecondAttempt, setCorrectSecondAttempt] = useState(0);
  const [correctMoreAttempt, setCorrectMoreAttempt] = useState(0);

  const [correctWordsDetails, setCorrectWordsDetails] = useState<
  { mot: string; mot_id: any; categoryName: string }[]
>([]);


  useEffect(() => {
    const fetchSubcategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${config.BASE_URL}:3000/api/subcategories/${subcat_id}`);
        const data = await response.json();

        if (!data || !data.words) {
          throw new Error('Subcategory not found or missing words');
        }

        const filteredWords = filterWordsByDifficulty(data.words, difficulty);
        setSubcategoryData({ words: filteredWords });
        generateQuestions(filteredWords);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (words) {
      setSubcategoryData({ words });
      generateQuestions(words);
    } else {
      fetchSubcategoryData();
    }
  }, [subcat_id, difficulty, words]);

  const filterWordsByDifficulty = (words: any[], filter: string) => {
    switch (filter) {
      case 'easy':
        return words.filter(word => word.signs.some(s => s.urlSign && s.urlDef));
      case 'medium':
        return words.filter(word => (word.signs.some(s => s.urlSign) || word.signs.some(s => s.urlDef)) && !(word.signs.some(s => s.urlSign) && word.signs.some(s => s.urlDef)));
      case 'hard':
        return words.filter(word => !word.signs.some(s => s.urlSign) && !word.signs.some(s => s.urlDef));
      case 'all':
      default:
        return words;
    }
  };

  const generateQuestions = (words) => {
    const wordCount = words.length;
    let numberOfQuestions;

    if (wordCount > 7) {
      numberOfQuestions = 5;
    } else if (wordCount >= 5 && wordCount <= 7) {
      numberOfQuestions = 3;
    } else {
      Alert.alert('Erreur', 'Pas assez de mots pour générer des questions.');
      return;
    }

    const questions = [];
    const usedWords = new Set();

    const getRandomWord = () => {
      let randomWord;
      do {
        randomWord = words[Math.floor(Math.random() * words.length)];
      } while (usedWords.has(randomWord));
      usedWords.add(randomWord);
      return randomWord;
    };

    while (questions.length < numberOfQuestions) {
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
      const hasImage = CategoryWordSvg[correctWord.mot];
      const svgIconWord = hasImage ? (
        <TouchableOpacity onPress={() => {
          setDefinitionContent(correctWord.definitions);
          setShowDefinitionModal(true);
        }}>
          <View style={{ position: 'relative', width: '100%', alignSelf: 'center', alignItems: 'center', }}>
            <SvgXml xml={CategoryWordSvg[correctWord.mot]} width="110" height="110" />
            <Feather style={{ position: 'absolute', right: 0, top: 0 }} name="help-circle" size={18} color={lightTheme.light_darkShade} />
          </View>
        </TouchableOpacity>
      ) : null;

      const questionText = svgIconWord ? (
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
            {correctWord.definition}
          </Subtitle>
        </>
      );

      const question = {
        questionText,
        svgIconWord,
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
        hints: []
      };

      questions.push(question);
    }

    setQuestions(questions);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const [highlightCorrect, setHighlightCorrect] = useState(false);


  const validateAnswer = () => {
    if (selectedAnswer) {
      if (selectedAnswer.correct) {
        if (attempts === 0) {
          setCorrectFirstAttempt(prev => prev + 1);
        } else if (attempts === 1) {
          setCorrectSecondAttempt(prev => prev + 1);
        } else {
          setCorrectMoreAttempt(prev => prev + 1);
        }

        setCorrectWordsDetails(prev => [
          ...prev,
          {
            mot: selectedAnswer.text,
            mot_id: selectedAnswer.mot_id,
            categoryName: categoryName
          }
        ]);

        // Update the score
        setScore(prevScore => prevScore + 1);

        // Set highlight for correct answer after validation
        setHighlightCorrect(true);
        setTimeout(() => {
          setHighlightCorrect(false);
          moveToNextQuestion(); // Move to the next question after the highlight effect
        }, 2000); // Highlight for 2 seconds
      } else {
        // Update attempts and show hints
        setAttempts(prevAttempts => prevAttempts + 1);
        setDisabledAnswers(prev => [...prev, selectedAnswer]);

        if (attempts === 0) {
          setShowFirstHint(true);
        } else if (attempts === 1) {
          setShowSecondHint(true);
        }
      }
    } else {
      Alert.alert('Attention', 'Veuillez sélectionner une réponse avant de valider.');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAttempts(0);
    setCorrectWords(new Set());
    setCorrectWordsDetails([]);
    setCorrectFirstAttempt(0);
    setCorrectSecondAttempt(0);
    setCorrectMoreAttempt(0);
    setQuestions([]);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setAttempts(0);
      setShowFirstHint(false);
      setShowSecondHint(false);
      setDisabledAnswers([]);
    } else {
      setShowCongratulationsModal(true);
    }
  };

  const openHintModal = (content) => {
    setHintContent(content);
    setShowHintModal(true);
  };

  const handleQuit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigation.goBack();
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  useEffect(() => {
    if (!isFocused) {
      setShowExitModal(false);
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={color.neutralBlue} />
      </View>
    );
  }


  if (error) {
    return <Paragraph style={{ color: color.neutralCoral, textAlign: 'center', marginVertical: 20 }}>Erreur: {error}</Paragraph>;
  }

  const currentQuestion = questions[currentQuestionIndex] || {};
  const { answers = [], hints = [] } = currentQuestion;
  const correctAnswer = answers.find(answer => answer.correct) || {};
  const url_def = correctAnswer.url_def || 'Non spécifié';
  const url_sign = correctAnswer.url_sign || 'Non spécifié';

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 10, width: '100%', backgroundColor: lightTheme.darkShade }}>
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'flex-start' }}>
        <HeaderQuiz
          handleQuit={handleQuit}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          categoryName={route.params?.subcat_name || ""}
          darkMode={false}
        />
      </View>
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Paragraph style={{ fontSize: 20, marginBottom: 20 }}>{currentQuestion.questionText}</Paragraph>
        <View style={{width: '100%', marginVertical: 10 }}>
          {currentQuestion.svgIconWord}
        </View>
      </View>
      <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center' }}>
        {answers.map((answer, index) => (
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
      <View style={{ width: '90%', alignItems: 'center', marginTop: 10, alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <GradientBackgroundButton
          text="Valider"
          textColor={'light'}
          onPress={validateAnswer}
        />
      </View>
      <View style={{ width: '90%', alignItems: 'center', marginTop: 10, alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <HintComponent
          showFirstHint={showFirstHint}
          showSecondHint={showSecondHint}
          url_def={url_def}
          url_sign={url_sign}
          openHintModal={openHintModal}
        />
      </View>

      <CancelModal
        visible={showExitModal}
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />
      <VideoModal
        visible={showHintModal}
        onClose={() => setShowHintModal(false)}
        videoUrl={hintContent}
        hintText={hintContent}
        svgXml={null}
      />

      <CustomModal
        visible={showDefinitionModal}
        title="Définition"
        content={definitionContent}
        buttonText="Fermer"
        onPress={() => setShowDefinitionModal(false)}
      />
      <CongratulationsModal
        visible={showCongratulationsModal}
        score={score}
        totalQuestions={questions.length}
        correctFirstAttempt={correctFirstAttempt}
        correctSecondAttempt={correctSecondAttempt}
        correctMoreAttempt={correctMoreAttempt}
        categoryName={categoryName}
        correctWords={correctWordsDetails}
        onClose={() => {
          setShowCongratulationsModal(false);
          resetQuiz();
        }}
        onRestart={resetQuiz}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  quizContent: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginVertical: 10,
  },
  definitionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  validateButton: {
    padding: 15,
    backgroundColor: '#007bff',
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  hint: {
    fontSize: 16,
    color: '#ff9900',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NewPage;
