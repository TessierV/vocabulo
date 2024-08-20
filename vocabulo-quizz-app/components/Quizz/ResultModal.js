import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme, color } from '@/constants/Colors';

// Import your image from assets
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
                    <Text style={styles.modalTitle}>Congratulations!</Text>

                    <View style={styles.containerSection}>
                        <View style={styles.modalContentSection}>
                            <Feather name="home" size={24} color="#fff" />
                            <Text style={styles.modalText}>{correctFirstAttempt} 1er tentatives</Text>
                        </View>
                        <View style={styles.modalContentSection}>
                            <Feather name="home" size={24} color="#fff" />

                            <Text style={styles.modalText}>{correctSecondAttempt} 2eme tentatives</Text>
                        </View>
                    </View>


                    {/* Add buttons with Feather icons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.iconButton} onPress={handleHomePress}>
                            <Feather name="home" size={24} color="#fff" />
                            <Text style={styles.iconButtonText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleRestartPress}>
                            <Feather name="rotate-cw" size={24} color="#fff" />
                            <Text style={styles.iconButtonText}>Restart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleGamePress}>
                            <Feather name="play-circle" size={24} color="#fff" />
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay color
    },
    modalContent: {
        width: '100%',
        height: '80%',
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },

    imageContainer: {
        position: 'relative',
        marginBottom: 20,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    image: {
        width: 350,
        height: 350,
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
    containerSection:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,

    },
    modalContentSection:{
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-between',
        minWidth: '49%',
        alignSelf: 'center',
        alignContent: 'center',

        paddingHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,

    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 14,
        marginVertical: 5,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    iconButtonText: {
        color: '#fff',
        marginTop: 5,
    },
    modalButtonText: {
        color: darkTheme.light_darkShade,
        fontSize: 16,
    },
});

export default ResultModal;
