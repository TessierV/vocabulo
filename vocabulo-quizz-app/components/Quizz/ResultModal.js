import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { darkTheme, lightTheme, color } from '@/constants/Colors';

const ResultModal = ({ visible, onClose, correctFirstAttempt, correctSecondAttempt }) => {
    const router = useRouter();

    const handleModalClose = () => {
        router.push({
            pathname: '/game',
            params: { finalScore: correctFirstAttempt + correctSecondAttempt, totalQuestions: 4 }, // Adjust totalQuestions if needed
        });
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
                    <Text style={styles.modalTitle}>Congratulations!</Text>
                    <Text style={styles.modalText}>You answered {correctFirstAttempt} questions correctly on the first attempt.</Text>
                    <Text style={styles.modalText}>You answered {correctSecondAttempt} questions correctly on the second attempt.</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                        <Text style={styles.modalButtonText}>Go to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginVertical: 5,
    },
    modalButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    modalButtonText: {
        color: darkTheme.light_darkShade,
        fontSize: 16,
    },
});

export default ResultModal;
