import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BigTitle, ContainerParagraph } from '@/constants/StyledText';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import Bubble from '@/components/Effect/Bubble';
import { GradientBorderButton } from '@/components/Button';
import { ai } from '@/constants/texts';


const QuizStartModal = ({ modalVisible, setModalVisible, darkMode, navigateToQuiz }) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.bubblesContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Bubble
              key={index.toString()}
              size={Math.random() * 30 + 20}
              color={index % 4 === 0 ? darkMode ? color.darkPlum : color.darkBlue
                : index % 4 === 1 ? darkMode ? color.lightPlum : color.lightBlue
                  : index % 4 === 2 ? darkMode ? color.neutralPlum : color.neutralBlue
                    : darkMode ? color.darkPlum : color.darkBlue}
              duration={5000 + Math.random() * 3000}
              delay={Math.random() * 8000}
              opacity={0.6}
            />
          ))}
        </View>
        <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
          <BigTitle style={[styles.modalTitle, { fontSize: 26, color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
           {ai.modal.title}
          </BigTitle>
          <ContainerParagraph style={[styles.modalText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>
            {ai.modal.subtitle}
          </ContainerParagraph>
          <GradientBorderButton
            background={darkMode ? 'dark' : 'light'}
            textColor={darkMode ? 'light' : 'dark'}
            onPress={navigateToQuiz}
            text={ai.modal.button}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Feather name="x" size={24} color={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
          </TouchableOpacity>
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
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    padding: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    zIndex: 1,
  },
  modalText: {
    textAlign: 'center',
    marginVertical: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default QuizStartModal;
