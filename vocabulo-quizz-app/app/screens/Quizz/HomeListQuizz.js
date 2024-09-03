import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import CategoryWordSvg from '@/SVG/CategoryWordSvg'; // Assurez-vous d'importer correctement vos SVG

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
            const svgIcon = hasImage ? <SvgXml xml={CategoryWordSvg[correctWord.mot]} width="60" height="60" /> : null;

            const questionText = svgIcon
                ? 'À quel mot correspond cette image?'
                : `Quelle est la réponse correcte pour la définition suivante :\n${correctWord.definitions}`;

            const hints = [
                `Définition : ${correctWord.definitions}`,
                `Définition : ${correctWord.definitions}, URL Définition : ${correctWord.signes[0]?.url_def || 'Non spécifié'}`,
                `Définition : ${correctWord.definitions}, URL Définition : ${correctWord.signes[0]?.url_def || 'Non spécifié'}, URL Signe : ${correctWord.signes[0]?.url_sign || 'Non spécifié'}`
            ];

            const question = {
                questionText,
                svgIcon,
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
                Alert.alert('Incorrect', 'Réessayez!');
            }
        } else {
            Alert.alert('Attention', 'Veuillez sélectionner une réponse avant de valider.');
        }
    };

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            Alert.alert(
                'Félicitations',
                `Vous avez terminé le quiz avec un score de ${score + (selectedAnswer && selectedAnswer.correct ? 1 : 0)}/${questions.length}!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.goBack(); // Retourner à la page précédente après le quiz
                        }
                    }
                ]
            );
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Erreur: {error}</Text>;
    }

    const currentQuestion = questions[currentQuestionIndex] || {};

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Quiz: {categoryName}</Text>
            <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
            {currentQuestion.svgIcon}

            {currentQuestion.answers && currentQuestion.answers.map((answer, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.answerButton,
                        selectedAnswer === answer && styles.selectedAnswerButton,
                    ]}
                    onPress={() => handleAnswerSelection(answer)}
                >
                    <Text style={styles.answerText}>{answer.text}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={styles.validateButton}
                onPress={validateAnswer}
            >
                <Text style={styles.validateButtonText}>Valider</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.hintButton}
                onPress={() => {
                    const hintLevel = currentQuestionIndex < currentQuestion.hints.length ? currentQuestionIndex : currentQuestion.hints.length - 1;
                    Alert.alert('Indice', currentQuestion.hints[hintLevel]);
                }}
            >
                <Text style={styles.hintButtonText}>Indice</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
        marginBottom: 20,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
    },
    answerButton: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    selectedAnswerButton: {
        backgroundColor: '#cce5ff',
    },
    answerText: {
        fontSize: 18,
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
    hintButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ffc107',
        borderRadius: 5,
    },
    hintButtonText: {
        color: '#000',
        fontSize: 18,
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
    }
});

export default HomeListQuizz;
