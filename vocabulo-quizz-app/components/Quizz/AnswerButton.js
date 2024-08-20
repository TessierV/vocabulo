import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { darkTheme, lightTheme, color } from '@/constants/Colors';

const AnswerButton = ({ answer, onPress, isSelected, isDisabled }) => {
    const getIcon = () => {
        if (isDisabled) {
            return 'x-circle';
        } else if (isSelected) {
            return 'check-circle';
        } else {
            return 'circle';
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.answerButton,
                isSelected && styles.selectedAnswerButton,
                isDisabled && styles.disabledAnswerButton,
            ]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Text
                style={[
                    styles.answerLabel,
                    isSelected && styles.selectedAnswerText,
                    isDisabled && styles.disabledAnswerText,
                ]}
            >
                {answer.label}
            </Text>
            <Text
                style={[
                    styles.answerText,
                    isSelected && styles.selectedAnswerText,
                    isDisabled && styles.disabledAnswerText,
                ]}
            >
                {answer.text}
            </Text>
            <Feather
                name={getIcon()}
                size={20}
                style={[
                    styles.icon,
                    isSelected && styles.selectedAnswerIcon,
                    isDisabled && styles.disabledAnswerIcon,
                ]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    answerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: lightTheme.light_darkShade,
        borderRadius: 5,
        backgroundColor: lightTheme.darkShade,
    },
    selectedAnswerButton: {
        borderColor: color.darkBlue,
        backgroundColor: color.neutralBlue,
    },
    disabledAnswerButton: {
        borderColor: color.neutralCoral,
    },
    answerLabel: {
        fontSize: 18,
        marginRight: 10,
        color: lightTheme.light_darkShade,
    },
    selectedAnswerText: {
        color: darkTheme.light_darkShade,
    },
    disabledAnswerText: {
        color: color.neutralCoral,
    },
    answerText: {
        fontSize: 18,
        flex: 1,
        color: lightTheme.light_darkShade,
    },
    icon: {
        marginLeft: 10,
        color: lightTheme.light_darkShade,
    },
    selectedAnswerIcon: {
        color: darkTheme.light_darkShade,
    },
    disabledAnswerIcon: {
        color: color.neutralCoral,
    },
});

export default AnswerButton;
