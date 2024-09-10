import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { lightTheme } from '@/constants/Colors';
import ResultModal from '@/components/Quizz/ResultModal';
import Pagination from '@/components/Quizz/Pagination';
import QuestionCard from '@/components/Quizz/QuestionCard';
import AnswerList from '@/components/Quizz/AnswerList';
import Footer from '@/components/Quizz/Footer';
import CustomModal from '@/components/Quizz/CustomModal';
import jardinData from '@/data/jardin';

const { width: windowWidth } = Dimensions.get('window');

// SVG icons for specific words
const icons = {
    'abeille.n.f.': `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"/></svg>`,
    'avoir.v.': `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"/></svg>`,
};

// Function to handle double quotes in the CSV data
const handleQuotes = (line) => {
    return line
        .replace(/""/g, '')
        .replace(/"([^"]*)"/g, (_, group) => group.replace(/,/g, '⨯')); // Replace commas inside quotes with a special character
};

// Function to restore commas that were replaced in the handleQuotes function
const restoreCommas = (value) => value.replace(/⨯/g, ',');

// Function to parse CSV data into an array of objects
const parseData = (data) => {
    const lines = data.trim().split('\n'); // Split data by line
    const headers = lines[0].split(',').map(header => header.trim()); // Get headers from the first line

    return lines.slice(1).map(line => {
        const cleanLine = handleQuotes(line); // Handle quotes in each line
        const values = cleanLine.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(value => restoreCommas(value.trim())); // Split by comma, except those inside quotes

        return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || ''; // Map headers to values
            return acc;
        }, {});
    });
};

const QuizScreen = () => {
    const [darkMode] = useDarkMode(); // Custom hook to check dark mode
    const [questions, setQuestions] = useState([]); // State to store generated questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track the current question index
    const [score, setScore] = useState(0); // State to track the score
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track the selected answer
    const [disabledAnswers, setDisabledAnswers] = useState([]); // State to track already disabled (incorrect) answers
    const [incorrectCount, setIncorrectCount] = useState(0); // State to count incorrect attempts
    const [hint, setHint] = useState(''); // State to store hint
    const [showModal, setShowModal] = useState(false); // State to control the result modal visibility

    const [showHintModal, setShowHintModal] = useState(false); // State to control the hint modal visibility
    const [hintModalTitle, setHintModalTitle] = useState(''); // State to set the hint modal title
    const [hintModalMessage, setHintModalMessage] = useState(''); // State to set the hint modal message

    const [videoUrls, setVideoUrls] = useState([]); // State to store video URLs related to the question

    const parsedData = parseData(jardinData); // Parse the data

    const usedWords = []; // Array to track already used words in questions
    const [correctFirstAttempt, setCorrectFirstAttempt] = useState(0);
    const [correctSecondAttempt, setCorrectSecondAttempt] = useState(0);
    const [correctMoreAttempt, setCorrectMoreAttempt] = useState(0);

    // Function to generate a new question
    const generateQuestion = () => {
        let randomWord = null;
        let sameCategoryWords = [];
        let attempts = 0;

        while (attempts < 30) {
            randomWord = parsedData[Math.floor(Math.random() * parsedData.length)]; // Select a random word from the parsed data

            if (!usedWords.includes(randomWord.mot) &&
                randomWord.url_video_definition !== 'Non spécifié' &&
                randomWord.url_video_mot !== 'Non spécifié') {

                sameCategoryWords = parsedData.filter(word =>
                    word.categorie_grammaticale === randomWord.categorie_grammaticale &&
                    word.mot !== randomWord.mot &&
                    (word.url_video_definition === 'Non spécifié' || word.url_video_mot === 'Non spécifié') &&
                    !usedWords.includes(word.mot) &&
                    !usedIncorrectWords.has(word.mot)
                );

                if (sameCategoryWords.length >= 3) {
                    usedWords.push(randomWord.mot); // Add the selected word to the used words list
                    break;
                }
            }
            attempts++;
        }

        if (!randomWord || sameCategoryWords.length < 3) {
            return null; // Return null if a suitable question can't be generated
        }

        const uniqueIncorrectAnswers = [...new Set(
            sameCategoryWords
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(word => word.mot)
        )];

        uniqueIncorrectAnswers.forEach(word => usedIncorrectWords.add(word)); // Add incorrect answers to the used list

        const answers = [
            ...uniqueIncorrectAnswers.map(answer => ({
                text: answer,
                correct: false
            })),
            { text: randomWord.mot, correct: true }
        ].sort(() => 0.5 - Math.random()); // Shuffle the answers

        const key = `${randomWord.mot}.${randomWord.categorie_grammaticale}`;
        const icon = icons[key] || null; // Get the icon for the question, if available

        setVideoUrls([randomWord.url_video_definition, randomWord.url_video_mot].filter(url => url !== 'Non spécifié')); // Set the video URLs for the question

        // Return the generated question object
        return icon
            ? {
                question: `Find the picture:`,
                answers,
                hint: randomWord.definition || '',
                secondHint: `${randomWord.url_video_definition || ''}\n ${randomWord.url_video_mot || ''}`,
                thirdHint: `${randomWord.url_video_definition || ''}\n ${randomWord.url_video_mot || ''}`,
                icon
            }
            : {
                question: `Description:\n${randomWord.definition}`,
                answers,
                hint: randomWord.url_video_definition || '',
                secondHint: `${randomWord.url_video_definition || ''}\n ${randomWord.url_video_mot || ''}`,
                thirdHint: `${randomWord.url_video_definition || ''}\n ${randomWord.url_video_mot || ''}`
            };
    };

    // useEffect hook to generate the initial set of questions when the component loads
    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            for (let i = 0; i < 4; i++) { // Generate 5 questions
                let question = generateQuestion();
                while (question === null) { // Ensure the question is valid
                    question = generateQuestion();
                }
                newQuestions.push(question); // Add the question to the list
            }
            setQuestions(newQuestions); // Set the generated questions in state
        };

        generateQuestions(); // Call the function to generate questions
    }, []);

    // Function to handle answer selection
    const handleAnswerSelection = (answer) => {
        if (!disabledAnswers.includes(answer.text)) { // Check if the answer is not disabled
            setSelectedAnswer(answer); // Set the selected answer
        }
    };

    // Function to validate the selected answer
    // Function to validate the selected answer
