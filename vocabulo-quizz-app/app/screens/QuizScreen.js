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

const icons = {
    'abeille.n.f.': `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"/></svg>`,
    'avoir.v.': `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"/></svg>`,
};

const handleQuotes = (line) => {
    return line
        .replace(/""/g, '')
        .replace(/"([^"]*)"/g, (_, group) => group.replace(/,/g, '⨯'));
};

const restoreCommas = (value) => value.replace(/⨯/g, ',');

const parseData = (data) => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map(line => {
        const cleanLine = handleQuotes(line);
        const values = cleanLine.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(value => restoreCommas(value.trim()));

        return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || '';
            return acc;
        }, {});
    });
};

const QuizScreen = () => {
    const [darkMode] = useDarkMode();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [disabledAnswers, setDisabledAnswers] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [hint, setHint] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [correctFirstAttempt, setCorrectFirstAttempt] = useState(0);
    const [correctSecondAttempt, setCorrectSecondAttempt] = useState(0);

    const [showHintModal, setShowHintModal] = useState(false);
    const [hintModalTitle, setHintModalTitle] = useState('');
    const [hintModalMessage, setHintModalMessage] = useState('');

    const [videoUrls, setVideoUrls] = useState([]);

    const parsedData = parseData(jardinData);

    const usedWords = [];
    const usedIncorrectWords = new Set();

    const generateQuestion = () => {
        let randomWord = null;
        let sameCategoryWords = [];
        let attempts = 0;

        while (attempts < 30) {
            randomWord = parsedData[Math.floor(Math.random() * parsedData.length)];

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
                    usedWords.push(randomWord.mot);
                    break;
                }
            }
            attempts++;
        }

        if (!randomWord || sameCategoryWords.length < 3) {
            return null;
        }

        const uniqueIncorrectAnswers = [...new Set(
            sameCategoryWords
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(word => word.mot)
        )];

        uniqueIncorrectAnswers.forEach(word => usedIncorrectWords.add(word));

        const answers = [
            ...uniqueIncorrectAnswers.map(answer => ({
                text: answer,
                correct: false
            })),
            { text: randomWord.mot, correct: true }
        ].sort(() => 0.5 - Math.random());

        const key = `${randomWord.mot}.${randomWord.categorie_grammaticale}`;
        const icon = icons[key] || null;

        // Met à jour les URLs des vidéos pour le modal
        setVideoUrls([randomWord.url_video_definition, randomWord.url_video_mot].filter(url => url !== 'Non spécifié'));

        return icon
            ? {
                question: `Trouve la photo:`,
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

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            for (let i = 0; i < 5; i++) {
                let question = generateQuestion();
                while (question === null) {
                    question = generateQuestion();
                }
                newQuestions.push(question);
            }
            setQuestions(newQuestions);
        };

        generateQuestions();
    }, []);

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

                if (incorrectCount === 0) {
                    handleHint('Aide', questions[currentQuestionIndex]?.hint || '');
                } else if (incorrectCount === 1) {
                    handleHint('Aide +', questions[currentQuestionIndex]?.secondHint || '');
                } else if (incorrectCount === 2) {
                    handleHint('Rappel', questions[currentQuestionIndex]?.thirdHint || '');
                }
            }
        } else {
            Alert.alert('Warning', 'Please select an answer before validating.');
        }
    };

    const handleHint = (title, message) => {
        setHintModalTitle(title);
        setHintModalMessage(message);
        setShowHintModal(true);
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
    const { question, answers, icon } = currentQuestion;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.themeText}>Theme: Jardin</Text>
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
                    }}
                    correctFirstAttempt={correctFirstAttempt}
                    correctSecondAttempt={correctSecondAttempt}
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
