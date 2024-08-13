import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Bubble from './Bubble';
import RadarEffect from './RadarEffect';
import CategoryItem from './CategoryItem';
import { GradientBorderButton } from '@/components/Button';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { BigTitle, ContainerParagraph } from '@/constants/StyledText';

const SummaryModal = ({ visible, categories, darkMode, onClose }) => {
    if (!visible) return null;

    const difficulties = categories.map(category => category.difficulty);
    const bubbleColors = getBubbleColors(difficulties);
    const bubbleSize = 20;
    const bubbleDuration = 7000;

    return (
        <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>
                <TouchableOpacity style={styles.removeButton} onPress={onClose}>
                    <Feather name="x" size={24} color="#333" />
                </TouchableOpacity>

                <View style={styles.radarWrapper}>
                    {categories.map((category, index) => {
                        const minRadius = 20 + index * 10;
                        const maxRadius = 40 + index * 10;
                        const radarColor = getRadarColor(category.difficulty, index);

                        return (
                            <RadarEffect
                                key={index}
                                color={radarColor}
                                minRadius={minRadius}
                                maxRadius={maxRadius}
                                index={index}
                            />
                        );
                    })}
                    <View style={styles.bubblesContainer}>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <Bubble
                                key={index}
                                size={bubbleSize + Math.random() * 10}
                                color={bubbleColors[index % bubbleColors.length]}
                                duration={bubbleDuration}
                                delay={Math.random() * bubbleDuration}
                            />
                        ))}
                    </View>
                </View>

                <BigTitle>Récapitulatif</BigTitle>
                <ContainerParagraph style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }}>
                    {`Vous allez commencer vos ${categories.length} thèmes :`}
                </ContainerParagraph>
                <View>
                    {categories.map((category, index) => (
                        <CategoryItem
                            key={index}
                            category={category}
                            darkMode={darkMode}
                        />
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <GradientBorderButton
                        text="Commencer"
                        background={darkMode ? 'dark' : 'light'}
                        onPress={onClose}
                        textColor={darkMode ? 'light' : 'dark'}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '100%',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '80%',
    },
    removeButton: {
        alignSelf: 'flex-end',
    },
    radarWrapper: {
        position: 'relative',
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubblesContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

const getBubbleColors = (difficulties) => {
    const uniqueDifficulties = new Set(difficulties);

    if (uniqueDifficulties.has('easy') && uniqueDifficulties.has('middle') && uniqueDifficulties.has('hard')) {
        return [color.lightBlue, color.lightGreen, color.lightPlum];
    }

    if (uniqueDifficulties.has('easy')) {
        return [color.lightGreen, color.neutralGreen, color.darkGreen];
    }

    if (uniqueDifficulties.has('middle')) {
        return [color.lightBlue, color.neutralBlue, color.darkBlue];
    }

    if (uniqueDifficulties.has('hard')) {
        return [color.lightPlum, color.neutralPlum, color.darkPlum];
    }

    return [color.lightBlue, color.neutralBlue, color.darkBlue];
};

const getRadarColor = (difficulty, index) => {
    const colors = {
        easy: [color.lightGreen, color.lightGreen, color.lightGreen],
        middle: [color.lightBlue, color.lightBlue, color.lightBlue],
        hard: [color.lightPlum, color.lightPlum, color.lightPlum],
    };

    const difficultyColors = colors[difficulty] || [color.lightPlum];

    // Alternate colors based on index
    return difficultyColors[index % difficultyColors.length];
};

export default SummaryModal;
