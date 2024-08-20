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
    const bubbleDuration = 6000;

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
                        const radarColor = getRadarColor(category.difficulty);

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

const getBubbleColors = (difficulties) => {
    const colors = {
        easy: color.lightGreen,
        middle: color.lightBlue,
        hard: color.lightPlum,
    };

    // Génère une liste de couleurs basées sur les difficultés
    return difficulties.map(difficulty => colors[difficulty] || color.lightPlum);
};

const getRadarColor = (difficulty) => {
    const colors = {
        easy: color.neutralGreen,
        middle: color.neutralBlue,
        hard: color.neutralPlum,
    };

    return colors[difficulty] || color.lightPlum;
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

export default SummaryModal;
