import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '@/constants/Colors';

const InfoModal = ({ visible, onClose, title, text, button, darkMode }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.lightShade }]}>
                    <Text style={[styles.modalTitle, { color: darkMode ? darkTheme.lightShade : darkTheme.darkShade }]}>
                        {title}
                    </Text>
                    <Text style={[styles.modalText, { color: darkMode ? darkTheme.lightShade : darkTheme.darkShade }]}>
                        {text}
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={[styles.closeButton, { color: darkMode ? darkTheme.lightShade : darkTheme.darkShade }]}>
                            {button}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        fontSize: 16,
    },
});

export default InfoModal;