const validateAnswer = () => {
    if (selectedAnswer) {
        if (selectedAnswer.correct) { // Check if the selected answer is correct
            setScore((prevScore) => prevScore + 1); // Increment the score

            if (incorrectCount === 0) {
                setCorrectFirstAttempt((prev) => prev + 1); // Increment correct first attempt count
            } else if (incorrectCount === 1) {
                setCorrectSecondAttempt((prev) => prev + 1); // Increment correct second attempt count
            } else {
                setCorrectMoreAttempt((prev) => prev + 1); // Increment correct more attempt count if more than one incorrect attempt
            }

            moveToNextQuestion(); // Move to the next question
        } else {
            setDisabledAnswers((prev) => [...prev, selectedAnswer.text]); // Disable the incorrect answer
            setIncorrectCount(incorrectCount + 1); // Increment the incorrect count
            setSelectedAnswer(null);

            if (incorrectCount === 0) {
                handleHint('Hint', questions[currentQuestionIndex]?.hint || ''); // Show first hint
            } else if (incorrectCount === 1) {
                handleHint('Hint +', questions[currentQuestionIndex]?.secondHint || ''); // Show second hint
            } else if (incorrectCount === 2) {
                handleHint('Reminder', questions[currentQuestionIndex]?.thirdHint || ''); // Show third hint
            }
        }
    } else {
        Alert.alert('Warning', 'Please select an answer before validating.'); // Alert if no answer is selected
    }
};


    // Function to handle showing hint modal
    const handleHint = (title, message) => {
        setHintModalTitle(title);
        setHintModalMessage(message);
        setShowHintModal(true);
    };

    // Function to move to the next question
    const moveToNextQuestion = () => {
        setSelectedAnswer(null); // Reset the selected answer
        setDisabledAnswers([]); // Reset disabled answers
        setIncorrectCount(0); // Reset incorrect count
        setHint('');

        if (currentQuestionIndex + 1 < questions.length) { // Check if there are more questions
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
        } else {
            setShowModal(true); // Show the result modal
        }
    };

    const currentQuestion = questions[currentQuestionIndex] || {}; // Get the current question
    const { question, answers, icon } = currentQuestion;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.themeText}>Theme: Garden</Text>
                    <Text style={styles.questionText}>
                        Question {currentQuestionIndex + 1}/{questions.length}
                    </Text>
                    <Pagination
                        currentIndex={currentQuestionIndex}
                        totalQuestions={questions.length}
                    />
                </View>

                <QuestionCard
                    question={question}
                    icon={icon}
                    hint={hint}
                    incorrectCount={incorrectCount}
                />

                <AnswerList
                    answers={answers}
                    selectedAnswer={selectedAnswer}
                    disabledAnswers={disabledAnswers}
                    handleAnswerSelection={handleAnswerSelection}
                />

                <Footer
                    validateAnswer={validateAnswer}
                    darkMode={darkMode}
                />

                <ResultModal
                    visible={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setCorrectFirstAttempt(0);
                        setCorrectSecondAttempt(0);
                        setCorrectMoreAttempt(0);

                    }}
                    correctFirstAttempt={correctFirstAttempt}
                    correctSecondAttempt={correctSecondAttempt}
                    correctMoreAttempt={correctMoreAttempt}

                />

                <CustomModal
                    visible={showHintModal}
                    onClose={() => setShowHintModal(false)}
                    title={hintModalTitle}
                    message={hintModalMessage}
                    videoUrls={videoUrls}
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
});

export default QuizScreen;
