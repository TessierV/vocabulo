import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { lightTheme, color } from '@/constants/Colors';
import { Paragraph, AnnonceTitle } from '@/constants/StyledText';
import Pagination from '@/components/Quizz/Pagination';

const HeaderQuiz = ({ handleQuit, currentQuestionIndex, totalQuestions, categoryName, darkMode }) => {
    return (
        <>
            <TouchableOpacity
                style={styles.quitButton}
                onPress={handleQuit}
            >
                <Feather
                    style={styles.icon}
                    name="anchor"
                    size={24}
                    color={darkMode ? lightTheme.lightShade : lightTheme.light_darkShade}
                />
            </TouchableOpacity>
            <View>
                <Paragraph style={styles.questionCount}>
                    Question {currentQuestionIndex + 1}/{totalQuestions}
                </Paragraph>
                <AnnonceTitle style={styles.categoryName}>
                    Quizz: {categoryName}
                </AnnonceTitle>
                <Pagination
                    currentIndex={currentQuestionIndex}
                    totalQuestions={totalQuestions}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({

    quitButton: {
        marginBottom: 20,
    },
    icon: {
        color: lightTheme.light_darkShade,
        alignSelf: 'flex-end',
    },
    questionCount: {
        color: color.darkBlue,
    },
    categoryName: {
        textTransform: 'capitalize',
        color: lightTheme.light_darkShade,
    },
});

export default HeaderQuiz;
