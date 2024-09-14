import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { lightTheme, color } from '@/constants/Colors';
import CategoryWordSvg from '@/SVG/CategoryWordSvg';
import AnswerButton from '@/components/Quizz/AnswerButton';
import Pagination from '@/components/Quizz/Pagination';
import { AnnonceTitle, Paragraph, Subtitle } from '@/constants/StyledText';
import { GradientBackgroundButton } from '@/components/Button';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import HeaderQuiz from '@/components/Quizz/HeaderQuiz';
import HintComponent from '@/components/Quizz/HintComponent';
import VideoModal from '@/components/Quizz/HintVideoModal';
import CustomModal from '@/components/General/CustomModal';
import useDarkMode from '@/components/useDarkMode';
import CancelModal from '@/components/Quizz/CancelModal';
import CongratulationsModal from '@/components/Quizz/CongratulationsModal';

const HomeListQuizz = () => {
    const route = useRoute();
    const [darkMode] = useDarkMode();
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
    const [attempts, setAttempts] = useState(0);
    const [showFirstHint, setShowFirstHint] = useState(false);
    const [showSecondHint, setShowSecondHint] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false);
    const [hintContent, setHintContent] = useState('');
    const [disabledAnswers, setDisabledAnswers] = useState([]);
    const [showDefinitionModal, setShowDefinitionModal] = useState(false);
    const [definitionContent, setDefinitionContent] = useState('');
    const [showExitModal, setShowExitModal] = useState(false);
    const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
    const isFocused = useIsFocused();

    const [correctWords, setCorrectWords] = useState(new Set());
    const [correctWordsDetails, setCorrectWordsDetails] = useState([]);

    const [correctFirstAttempt, setCorrectFirstAttempt] = useState(0);
    const [correctSecondAttempt, setCorrectSecondAttempt] = useState(0);
    const [correctMoreAttempt, setCorrectMoreAttempt] = useState(0);

    useEffect(() => {
        const fetchWords = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://192.168.1.15:3000/api/words/${categorie_id}`);
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
        const usedWords = new Set();

        const getRandomWord = () => {
            let randomWord;
            do {
                randomWord = words[Math.floor(Math.random() * words.length)];
            } while (usedWords.has(randomWord));
            usedWords.add(randomWord);
            return randomWord;
        };

        while (questions.length < 5) {
            if (words.length < 6) {
                Alert.alert('Erreur', 'Pas assez de mots pour générer des questions.');
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

            const hasImage = CategoryWordSvg[correctWord.mot];
            const svgIconWord = hasImage ? (
                <TouchableOpacity onPress={() => {
                    setDefinitionContent(correctWord.definitions);
                    setShowDefinitionModal(true);
                }}>
                    <View style={{ position: 'relative', width: '100%', alignSelf:'center', alignItems:'center', }}>
                        <SvgXml xml={CategoryWordSvg[correctWord.mot]} width="110" height="110" />
                        <Feather style={{ position: 'absolute', right: 0, top: 0 }} name="help-circle" size={18} color={lightTheme.light_darkShade} />
                    </View>
                </TouchableOpacity>
            ) : null;

            const questionText = svgIconWord ? (
                <View style={{ width: '100%',  justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Paragraph style={{ fontSize: 15, color: color.neutral }}>
                        Quel mot cette image représente-t-elle ?
                    </Paragraph>
                </View>
            ) : (
                <>
                    <Paragraph style={{ fontSize: 15, color: lightTheme.light_darkShade }}>
                        Quelle est la réponse à cette définition ?{'\n\n'}
                    </Paragraph>
                    <Subtitle style={{  color: lightTheme.dark_lightShade }}>
                        {correctWord.definitions}
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
                // Mise à jour du score en fonction du nombre de tentatives
                if (attempts === 0) {
                    setCorrectFirstAttempt(prev => prev + 1);
                } else if (attempts === 1) {
                    setCorrectSecondAttempt(prev => prev + 1);
                } else {
                    setCorrectMoreAttempt(prev => prev + 1);
                }

                // Mise à jour des bons mots avec leurs détails
                setCorrectWordsDetails(prev => [
                    ...prev,
                    {
                        mot: selectedAnswer.text,
                        mot_id: selectedAnswer.mot_id, // Assurez-vous que mot_id est bien défini dans selectedAnswer
                        categoryName: categoryName
                    }
                ]);

                // Mise à jour du score
                setScore(prevScore => prevScore + 1);


                // Passage à la prochaine question
                setHighlightCorrect(true);
                setTimeout(() => {
                  setHighlightCorrect(false);
                  moveToNextQuestion(); // Move to the next question after the highlight effect
                }, 2000); // Highlight for 2 seconds
            } else {
                // Mise à jour des tentatives et affichage des indices en fonction du nombre de tentatives
                setAttempts(prevAttempts => prevAttempts + 1);
                setDisabledAnswers(prev => [...prev, selectedAnswer]);

                if (attempts === 0) {
                    setShowFirstHint(true); // Affiche le premier indice
                } else if (attempts === 1) {
                    setShowSecondHint(true); // Affiche le deuxième indice
                }
            }
        } else {
            Alert.alert('Attention', 'Veuillez sélectionner une réponse avant de valider.');
        }
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
                    categoryName={categoryName}
                    darkMode={darkMode}
                />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Paragraph style={{ fontSize: 20, marginBottom: 20 }}>{currentQuestion.questionText}</Paragraph>
                <View style={{ marginVertical: 10, width: '100%' }} >
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
          highlightCorrect={highlightCorrect} // Pass the highlight prop
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

            {/* Modals */}
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
                onClose={() => setShowCongratulationsModal(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderColor: lightTheme.light_darkShade,
        maxWidth: 230,
        minHeight: 40,
    },
});

export default HomeListQuizz;
