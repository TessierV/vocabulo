import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { GradientBackgroundButton } from '@/components/Button';
import ResultModal from '@/components/Quizz/ResultModal';
import Pagination from '@/components/Quizz/Pagination';
import AnswerButton from '@/components/Quizz/AnswerButton';
import Hint from '@/components/Quizz/Hint';

const { width: windowWidth } = Dimensions.get('window');

const QuizScreen = () => {
    const [darkMode, toggleDarkMode] = useDarkMode();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [disabledAnswers, setDisabledAnswers] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [hint, setHint] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [correctFirstAttempt, setCorrectFirstAttempt] = useState(0);
    const [correctSecondAttempt, setCorrectSecondAttempt] = useState(0);

    const questions = [
        {
            question: 'What is the capital of France?',
            answers: [
                { text: 'Berlin', correct: false },
                { text: 'Madrid', correct: false },
                { text: 'Paris', correct: true },
                { text: 'Rome', correct: false },
            ],
            hint: 'It is known as the "City of Light."', // Hint for the question
            secondHint: 'It is famous for its Eiffel Tower.', // Second hint to be shown in a popup
        },
        {
            question: 'What is the largest planet in our solar system?',
            answers: [
                { text: 'Earth', correct: false },
                { text: 'Jupiter', correct: true },
                { text: 'Mars', correct: false },
                { text: 'Saturn', correct: false },
            ],
            hint: 'It has the most moons in our solar system.', // Hint for the question
            secondHint: 'It is a gas giant with a prominent red spot.', // Second hint to be shown in a popup
        },
        {
            question: 'What is the chemical symbol for gold?',
            answers: [
                { text: 'Au', correct: true },
                { text: 'Ag', correct: false },
                { text: 'Pb', correct: false },
                { text: 'Fe', correct: false },
            ],
            hint: 'Its symbol comes from the Latin word "aurum."', // Hint for the question
            secondHint: 'It is a precious yellow metal.', // Second hint to be shown in a popup
        },

        {
            question: 'Which planet is known as the Red Planet?',
            answers: [
                { text: 'Venus', correct: false },
                { text: 'Mars', correct: true },
                { text: 'Mercury', correct: false },
                { text: 'Jupiter', correct: false },
            ],
            hint: 'This planet is named after the Roman god of war.', // Hint for the question
            secondHint: 'It is the fourth planet from the Sun.', // Second hint to be shown in a popup
        },
        {
            question: 'Which planet is known as the Red Planet?',
            answers: [
                { text: 'Venus', correct: false },
                { text: 'Mars', correct: true },
                { text: 'Mercury', correct: false },
                { text: 'Jupiter', correct: false },
            ],
            hint: 'This planet is named after the Roman god of war.', // Hint for the question
            secondHint: 'It is the fourth planet from the Sun.', // Second hint to be shown in a popup
        },
    ];

    const handleAnswerSelection = (answer) => {
        if (!disabledAnswers.includes(answer.text)) {
            setSelectedAnswer(answer);
        }
    };

    const validateAnswer = () => {
        if (selectedAnswer) {
            if (selectedAnswer.correct) {
                setScore((prevScore) => prevScore + 1);
                if (incorrectCount === 0) {
                    setCorrectFirstAttempt((prev) => prev + 1);
                } else {
                    setCorrectSecondAttempt((prev) => prev + 1);
                }
                moveToNextQuestion();
            } else {
                setDisabledAnswers((prev) => [...prev, selectedAnswer.text]);
                setIncorrectCount(incorrectCount + 1);
                setSelectedAnswer(null);

                if (incorrectCount + 1 === 1) {
                    setHint(questions[currentQuestionIndex]?.hint || '');
                }

                if (incorrectCount + 1 === 2) {
                    Alert.alert('Second Hint', questions[currentQuestionIndex]?.secondHint || '');
                }
            }
        } else {
            Alert.alert('Warning', 'Please select an answer before validating.');
        }
    };

    const moveToNextQuestion = () => {
        setSelectedAnswer(null);
        setDisabledAnswers([]);
        setIncorrectCount(0);
        setHint('');

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowModal(true);
        }
    };

    const currentQuestion = questions[currentQuestionIndex] || {};
    const { question, answers } = currentQuestion;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.themeText}>Theme: General Knowledge</Text>
                    <Text style={styles.questionText}>
                        Question {currentQuestionIndex + 1}/{questions.length}
                    </Text>
                    <Pagination
                        currentIndex={currentQuestionIndex}
                        totalQuestions={questions.length}
                    />
                </View>

                <View>
                    <Text style={styles.question}>{question}</Text>
                    <Hint hint={hint} />
                </View>

                <View>
                    {answers?.map((answer, index) => (
                        <AnswerButton
                            key={index}
                            answer={{
                                text: answer.text,
                                label: String.fromCharCode(65 + index),
                            }}
                            onPress={() => handleAnswerSelection(answer)}
                            isSelected={selectedAnswer?.text === answer.text}
                            isDisabled={disabledAnswers.includes(answer.text)}
                        />
                    ))}

                    <View style={styles.validateButton}>
                        <GradientBackgroundButton
                            text="Validate Selection"
                            textColor={darkMode ? 'dark' : 'light'}
                            onPress={validateAnswer}
                        />
                    </View>
                </View>

                <ResultModal
                    visible={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setCorrectFirstAttempt(0);
                        setCorrectSecondAttempt(0);
                    }}
                    correctFirstAttempt={correctFirstAttempt}
                    correctSecondAttempt={correctSecondAttempt}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: lightTheme.darkShade,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    themeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: lightTheme.lightShade,
    },
    questionText: {
        fontSize: 18,
        color: lightTheme.dark_lightShade,
    },
    question: {
        fontSize: 24,
        marginBottom: 10,
        color: lightTheme.lightShade,
    },
    validateButton: {
        alignSelf: 'center',
        marginTop: 20,
    },
    validateButtonText: {
        color: darkTheme.light_darkShade,
        fontSize: 16,
    },
});

export default QuizScreen;
