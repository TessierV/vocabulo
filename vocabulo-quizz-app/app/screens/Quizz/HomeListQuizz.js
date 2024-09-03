import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { lightTheme, color, darkTheme } from '@/constants/Colors';

import CategoryWordSvg from '@/SVG/CategoryWordSvg';


import AnswerButton from '@/components/Quizz/AnswerButton';
import Pagination from '@/components/Quizz/Pagination';

const HomeListQuizz = () => {
    const route = useRoute();
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

    useEffect(() => {
        const fetchWords = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://192.168.0.12:3000/api/words/${categorie_id}`);
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

        while (questions.length < 4) {
            if (words.length < 4) {
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
            const svgIconWord = hasImage ? <SvgXml xml={CategoryWordSvg[correctWord.mot]} width="130" height="130" /> : null;

            const questionText = svgIconWord ? (
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    À quel mot correspond cette image?
                </Text>
            ) : (
                <>
                    <Text style={{ fontSize: 15 }}>
                        Quelle est la réponse pour la définition suivante :{'\n\n'}
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 25,}}>
                        {correctWord.definitions}
                    </Text>
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
                hints
            };

            questions.push(question);
        }

        setQuestions(questions);
    };

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
    };

    const validateAnswer = () => {
        if (selectedAnswer) {
            if (selectedAnswer.correct) {
                setScore(prevScore => prevScore + 1);
                moveToNextQuestion();
            } else {
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

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setAttempts(0);
            setShowFirstHint(false);
            setShowSecondHint(false);
            setDisabledAnswers([]);
        } else {
            Alert.alert(
                'Félicitations',
                `Vous avez terminé le quiz avec un score de ${score + (selectedAnswer && selectedAnswer.correct ? 1 : 0)}/${questions.length}!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.goBack();
                        }
                    }
                ]
            );
        }
    };

    const openHintModal = (content) => {
        setHintContent(content);
        setShowHintModal(true);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={color.neutralBlue} />
            </View>
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Erreur: {error}</Text>;
    }

    const currentQuestion = questions[currentQuestionIndex] || {};
    const { answers = [], hints = [] } = currentQuestion;
    const correctAnswer = answers.find(answer => answer.correct) || {};
    const url_def = correctAnswer.url_def || 'Non spécifié';
    const url_sign = correctAnswer.url_sign || 'Non spécifié';

    return (
        <View style={styles.container}>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'flex-start', }}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Retour</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.title}>Quizz: {categoryName}</Text>
                    <Text>Question {currentQuestionIndex + 1}/{questions.length}
                    </Text>
                    <Pagination
                        currentIndex={currentQuestionIndex}
                        totalQuestions={questions.length}
                    />
                </View>
            </View>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
                <View style={styles.svgIconWord}>{currentQuestion.svgIconWord}</View>
            </View>

            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', }}>

                {answers.map((answer, index) => (
                    <AnswerButton
                        key={index}
                        answer={answer}
                        onPress={() => handleAnswerSelection(answer)}
                        isSelected={selectedAnswer === answer}
                        isDisabled={disabledAnswers.includes(answer)}
                    />
                ))}
            </View>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', }}>

                <TouchableOpacity
                    style={styles.validateButton}
                    onPress={validateAnswer}
                >
                    <Text style={styles.validateButtonText}>Valider</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', }}>



                <View style={styles.hintsContainer}>
                    {showFirstHint && (
                        url_def === 'Non spécifié' && url_sign === 'Non spécifié' ? (
                            <Text style={styles.hintText}>Il n'y a pas d'indice pour ce mot</Text>
                        ) : url_sign !== 'Non spécifié' && url_def === 'Non spécifié' ? (
                            <View style={styles.hintButton}>
                                <Text style={styles.hintButtonText}>Indice bientot</Text>
                            </View>
                        ) : url_def !== 'Non spécifié' && url_sign !== 'Non spécifié' ? (
                            <TouchableOpacity
                                style={styles.hintButton}
                                onPress={() => openHintModal(url_def)}
                            >
                                <Text style={styles.hintButtonText}>Indice 1</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.hintButton}
                                onPress={() => openHintModal(url_def)}
                            >
                                <Text style={styles.hintButtonText}>Indice 1</Text>
                            </TouchableOpacity>
                        )
                    )}
                    {showSecondHint && url_sign !== 'Non spécifié' && (
                        <TouchableOpacity
                            style={styles.hintButton}
                            onPress={() => openHintModal(url_sign)}
                        >
                            <Text style={styles.hintButtonText}>Indice 2</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>


            <Modal
                transparent={true}
                visible={showHintModal}
                onRequestClose={() => setShowHintModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{hintContent}</Text>
                        <Button title="Fermer" onPress={() => setShowHintModal(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        gap: 10,
        width: '100%',
    },


    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        color: '#007BFF',
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
    },
    validateButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
    },
    validateButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    hintsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 20,
        gap: 10,
    },
    hintButton: {
        padding: 10,
        borderRadius: 8,
        flex: 1,
        borderWidth: 1,
        borderColor: lightTheme.darkShade,
    },
    hintButtonText: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
    },
    hintText: {
        fontSize: 14,
        color: '#ff5722',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
    svgIconWord:{
        marginVertical: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default HomeListQuizz;
