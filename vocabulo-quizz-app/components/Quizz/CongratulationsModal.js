import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { lightTheme, color } from '@/constants/Colors';
import SvgIcon from '@/components/SvgIcon';
import { useRouter } from 'expo-router';
import CategoryWordSvg from '@/SVG/CategoryWordSvg';

const CongratulationsModal = ({
    visible,
    score,
    totalQuestions,
    correctFirstAttempt,
    correctSecondAttempt,
    correctMoreAttempt,
    categoryName,
    correctWords, // Nouveau prop
    onClose,

}) => {
    const router = useRouter();
    const [isPerfectRun, setIsPerfectRun] = useState(false);

    useEffect(() => {
        if (visible) {
            checkPerfectRun();
        }
    }, [visible]);

    const checkPerfectRun = () => {
        if (correctFirstAttempt === totalQuestions) {
            setIsPerfectRun(true);
        } else {
            setIsPerfectRun(false);
        }
    };

    const handleRestartPress = () => {
        router.push('/home');
        onClose();
    };

    const handleGamePress = () => {
        router.push('/game');
        onClose();
    };

    const handleDictionaryPress = () => {
        router.push('/dictionary');
        onClose();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Félicitations!</Text>
                    <Text style={styles.score}>Vous avez terminé le quiz :</Text>
                    <Text style={styles.score}>Score : {score}/{totalQuestions}</Text>
                    {isPerfectRun ? (
                        <View style={styles.perfectRunContainer}>
                            <Text style={styles.perfectRunText}>Perfect Run!</Text>
                        </View>
                    ) : (
                        <View style={styles.attemptsContainer}>
                            <Text style={styles.attemptsTitle}>Tentatives :</Text>
                            <View style={styles.attemptsList}>
                                <View
                                    key="firstAttempt"
                                    style={[
                                        styles.attemptItem,
                                        { backgroundColor: 'green' }
                                    ]}
                                >
                                    <Text style={styles.attemptText}>
                                        1ère tentative : {correctFirstAttempt}
                                    </Text>
                                </View>
                                <View
                                    key="secondAttempt"
                                    style={[
                                        styles.attemptItem,
                                        { backgroundColor: 'blue' }
                                    ]}
                                >
                                    <Text style={styles.attemptText}>
                                        2ème tentative : {correctSecondAttempt}
                                    </Text>
                                </View>
                                <View
                                    key="moreAttempts"
                                    style={[
                                        styles.attemptItem,
                                        { backgroundColor: 'purple' }
                                    ]}
                                >
                                    <Text style={styles.attemptText}>
                                        Autres tentatives : {correctMoreAttempt}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    <ScrollView horizontal style={styles.scrollView}>
                        {correctWords.map((word, index) => (
                            <View key={index} style={styles.wordContainer}>
                                <SvgIcon icon={word.svg} fillColor={lightTheme.lightShade} />
                                <Text style={styles.wordText}>{word.mot}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleGamePress}>
                            <View style={[styles.iconButton]}>
                                <SvgIcon icon="category" fillColor={lightTheme.lightShade} />
                            </View>
                            <Text style={styles.iconButtonText}>Quizz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleRestartPress}>
                            <View style={[styles.iconButton, { backgroundColor: color.neutralBlue }]}>
                                <SvgIcon icon="refresh" fillColor={lightTheme.lightShade} />
                            </View>
                            <Text style={styles.iconButtonText}>Restart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleDictionaryPress}>
                            <View style={[styles.iconButton]}>
                                <SvgIcon icon="dictionary" fillColor={lightTheme.lightShade} />
                            </View>
                            <Text style={styles.iconButtonText}>Dictionnaire</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '85%',
        backgroundColor: lightTheme.darkShade,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: lightTheme.lightShade,
        marginBottom: 10,
    },
    score: {
        fontSize: 18,
        color: lightTheme.lightShade,
        marginVertical: 10,
    },
    perfectRunContainer: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: 'gold',
        borderRadius: 5,
    },
    perfectRunText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    attemptsContainer: {
        width: '100%',
        marginVertical: 10,
    },
    attemptsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightTheme.lightShade,
        marginBottom: 10,
    },
    attemptsList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    attemptItem: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%',
    },
    attemptText: {
        color: lightTheme.lightShade,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginVertical: 20,
    },
    iconButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        padding: 20,
        borderRadius: 25,
    },
    iconButtonText: {
        color: lightTheme.light_darkShade,
        marginTop: 5,
    },
    scrollView: {
        width: '100%',
        marginVertical: 20,
    },
    wordContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    wordText: {
        color: lightTheme.lightShade,
        marginTop: 5,
    },
});

export default CongratulationsModal;
