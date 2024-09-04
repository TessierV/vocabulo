import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Bubble from '@/components/Effect/Bubble';
import { lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import GradientBorderButton from '@/components/Button';
import { Feather } from '@expo/vector-icons';
import { AnnonceTitle, Paragraph } from '@/constants/StyledText';

const CancelModal = ({ visible, onConfirm, onCancel }) => {
    const [darkMode] = useDarkMode();

    const bubbles = Array.from({ length: 20 }).map((_, index) => ({
        id: index.toString(),
        size: Math.random() * 30 + 20,
        color: index % 3 === 0
            ? '#464D8E'
            : index % 3 === 1
                ? '#615D99'
                : '#5266B4',
        duration: 15000,
        delay: Math.random() * 10000,
        opacity: 0.5,
    }));

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.modalBackground}>
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
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                        <Feather style={styles.bannerInfo} name="x" size={24} color={darkMode ? darkTheme.lightShade : lightTheme.light_darkShade} />
                    </TouchableOpacity>
                    <AnnonceTitle style={styles.title}>Confirmation</AnnonceTitle>
                    <Paragraph style={styles.content}>
                        Vous allez perdre votre avancée. Voulez-vous vraiment quitter ?
                    </Paragraph>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Paragraph style={styles.buttonText}>Oui, quitter</Paragraph>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    bubblesContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    modalContainer: {
        width: '80%',
        paddingVertical: 40,
        backgroundColor: lightTheme.dark_lightShade,
        borderRadius: 8,
        alignItems: 'center',
        position: 'relative',
        gap: 10,
    },
    title: {
        color: lightTheme.darkShade,
    },
    content: {
        color: lightTheme.light_darkShade,
        textAlign: 'center',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    confirmButton: {
        borderWidth: 1,
        borderColor: lightTheme.light_darkShade,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        padding: 10,
        minHeight: 40,
        borderRadius: 25,
    },
    cancelButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    buttonText: {
        color: lightTheme.light_darkShade,
        fontSize: 14,
    },
});

export default CancelModal;
