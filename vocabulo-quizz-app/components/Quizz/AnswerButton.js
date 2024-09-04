// AnswerButton.js
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { Paragraph } from '@/constants/StyledText';

const AnswerButton = ({ answer, onPress, isSelected, isDisabled, index }) => {
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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <Paragraph style={[
                        styles.answerLabel,
                        isSelected && styles.selectedAnswerText,
                        isDisabled && styles.disabledAnswerText,
                    ]}>{index + 1}.</Paragraph>
                <Paragraph
                    style={[
                        styles.answerLabel,
                        isSelected && styles.selectedAnswerText,
                        isDisabled && styles.disabledAnswerText,
                    ]}
                >
                    {answer.text}
                </Paragraph>
            </View>

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
        minHeight: 40,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: lightTheme.light_darkShade,
        borderRadius: 8,
        backgroundColor: lightTheme.darkShade,
    },
    selectedAnswerButton: {
        borderColor: color.darkBlue,
        backgroundColor: color.neutralBlue,
    },
    disabledAnswerButton: {
        borderColor: color.neutralCoral,
        backgroundColor: color.disabledBackground,
    },
    indexLabel: {
        marginRight: 10,
        color: lightTheme.light_darkShade,
    },
    answerLabel: {
        color: lightTheme.light_darkShade,
    },
    selectedAnswerText: {
        color: darkTheme.light_darkShade,
    },
    disabledAnswerText: {
        color: color.neutralCoral,
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

