import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { BigTitle } from '@/constants/StyledText';


const imagePath = require('@/assets/images/borderCongrats.png');

const ResultModal = ({ visible, onClose, correctFirstAttempt, correctSecondAttempt }) => {
    const router = useRouter();

    const handleHomePress = () => {
        router.push('/home');
        onClose();
    };

    const handleRestartPress = () => {
        router.push('/game');
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
                        <Image
                            source={imagePath}  // Local image from assets
                            style={styles.image}
                        />
                        <View style={styles.circle} />
                    </View>
                    <BigTitle style={styles.modalTitle}>Congratulations!</BigTitle>

                    <View style={styles.containerSection}>
                        <View style={styles.modalContentSection}>
                            <View style={styles.modalTitleSection}>
                                <Feather name="home" size={24} color={lightTheme.darkShade} />
                                <Text style={styles.modalText}>1 tentative</Text>
                            </View>


                            <Text style={styles.modalText}>{correctFirstAttempt}</Text>

                        </View>
                        <View style={styles.modalContentSection}>
                            <View style={styles.modalTitleSection}>

                                <Feather name="home" size={24} color={lightTheme.darkShade} />
                                <Text style={styles.modalText}>2eme tentatives</Text>

                            </View>
                            <Text style={styles.modalText}>{correctFirstAttempt}</Text>

                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleHomePress}>
                            <View style={[styles.iconButton, {backgroundColor: color.darkGreen}]}>

                                <Feather name="home" size={35} color={lightTheme.darkShade} />
                            </View>
                            <Text style={styles.iconButtonText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleRestartPress}>
                            <View style={[styles.iconButton, {backgroundColor: color.darkBlue}]}>

                                <Feather name="rotate-cw" size={35} color={lightTheme.darkShade} />
                            </View>

                            <Text style={styles.iconButtonText}>Restart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleGamePress}>
                            <View style={[styles.iconButton, {backgroundColor: color.darkPlum}]}>
                                <Feather name="play-circle" size={35} color={lightTheme.darkShade} />
                            </View>
                            <Text style={styles.iconButtonText}>Game</Text>
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
    circle: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 150,
        backgroundColor: '#FF0000',
        zIndex: 1,
    },
    containerSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,

    },

    modalTitleSection: {
        flexDirection: 'row',
        gap: 15,
    },


    modalContentSection: {
        flexDirection: 'row',
        backgroundColor: lightTheme.lightShade,
        justifyContent: 'space-between',
        minWidth: '100%',
        alignSelf: 'center',
        alignContent: 'center',

        paddingHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,

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
        backgroundColor: lightTheme.darkShade,
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
