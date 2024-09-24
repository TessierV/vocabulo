import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Hint from '@/components/Quizz/Hint';
import { SvgXml } from 'react-native-svg';
import { lightTheme } from '@/constants/Colors';
import { Paragraph } from '@/constants/StyledText';


const QuestionCard = ({ question, icon, hint, incorrectCount }) => {
    return (
        <View style={styles.container}>
            {icon && <SvgXml xml={icon} />}
            <Paragraph style={styles.question}>{question}</Paragraph>
            {incorrectCount > 0 && icon && <Hint hint={hint} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    question: {
        fontSize: 24,
        marginBottom: 10,
        color: lightTheme.lightShade,
    },
});

export default QuestionCard;
