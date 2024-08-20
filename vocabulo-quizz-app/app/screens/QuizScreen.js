import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { GradientBackgroundButton } from '@/components/Button';
import ResultModal from '@/components/Quizz/ResultModal';
import Pagination from '@/components/Quizz/Pagination';
import AnswerButton from '@/components/Quizz/AnswerButton';
import Hint from '@/components/Quizz/Hint';
import jardinData from '@/data/jardin';
import { SvgXml } from 'react-native-svg';

const { width: windowWidth } = Dimensions.get('window');

// Définition des icônes par mots spécifiques et leurs catégories grammaticales
const icons = {
    'abeille.n.f.': `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"/></svg>`,
    'avoir.v.': `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"/></svg>`,
    // Ajoute d'autres icônes pour d'autres mots spécifiques si nécessaire
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

    // Parse the jardinData
    const parsedData = parseData(jardinData);

    // Function to generate a valid question with correct and incorrect answers
    const generateQuestion = () => {
        let randomWord = null;
        let sameCategoryWords = [];

        // Essayer jusqu'à 30 fois de trouver un mot valide avec suffisamment de réponses incorrectes uniques
        for (let attempt = 0; attempt < 30; attempt++) {
            // Sélectionner un mot aléatoire
            randomWord = parsedData[Math.floor(Math.random() * parsedData.length)];

            // Vérifier si le mot a des URL valides
            if (randomWord.url_video_definition !== 'Non spécifié' && randomWord.url_video_mot !== 'Non spécifié') {
                // Obtenir d'autres mots dans la même catégorie, en excluant le mot sélectionné
                sameCategoryWords = parsedData.filter(word =>
                    word.categorie_grammaticale === randomWord.categorie_grammaticale &&
                    word.mot !== randomWord.mot &&
                    (word.url_video_definition === 'Non spécifié' || word.url_video_mot === 'Non spécifié')
                );

                // Vérifier s'il y a au moins 3 autres mots dans la même catégorie
                if (sameCategoryWords.length >= 3) {
                    break;
                }
            }
        }

        if (!randomWord || sameCategoryWords.length < 3) {
            return null;
        }

        // Assurer que les réponses incorrectes sont uniques et ne comprennent pas le mot correct
        const uniqueIncorrectAnswers = sameCategoryWords
            .filter(word => word.mot !== randomWord.mot)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(word => word.mot);

        // Créer le tableau des réponses avec la réponse correcte et les réponses incorrectes
        const answers = [
            ...uniqueIncorrectAnswers.map(answer => ({
                text: answer,
                correct: false
            })),
            { text: randomWord.mot, correct: true }
        ].sort(() => 0.5 - Math.random());

        // Déterminer s'il y a une icône pour le mot
        const key = `${randomWord.mot}.${randomWord.categorie_grammaticale}`;
        const icon = icons[key] || null;

        return icon
            ? {
                question: `Trouve la photo:`,
                answers,
                hint: randomWord.definition || '',
                secondHint: randomWord.url_video_definition || '',
                thirdHint: randomWord.url_video_mot || '',
                word: randomWord.mot,
                category: randomWord.categorie_grammaticale,
                icon
            }
            : {
                question: `Description: \n${randomWord.definition}`,
                answers,
                hint: randomWord.url_video_definition || '',
                secondHint: randomWord.url_video_mot || '',
                thirdHint: randomWord.url_video_mot || '',
                word: randomWord.mot,
                category: randomWord.categorie_grammaticale
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
                    if (questions[currentQuestionIndex]?.icon) {
                        setHint(questions[currentQuestionIndex]?.hint || '');
                    } else {
                        Alert.alert('First Hint', questions[currentQuestionIndex]?.hint || '');
                    }
                } else if (incorrectCount === 1) {
                    Alert.alert('Second Hint', questions[currentQuestionIndex]?.secondHint || '');
                } else if (incorrectCount === 2) {
                    Alert.alert('Third Hint', questions[currentQuestionIndex]?.thirdHint || '');
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

                <View>
                    {icon && <SvgXml xml={icon} />}
                    <Text style={styles.question}>{question}</Text>
                    {incorrectCount > 0 && icon && <Hint hint={hint} />}
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
                            text="Valider"
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
