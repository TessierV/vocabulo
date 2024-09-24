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
import config from '@/backend/config/config';

// Main component definition
const HomeListQuizz = () => {
    // Hook to access route parameters
    const route = useRoute();
    // Manage dark mode state
    const [darkMode] = useDarkMode();
    // Hook for navigation actions
    const navigation = useNavigation();
    // Extract category ID and filter type from route parameters
    const { categorie_id, filter } = route.params;

    // State variables
    const [words, setWords] = useState([]); // State to hold words data
    const [categoryName, setCategoryName] = useState(''); // State for category name
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [questions, setQuestions] = useState([]); // State for quiz questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Selected answer state
    const [score, setScore] = useState(0); // Score state
    const [attempts, setAttempts] = useState(0); // Number of attempts state
    const [showFirstHint, setShowFirstHint] = useState(false); // State for showing first hint
    const [showSecondHint, setShowSecondHint] = useState(false); // State for showing second hint
    const [showHintModal, setShowHintModal] = useState(false); // State for hint modal visibility
    const [hintContent, setHintContent] = useState(''); // Content for the hint modal
    const [disabledAnswers, setDisabledAnswers] = useState([]); // Disabled answers for validation
    const [showDefinitionModal, setShowDefinitionModal] = useState(false); // Definition modal visibility
    const [definitionContent, setDefinitionContent] = useState(''); // Content for definition modal
    const [showExitModal, setShowExitModal] = useState(false); // Exit confirmation modal visibility
    const [showCongratulationsModal, setShowCongratulationsModal] = useState(false); // Congratulations modal visibility
    const isFocused = useIsFocused(); // Hook to track if the component is focused

    // States for tracking correct answers and attempts
    const [correctWords, setCorrectWords] = useState(new Set()); // Set of correct words
    const [correctWordsDetails, setCorrectWordsDetails] = useState([]); // Details of correct words

    const [correctFirstAttempt, setCorrectFirstAttempt] = useState(0); // Count for first attempt correct answers
    const [correctSecondAttempt, setCorrectSecondAttempt] = useState(0); // Count for second attempt correct answers
    const [correctMoreAttempt, setCorrectMoreAttempt] = useState(0); // Count for correct answers after more attempts

    // Fetch words based on category and filter
    useEffect(() => {
        const fetchWords = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error state

            try {
                // Fetch words from the API
                const response = await fetch(`${config.BASE_URL}:3000/api/words/${categorie_id}`);
                const textResponse = await response.text(); // Convert response to text
                const data = JSON.parse(textResponse); // Parse the JSON data

                if (!data) {
                    throw new Error('Aucune donnée trouvée pour cette catégorie');
                }

                // Map to collect words with definitions and signs
                const wordMap = new Map();

                // Process category words
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

                // Process subcategory words
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

                // Convert the word map to an array
                const allWords = Array.from(wordMap.values()).map(word => ({
                    ...word,
                    definitions: Array.from(word.definitions).join(', ')
                }));

                // Filter words based on the selected filter criteria
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

                // Sort filtered words alphabetically
                filteredWords.sort((a, b) => a.mot.localeCompare(b.mot));

                // Set the state with filtered words and category name
                setWords(filteredWords);
                setCategoryName(data.categorie_name || 'Nom de catégorie non spécifié');
                generateQuestions(filteredWords); // Generate questions from filtered words
            } catch (err) {
                setError(err.message); // Set error message in state
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchWords(); // Invoke the fetch function
    }, [categorie_id, filter]); // Re-fetch words when category or filter changes

    // Generate questions for the quiz
    const generateQuestions = (words) => {
        const questions = []; // Array to hold generated questions
        const usedWords = new Set(); // Set to track used words

        const getRandomWord = () => {
            let randomWord;
            do {
                randomWord = words[Math.floor(Math.random() * words.length)]; // Get a random word
            } while (usedWords.has(randomWord)); // Ensure the word hasn't been used
            usedWords.add(randomWord); // Mark the word as used
            return randomWord; // Return the selected word
        };

        // Generate questions until we reach the desired count
        while (questions.length < 5) {
            if (words.length < 6) {
                Alert.alert('Erreur', 'Pas assez de mots pour générer des questions.'); // Alert if not enough words
                return;
            }

            const correctWord = getRandomWord(); // Get a random correct word
            const correctWordIndex = words.indexOf(correctWord); // Find the index of the correct word

            const incorrectWords = []; // Array to hold incorrect words
            while (incorrectWords.length < 3) { // Get three incorrect words
                const randomIndex = Math.floor(Math.random() * words.length);
                const word = words[randomIndex];
                if (randomIndex !== correctWordIndex && !incorrectWords.includes(word) && !usedWords.has(word)) {
                    incorrectWords.push(word); // Add the incorrect word if it's valid
                }
            }

            // Check if there's an SVG icon for the word
            const hasImage = CategoryWordSvg[correctWord.mot];
            const svgIconWord = hasImage ? (
                <TouchableOpacity onPress={() => {
                    setDefinitionContent(correctWord.definitions); // Set definition content
                    setShowDefinitionModal(true); // Show definition modal
                }}>
                    <View style={{ position: 'relative', width: '100%', alignSelf:'center', alignItems:'center' }}>
                        <SvgXml xml={CategoryWordSvg[correctWord.mot]} width="110" height="110" />
                        <Feather style={{ position: 'absolute', right: 0, top: 0 }} name="help-circle" size={18} color={lightTheme.light_darkShade} />
                    </View>
                </TouchableOpacity>
            ) : null;

            // Create question text based on whether there's an SVG icon
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
                        {correctWord.definitions}
                    </Subtitle>
                </>
            );

            // Create question object
            const question = {
                questionText,
                svgIconWord,
                answers: [
                    ...incorrectWords.map(word => ({
                        text: word.mot,
                        correct: false,
                        definition: word.definitions,
                        url_def: word.signes[0]?.url_def || 'Non spécifié', // URL for definition video
                        url_sign: word.signes[0]?.url_sign || 'Non spécifié', // URL for sign video
                    })),
                    {
                        text: correctWord.mot,
                        correct: true,
                        definition: correctWord.definitions,
                        url_def: correctWord.signes[0]?.url_def || 'Non spécifié',
                        url_sign: correctWord.signes[0]?.url_sign || 'Non spécifié',
                    }
                ].sort(() => 0.5 - Math.random()), // Shuffle answers
                hints: [] // Placeholder for hints
            };

            questions.push(question); // Add question to the array
        }

        setQuestions(questions); // Update state with generated questions
    };

    // Handle answer selection
    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer); // Set the selected answer
    };

    const [highlightCorrect, setHighlightCorrect] = useState(false); // State to highlight the correct answer

    // Validate the selected answer
    const validateAnswer = () => {
        if (selectedAnswer) {
            if (selectedAnswer.correct) { // Check if the selected answer is correct
                // Update score and attempt counters
                if (attempts === 0) {
                    setCorrectFirstAttempt(prev => prev + 1);
                } else if (attempts === 1) {
                    setCorrectSecondAttempt(prev => prev + 1);
                } else {
                    setCorrectMoreAttempt(prev => prev + 1);
                }

                // Add correct word details to the list
                setCorrectWordsDetails(prev => [
                    ...prev,
                    {
                        mot: selectedAnswer.text,
                        mot_id: selectedAnswer.mot_id, // Ensure mot_id is defined in selectedAnswer
                        categoryName: categoryName
                    }
                ]);

                setScore(prevScore => prevScore + 1); // Increase score

                // Highlight correct answer and move to the next question
                setHighlightCorrect(true);
                setTimeout(() => {
                    setHighlightCorrect(false);
                    moveToNextQuestion();
                }, 2000); // Highlight for 2 seconds
            } else {
                setAttempts(prevAttempts => prevAttempts + 1); // Increment attempts
                setDisabledAnswers(prev => [...prev, selectedAnswer]); // Disable selected incorrect answer

                // Show hints based on number of attempts
                if (attempts === 0) {
                    setShowFirstHint(true);
                } else if (attempts === 1) {
                    setShowSecondHint(true);
                }
            }
        } else {
            Alert.alert('Attention', 'Veuillez sélectionner une réponse avant de valider.'); // Alert if no answer selected
        }
    };

    // Move to the next question or show congratulations modal
    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to next question
            setSelectedAnswer(null); // Reset selected answer
            setAttempts(0); // Reset attempts
            setShowFirstHint(false); // Hide hints
            setShowSecondHint(false);
            setDisabledAnswers([]); // Reset disabled answers
        } else {
            setShowCongratulationsModal(true); // Show congratulations modal if quiz is finished
        }
    };

    // Open the hint modal
    const openHintModal = (content) => {
        setHintContent(content);
        setShowHintModal(true); // Show hint modal
    };

    // Handle quitting the quiz
    const handleQuit = () => {
        setShowExitModal(true); // Show exit confirmation modal
    };

    // Confirm exit from the quiz
    const confirmExit = () => {
        setShowExitModal(false); // Close exit modal
        navigation.goBack(); // Navigate back
    };

    // Cancel exit action
    const cancelExit = () => {
        setShowExitModal(false); // Close exit modal
    };

    // Close the exit modal when not focused
    useEffect(() => {
        if (!isFocused) {
            setShowExitModal(false);
        }
    }, [isFocused]);

    // Loading state
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={color.neutralBlue} />
            </View>
        );
    }

    // Error state
    if (error) {
        return <Paragraph style={{ color: color.neutralCoral, textAlign: 'center', marginVertical: 20 }}>Erreur: {error}</Paragraph>;
    }

    // Get current question and answers
    const currentQuestion = questions[currentQuestionIndex] || {};
    const { answers = [], hints = [] } = currentQuestion; // Fallback to empty arrays if undefined
    const correctAnswer = answers.find(answer => answer.correct) || {}; // Find the correct answer
    const url_def = correctAnswer.url_def || 'Non spécifié'; // URL for definition video
    const url_sign = correctAnswer.url_sign || 'Non spécifié'; // URL for sign video

    return (
        <View style={{ flex: 1, justifyContent: 'center', gap: 10, width: '100%', backgroundColor: lightTheme.darkShade }}>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'flex-start' }}>
                <HeaderQuiz
                    handleQuit={handleQuit} // Function to handle quitting the quiz
                    currentQuestionIndex={currentQuestionIndex} // Current question index
                    totalQuestions={questions.length} // Total number of questions
                    categoryName={categoryName} // Current category name
                    darkMode={darkMode} // Dark mode state
                />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Paragraph style={{ fontSize: 20, marginBottom: 20 }}>{currentQuestion.questionText}</Paragraph>
                <View style={{ marginVertical: 10, width: '100%' }}>
                    {currentQuestion.svgIconWord}
                </View>
            </View>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center' }}>
                {answers.map((answer, index) => (
                    <AnswerButton
                        key={index}
                        answer={answer}
                        onPress={() => handleAnswerSelection(answer)} // Handle answer selection
                        isSelected={selectedAnswer === answer} // Check if answer is selected
                        isDisabled={disabledAnswers.includes(answer)} // Check if answer is disabled
                        isCorrect={answer.correct} // Check if answer is correct
                        index={index} // Answer index
                        highlightCorrect={highlightCorrect} // Highlight correct answer if applicable
                    />
                ))}
            </View>
            <View style={{ width: '90%', alignItems: 'center', marginTop: 10, alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <GradientBackgroundButton
                    text="Valider" // Button text for validation
                    textColor={'light'}
                    onPress={validateAnswer} // Function to validate answer
                />
            </View>
            <View style={{ width: '90%', alignItems: 'center', marginTop: 10, alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <HintComponent
                    showFirstHint={showFirstHint} // State to show first hint
                    showSecondHint={showSecondHint} // State to show second hint
                    url_def={url_def} // URL for definition video
                    url_sign={url_sign} // URL for sign video
                    openHintModal={openHintModal} // Function to open hint modal
                />
            </View>

            {/* Modals for various functionalities */}
            <CancelModal
                visible={showExitModal} // Exit modal visibility
                onConfirm={confirmExit} // Confirm exit function
                onCancel={cancelExit} // Cancel exit function
            />

            <VideoModal
                visible={showHintModal} // Video modal visibility
                onClose={() => setShowHintModal(false)} // Close function for video modal
                videoUrl={hintContent} // Content for the video modal
            />
            <CustomModal
                visible={showDefinitionModal} // Definition modal visibility
                title="Définition" // Title for the definition modal
                content={definitionContent} // Content for the definition
                buttonText="Fermer" // Button text to close
                onPress={() => setShowDefinitionModal(false)} // Close function for definition modal
            />
            <CongratulationsModal
                visible={showCongratulationsModal} // Congratulations modal visibility
                score={score} // Current score
                totalQuestions={questions.length} // Total number of questions
                correctFirstAttempt={correctFirstAttempt} // Count of correct answers on the first attempt
                correctSecondAttempt={correctSecondAttempt} // Count of correct answers on the second attempt
                correctMoreAttempt={correctMoreAttempt} // Count of correct answers after multiple attempts
                categoryName={categoryName} // Current category name
                correctWords={correctWordsDetails} // Details of correct words
                onClose={() => setShowCongratulationsModal(false)} // Close function for the congratulations modal
            />
        </View>
    );
};

// Styles for the component
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
