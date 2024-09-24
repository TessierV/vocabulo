// /components/General/CustomModal.js
import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import Bubble from '@/components/Effect/Bubble';
import { lightTheme } from '@/constants/Colors';
import { GradientBorderButton } from '../Button';
import useDarkMode from '@/components/useDarkMode';
import { AnnonceTitle, Paragraph } from '@/constants/StyledText';


const { width, height } = Dimensions.get('window');
const CustomModal = ({ visible, title, content, buttonText, onPress }) => {
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
      onRequestClose={onPress}
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
          <AnnonceTitle style={styles.title}>{title}</AnnonceTitle>
          <Paragraph style={styles.content}>{content}</Paragraph>
          <GradientBorderButton style={styles.button} onPress={onPress} background={darkMode ? 'dark' : 'light'} text={buttonText} textColor={darkMode ? 'light' : 'dark'} />
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
    padding: 20,
    backgroundColor: lightTheme.dark_lightShade,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: lightTheme.darkShade,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: lightTheme.light_darkShade,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default CustomModal;
