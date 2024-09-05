import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { lightTheme, color, darkTheme } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import SvgIcon from '@/SVG/CategorySvgIcon';
import { AnnonceTitle, Paragraph, Subtitle } from '@/constants/StyledText';
import Bubble from '@/components/Effect/Bubble';
import logoBanner from '@/assets/images/Quizz/banner.png';
import CategoryWordSvg from '@/SVG/CategoryWordSvg';
import GradientSVG from '@/SVG/GradientSVG';

const CongratulationsModal = ({
    visible,
    score,
    totalQuestions,
    correctFirstAttempt,
    correctSecondAttempt,
    correctMoreAttempt,
    categoryName,
    correctWords,
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

    const { width, height } = Dimensions.get('window');

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

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
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
                        <Paragraph style={{ color: lightTheme.lightShade, textAlign: 'center', textTransform: 'capitalize' }}>
                            {categoryName}
                        </Paragraph>
                    </View>

                    {isPerfectRun ? (
                        <View style={styles.perfectRunContainer}>
                            <AnnonceTitle style={styles.perfectRunText}>Perfect Run!</AnnonceTitle>
                        </View>
                    ) : (
                        <View style={styles.attemptsContainer}>
                            <Paragraph style={styles.attemptsTitle}>Tentatives :</Paragraph>
                            <View style={styles.attemptsList}>
                                <View style={styles.attemptItem}>
                                    <GradientSVG
                                        style={[StyleSheet.absoluteFill]}
                                        colors={[color.lightGreen, color.neutralGreen, color.darkGreen]}
                                    />
                                    <View style={styles.attemptTextContainer}>
                                        <Paragraph style={styles.attemptText}>1 Coup</Paragraph>
                                        <Subtitle style={styles.attemptResultText}>{correctFirstAttempt}</Subtitle>
                                    </View>
                                </View>
                                <View style={styles.attemptItem}>
                                    <GradientSVG
                                        style={StyleSheet.absoluteFill}
                                        colors={[color.lightBlue, color.neutralBlue, color.darkBlue]}
                                    />
                                    <View style={styles.attemptTextContainer}>
                                        <Paragraph style={styles.attemptText}>2 Coups</Paragraph>
                                        <Subtitle style={styles.attemptResultText}>{correctSecondAttempt}</Subtitle>
                                    </View>
                                </View>
                                <View style={styles.attemptItem}>
                                    <GradientSVG
                                        style={StyleSheet.absoluteFill}
                                        colors={[color.lightPlum, color.neutralPlum, color.darkPlum]}
                                    />
                                    <View style={styles.attemptTextContainer}>
                                        <Paragraph style={styles.attemptText}>Plus</Paragraph>
                                        <Subtitle style={styles.attemptResultText}>{correctMoreAttempt}</Subtitle>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    <ScrollView horizontal style={styles.scrollView}>
                        {correctWords.map((word, index) => {
                            const svgXml = CategoryWordSvg[word.mot] || CategoryWordSvg['default'];
                            return (
                                <View key={index} style={styles.wordContainer}>
                                    <SvgXml xml={svgXml} width="20" height="20" />
                                    <Paragraph style={styles.wordText}>{word.mot}</Paragraph>
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleRestartPress}>
                            <View style={[styles.iconButton]}>
                                <InterfaceSvg iconName="refresh" fillColor={color.neutralBlue} width={30} height={30} />
                            </View>
                            <Paragraph style={styles.iconButtonText}>Profil</Paragraph>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleGamePress}>
                            <View style={[styles.iconButton, { backgroundColor: color.neutralBlue }]}>
                                <InterfaceSvg iconName="game" fillColor={lightTheme.darkShade} width={30} height={30} />
                            </View>
                            <Paragraph style={styles.iconButtonText}>Game</Paragraph>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleDictionaryPress}>
                            <View style={[styles.iconButton]}>
                                <InterfaceSvg iconName="url_def" fillColor={color.neutralBlue} width={30} height={30} />
                            </View>
                            <Paragraph style={styles.iconButtonText}>Dictionnaire</Paragraph>
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
        backgroundColor: 'rgba(66, 81, 109, 0.6)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: lightTheme.darkShade,
        padding: 20,
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
    perfectRunText: {
        color: color.neutralCoral,
        marginVertical: 20,
    },
    attemptsContainer: {
        width: '100%',
        marginVertical: 10,

    },
    attemptsTitle: {
        color: lightTheme.lightShade,
        marginBottom: 10,
    },
    attemptsList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    attemptItem: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        position: 'relative',
        overflow: 'hidden',

    },
    attemptTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 5,
    },
    attemptText: {
        color: lightTheme.darkShade,
        textAlign: 'center',
        fontSize: 12,

    },
    attemptResultText: {
        color: lightTheme.darkShade,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginVertical: 20,
        gap: 15,
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
        color: lightTheme.dark_lightShade,
        marginTop: 5,
        fontSize: 12,
    },
    scrollView: {
        width: '100%',
        marginVertical: 20,
    },
    wordContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        minWidth: 120,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: lightTheme.light_darkShade,
        borderRadius: 8,
        marginRight: 10,
    },
    wordText: {
        color: lightTheme.light_darkShade,
        textTransform: 'capitalize',
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
});

export default CongratulationsModal;
