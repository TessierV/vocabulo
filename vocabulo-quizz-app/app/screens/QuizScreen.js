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
    // Supprimer les guillemets en excès et gérer les chaînes avec des guillemets
    return line
        .replace(/""/g, '')  // Supprimer les guillemets doubles
        .replace(/"([^"]*)"/g, (_, group) => group.replace(/,/g, '⨯')); // Remplacer les virgules internes par un caractère temporaire
};

const restoreCommas = (value) => value.replace(/⨯/g, ',');

const parseData = (data) => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map(line => {
        const cleanLine = handleQuotes(line);

        const values = cleanLine.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(value => restoreCommas(value.trim()));

        return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || ''; // Assurer qu'il y a une valeur pour chaque en-tête
            return acc;
        }, {});
    });
};

const QuizScreen = () => {
    const [darkMode, toggleDarkMode] = useDarkMode();
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

    // Randomly select a word and generate question
    const generateQuestion = () => {
        // Filtrer les mots valides avec les valeurs nécessaires
        const validWords = parsedData.filter(word => word.url_video_definition !== 'Non spécifié' && word.url_video_mot !== 'Non spécifié');

        if (validWords.length === 0) {
            console.error('No valid words available');
            return null;
        }

        // Randomly select a word from the valid words
        let randomWord;
        do {
            randomWord = validWords[Math.floor(Math.random() * validWords.length)];
        } while (!randomWord.url_video_definition || !randomWord.url_video_mot);

        // Get other words in the same category
        const sameCategoryWords = validWords.filter(word => word.categorie_grammaticale === randomWord.categorie_grammaticale && word.mot !== randomWord.mot);

        // Shuffle and select answers
        const shuffledAnswers = sameCategoryWords.sort(() => 0.5 - Math.random()).slice(0, 2); // Select 2 other words

        // Ensure the correct answer is included and all words are different
        shuffledAnswers.push(randomWord);

        const uniqueAnswers = [...new Set(shuffledAnswers.map(answer => answer.mot))].sort(() => 0.5 - Math.random());

        const answers = uniqueAnswers.map((word, index) => ({
            text: word,
            correct: word === randomWord.mot,
        }));

        // Détermine la présence d'une icône pour le mot
        const key = `${randomWord.mot}.${randomWord.categorie_grammaticale}`;
        const icon = icons[key] || null;

        // Retourne les données de la question en fonction de la présence de l'icône
        return icon
            ? {
                question: `Trouve la photo:`,
                answers,
                hint: randomWord.definition || '', // L'indice descriptif est masqué au début
                secondHint: randomWord.url_video_definition || '',
                thirdHint: randomWord.url_video_mot || '',
                word: randomWord.mot,
                category: randomWord.categorie_grammaticale,
                icon // Ajoute l'icône à la question
            }
            : {
                question: `Description: \n${randomWord.definition}`,
                answers,
                hint: randomWord.url_video_definition || '',
                secondHint: randomWord.url_video_mot || '',
                word: randomWord.mot,
                category: randomWord.categorie_grammaticale
            };
    };

    useEffect(() => {
        setQuestions([generateQuestion()]);
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

                // Affichage des indices en fonction du nombre de réponses incorrectes
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
                    {/* Afficher l'icône si elle est disponible */}
                    {icon && <SvgXml xml={icon} />}
                    <Text style={styles.question}>{question}</Text>
                    {/* Afficher l'indice uniquement après une réponse incorrecte */}
                    {incorrectCount > 0 && !icon && <Hint hint={hint} />}
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
