import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Bubble from '@/components/Effect/Bubble';
import { BigTitle, ContainerParagraph } from '@/constants/StyledText';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { GradientBorderButtonMini } from '@/components/Button';

const EnhancedCustomModal = ({ visible, title, content, buttonText, onPress, onCancel, darkMode }) => {
  const bubbles = Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    size: Math.random() * 30 + 20,
    color: index % 4 === 0
      ? darkMode ? color.darkPlum : color.darkBlue
      : index % 4 === 1
        ? darkMode ? color.lightPlum : color.lightBlue
        : index % 4 === 2
          ? darkMode ? color.neutralPlum : color.neutralBlue
          : darkMode ? color.darkPlum : color.darkBlue,
    duration: 5000 + Math.random() * 3000,
    delay: Math.random() * 8000,
    opacity: 0.6,
  }));

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
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
        <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Feather name="x" size={24} color={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
          </TouchableOpacity>
          <BigTitle style={[styles.modalTitle, {color: darkMode ? darkTheme.lightShade : lightTheme.darkShade}]}>{title}</BigTitle>
          {typeof content === 'string' ? (
            <ContainerParagraph style={[styles.modalText, {color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade}]}>
              {content}
            </ContainerParagraph>
          ) : (
            content
          )}
          <View style={styles.buttonContainer}>
            <GradientBorderButtonMini
              text={buttonText}
              background={darkMode ? 'dark' : 'light'}
              onPress={onPress}
              textColor={darkMode ? 'light' : 'dark'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(38, 45, 52, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalContent: {
    padding: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  modalTitle: {
    fontSize: 26,
    marginBottom: 15,
  },
  modalText: {
    textAlign: 'center',
    marginVertical: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});

export default EnhancedCustomModal;