import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import SvgIcon from './SvgIcon'; // Assurez-vous que le chemin est correct
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { BigTitle } from '@/constants/StyledText';

const imagePath = require('@/assets/images/borderCongrats.png');
const circusPath = require('@/assets/images/circus.png');
const defaultPath = require('@/assets/images/oyster.png');

const ResultModal = ({ visible, onClose, correctFirstAttempt, correctSecondAttempt, correctMoreAttempt }) => {
    const router = useRouter();

    // Ref to hold the animated value for scale
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Start the animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.8, // Scale down to 0.8x
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, // Scale up to 1
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the rotation animation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1, // Rotate to 1 (mapped to 360 degrees)
                duration: 5000,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    // Interpolating the rotate value from 0 to 1 into degrees
    const rotateInterpolation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleDictionaryPress = () => {
        router.push('/dictionary');
        onClose();
    };

    const handleRestartPress = () => {
        router.push('/quiz');
        onClose();
    };

    const handleGamePress = () => {
        router.push('/game');
        onClose();
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.imageContainer}>
                        <Animated.Image
                            source={imagePath}
                            style={[styles.image, { transform: [{ scale: scaleAnim }] }]} // Apply scaling animation
                        />
                        <View style={styles.circle}>
                            <Image
                                source={defaultPath}
                                style={styles.imageDefault}
                            />
                        </View>
                        <Animated.Image
                            source={circusPath}
                            style={[styles.imageHalo, { transform: [{ rotate: rotateInterpolation }] }]} // Apply rotation animation
                        />
                    </View>
                    <BigTitle style={styles.modalTitle}>Congratulations!</BigTitle>

                    <View style={styles.containerSection}>
                        <View style={[styles.modalContentSection, { backgroundColor: color.neutralGreen }]}>
                            <View style={styles.modalTitleSection}>
                                <SvgIcon icon="happy" fillColor={lightTheme.darkShade} />
                            </View>
                            <Text style={styles.modalText}>{correctFirstAttempt}</Text>
                        </View>
                        <View style={[styles.modalContentSection, { backgroundColor: color.neutralBlue }]}>
                            <View style={styles.modalTitleSection}>
                                <SvgIcon icon="normal" fillColor={lightTheme.darkShade} />
                            </View>
                            <Text style={styles.modalText}>{correctSecondAttempt}</Text>
                        </View>
                        <View style={[styles.modalContentSection, { backgroundColor: color.neutralPlum }]}>
                            <View style={styles.modalTitleSection}>
                                <SvgIcon icon="sad" fillColor={lightTheme.darkShade} />
                            </View>
                            <Text style={styles.modalText}>{correctMoreAttempt}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleGamePress}>
                            <View style={[styles.iconButton]}>
                                <SvgIcon icon="category" fillColor={lightTheme.darkShade} />
                            </View>
                            <Text style={styles.iconButtonText}>Quizz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleRestartPress}>
                            <View style={[styles.iconButton, { backgroundColor: lightTheme.darkShade }]}>
                                <SvgIcon icon="refresh" fillColor={lightTheme.lightShade} />
                            </View>
                            <Text style={styles.iconButtonText}>Restart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleDictionaryPress}>
                            <View style={[styles.iconButton]}>
                                <SvgIcon icon="dictionary" fillColor={lightTheme.darkShade} />
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
    modalContainer: {
        flex: 1,
        backgroundColor: lightTheme.dark_lightShade,
    },
    modalContent: {
        width: '90%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        alignContent: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    image: {
        width: 500,
        height: 500,
        zIndex: 2,
        position: 'absolute',
    },
    imageHalo: {
        width: 1200,
        height: 1200,
    },
    circle: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 150,
        zIndex: 1,
    },
    imageDefault: {
        width: 140,
        height: 140,
    },
    containerSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,
        width: '100%',
    },
    modalTitleSection: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    modalContentSection: {
        flexDirection: 'row',
        backgroundColor: lightTheme.lightShade,
        justifyContent: 'space-between',
        minWidth: '30%',
        alignSelf: 'center',
        alignContent: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        gap: 15,

    },
    modalTitle: {
        textAlign: 'center',
        color: lightTheme.darkShade,
    },
    modalText: {
        fontSize: 14,
        marginVertical: 5,
        textAlign: 'center',
        color: lightTheme.darkShade,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
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
    modalButtonText: {
        color: lightTheme.light_darkShade,
        fontSize: 16,
    },
});

export default ResultModal;

