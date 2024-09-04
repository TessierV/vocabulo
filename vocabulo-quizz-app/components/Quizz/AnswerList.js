import React from 'react';
import { View } from 'react-native';
import AnswerButton from '@/components/Quizz/AnswerButton';

const AnswerList = ({ answers, selectedAnswer, disabledAnswers, handleAnswerSelection }) => {
    return (
        <>
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
        </>
    );
};

export default AnswerList;
