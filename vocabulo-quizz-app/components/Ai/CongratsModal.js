import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SvgXml } from 'react-native-svg';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import Bubble from '@/components/Effect/Bubble';
import logoBanner from '@/assets/images/Quizz/banner.png';
import { Paragraph } from '@/constants/StyledText';
import SvgIcon from '@/SVG/CategorySvgIcon';
import { GradientBorderButton } from '@/components/Button';
import VideoModal from '@/components/Quizz/HintVideoModal';

// CongratsModal component to display quiz results and evaluation
const CongratsModal = ({
    visible,
    questions,
    firstAttemptCorrect,
    incorrectAttempts,
    wordDefinitions,
    categoryName,
    onClose,
    darkMode
}) => {
    // Get screen dimensions
    const { width, height } = Dimensions.get('window');

    // State for evaluation modal visibility and selected evaluation
    const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);

    // State for video modal visibility and current video URL
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    // Generate bubble effect data
    const bubbles = Array.from({ length: 20 }).map((_, index) => ({
        id: index.toString(),
        size: Math.random() * 30 + 20,
        color: index % 4 === 0
            ? lightTheme.light_darkShade
            : index % 4 === 1
                ? color.neutralBlue
                : index % 4 === 2
                    ? color.neutralPlum
                    : color.neutralGreen,
        duration: 6000,
        delay: Math.random() * 10000,
        opacity: 0.8,
    }));

    // Handle evaluation selection
    const handleEvaluationSelect = useCallback((evaluation) => {
        setSelectedEvaluation(evaluation);
    }, []);

    // Handle evaluation submission
    const handleEvaluationSubmit = useCallback(() => {
        console.log('Selected evaluation:', selectedEvaluation);
        setEvaluationModalVisible(false);
        onClose();
    }, [selectedEvaluation, onClose]);

    // Handle opening video modal
    const handleOpenVideo = useCallback((url) => {
        console.log('Attempting to open video with URL:', url);
        if (url && typeof url === 'string' && url.trim() !== '') {
            setCurrentVideoUrl(url);
            setVideoModalVisible(true);
            console.log('Video modal should now be visible with URL:', url);
        } else {
            console.log('Invalid video URL:', url);
            Alert.alert('Erreur', 'La vidéo n\'est pas disponible.');
        }
    }, []);

    // Handle closing video modal
    const closeVideoModal = useCallback(() => {
        console.log('Closing video modal');
        setVideoModalVisible(false);
        setCurrentVideoUrl('');
    }, []);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            {/* Bubble effect container */}
            <View style={styles.bubblesContainer}>
                {bubbles.map(bubble => (
                    <Bubble
                        key={bubble.id}
                        size={bubble.size}
                        color={bubble.color}
                        duration={bubble.duration}
                        delay={bubble.delay}
                        opacity={bubble.opacity}
                    />
                ))}
            </View>

            {/* Main modal content */}
            <View style={styles.modalOverlay}>
                <Image
                    source={logoBanner}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.modalContent}>
                    <Paragraph style={styles.title}>Félicitations!</Paragraph>
                    <SvgIcon icon={categoryName} width={80} height={80} fillColor={color.neutralCoral} />

                    <View style={{ paddingVertical: 10 }}>
                        <Paragraph style={{ color: lightTheme.lightShade, textAlign: 'center' }}>
                            Bravo ! Vous avez terminé le quizz
                        </Paragraph>
                    </View>

                    {/* Scrollable container for quiz recap */}
                    <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScrollContainer}>
                        {questions.map((question, index) => {
                            const isCorrectFirstTry = firstAttemptCorrect.includes(index);
                            const isIncorrect = incorrectAttempts.includes(index);

                            return (
                                <View
                                    key={index}
                                    style={[styles.wordRecapContainer, {
                                        borderColor: isCorrectFirstTry ? color.darkGreen : isIncorrect ? color.darkCoral : color.darkCoral,
                                        backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade
                                    }]}
                                >
                                    <Paragraph style={[styles.recapWordText, { color: isCorrectFirstTry ? color.darkGreen : isIncorrect ? color.darkCoral : color.darkCoral }]}>
                                        Mot : {question.correctWord.mot}
                                    </Paragraph>
                                    <Paragraph style={[styles.recapDefinitionText, { color: darkMode ? color.neutral : color.neutral }]}>
                                        Définition : {wordDefinitions[question.correctWord.mot_id]?.definition || 'Non disponible'}
                                    </Paragraph>
                                </View>
                            );
                        })}
                    </ScrollView>

                    {/* Evaluation button */}
                    <View style={styles.buttonContainer}>
                        <GradientBorderButton
                            text="évaluation"
                            background={darkMode ? 'dark' : 'dark'}
                            textColor={darkMode ? 'light' : 'light'}
                            onPress={() => setEvaluationModalVisible(true)}
                        />
                    </View>
                </View>
            </View>

            {/* Evaluation Modal */}
            <Modal
                transparent
                visible={evaluationModalVisible}
                animationType="slide"
                onRequestClose={() => setEvaluationModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.evaluationModalContent}>
                        <Text style={styles.evaluationTitle}>Sélectionnez votre évaluation</Text>
                        <View style={styles.evaluationOptions}>
                            {/* Too Hard Option */}
                            <TouchableOpacity
                                style={[
                                    styles.evaluationOption,
                                    selectedEvaluation === 'Trop dur' && styles.selectedOption
                                ]}
                                onPress={() => handleEvaluationSelect('Trop dur')}
                            >
                                <Feather name="frown" size={30} color={selectedEvaluation === 'Trop dur' ? color.darkCoral : color.neutral} />
                                <Text style={[styles.evaluationText, { color: selectedEvaluation === 'Trop dur' ? color.neutral :  lightTheme.light_darkShade }]}>Trop dur</Text>
                            </TouchableOpacity>
                            {/* Good Option */}
                            <TouchableOpacity
                                style={[
                                    styles.evaluationOption,
                                    selectedEvaluation === 'Bien' && styles.selectedOption
                                ]}
                                onPress={() => handleEvaluationSelect('Bien')}
                            >
                                <Feather name="meh" size={30} color={selectedEvaluation === 'Bien' ? color.darkBlue : color.neutral} />
                                <Text style={[styles.evaluationText, { color: selectedEvaluation === 'Bien' ? color.neutral : lightTheme.light_darkShade}]}>Bien</Text>
                            </TouchableOpacity>
                            {/* Too Easy Option */}
                            <TouchableOpacity
                                style={[
                                    styles.evaluationOption,
                                    selectedEvaluation === 'Trop facile' && styles.selectedOption
                                ]}
                                onPress={() => handleEvaluationSelect('Trop facile')}
                            >
                                <Feather name="smile" size={30} color={selectedEvaluation === 'Trop facile' ? color.darkGreen : color.neutral} />
                                <Text style={[styles.evaluationText, { color: selectedEvaluation === 'Trop facile' ? color.neutral : lightTheme.light_darkShade }]}>Trop facile</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Submit Evaluation Button */}
                        {selectedEvaluation && (
                            <View style={styles.evaluationButtons}>
                                <GradientBorderButton
                                    text="Valider"
                                    background={darkMode ? 'dark' : 'dark'}
                                    textColor={darkMode ? 'light' : 'light'}
                                    onPress={handleEvaluationSubmit}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Video Modal */}
            <VideoModal
                visible={videoModalVisible}
                onClose={closeVideoModal}
                videoUrl={currentVideoUrl}
            />
        </Modal>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(66, 81, 109, 0.4)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: lightTheme.darkShade,
        paddingTop: 60,
        borderRadius: 8,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        color: lightTheme.lightShade,
        marginBottom: 10,
    },
    horizontalScrollContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
    },
    wordRecapContainer: {
        padding: 10,
        marginHorizontal: 10,
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        width: 300,
        justifyContent: 'center',
        gap: 10,
    },
    recapWordText: {
        fontSize: 16,
    },
    recapDefinitionText: {
        fontSize: 12,
    },
    videoButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    hintButton: {
        padding: 5,
        borderRadius: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 1,
        maxWidth: '48%',
        minWidth: 130,
        minHeight: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    bubblesContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    evaluationModalContent: {
        backgroundColor: darkTheme.darkShade,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    evaluationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightTheme.lightShade,
        marginBottom: 20,
    },
    evaluationOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
    },
    evaluationOption: {
        alignItems: 'center',
        padding: 10,
    },
    evaluationText: {
        color: lightTheme.lightShade,
        marginTop: 10,
        fontSize: 14,
    },
    evaluationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default CongratsModal;
