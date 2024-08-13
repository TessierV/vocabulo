import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import Bubble from './Bubble';
import RadarEffect from './RadarEffect';
import { GradientBorderButton } from '@/components/Button';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { BigTitle, ContainerParagraph } from '@/constants/StyledText';

const CategoryModal = ({ isVisible, onClose, category, onConfirm, darkMode }) => {
  if (!category) return null;

  // Determine bubble colors based on difficulty
  const getBubbleColors = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return [color.lightGreen, color.neutralGreen, color.darkGreen];
      case 'middle':
        return [color.lightBlue, color.neutralBlue, color.darkBlue];
      case 'hard':
        return [color.lightPlum, color.neutralPlum, color.darkPlum];
      default:
        return [color.lightBlue, color.neutralBlue, color.darkBlue]; // Fallback colors
    }
  };

  // Determine radar colors based on difficulty
  const getRadarColors = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return [color.darkGreen, color.neutralGreen, color.lightGreen];
      case 'middle':
        return [color.darkBlue, color.neutralBlue, color.darkBlue];
      case 'hard':
        return [color.darkPlum, color.neutralPlum, color.lightPlum];
      default:
        return [color.lightBlue, color.neutralBlue, color.lightBlue]; // Fallback colors
    }
  };

  const bubbleColors = getBubbleColors(category.difficulty);
  const radarColors = getRadarColors(category.difficulty);
  const bubbleSize = 20;
  const bubbleDuration = 7000;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>
          <TouchableOpacity style={styles.removeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.radarWrapper}>
            <RadarEffect
              colors={radarColors} // Pass colors array for radar
              minRadius={30}
              maxRadius={50}
              svgIcon={category.icon} // Pass SVG directly
            />
            <View style={styles.bubblesContainer}>
              {Array.from({ length: 20 }).map((_, index) => (
                <Bubble
                  key={index}
                  size={bubbleSize + Math.random() * 10}
                  color={bubbleColors[index % bubbleColors.length]}
                  duration={bubbleDuration}
                  delay={Math.random() * bubbleDuration}
                />
              ))}
            </View>
          </View>

          <BigTitle>{category.textLabel}</BigTitle>
          <ContainerParagraph style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }}>
            {`Difficulté: ${category.difficulty}`}
          </ContainerParagraph>
          <ContainerParagraph style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }}>
            Vous allez commencer avec ce thème. Voulez-vous continuer ?
          </ContainerParagraph>

          <View style={styles.buttonContainer}>
            <GradientBorderButton
              text="Commencer"
              background={darkMode ? 'dark' : 'light'}
              onPress={onConfirm}
              textColor={darkMode ? 'light' : 'dark'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background for the modal overlay
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  removeButton: {
    alignSelf: 'flex-end',
  },
  radarWrapper: {
    position: 'relative',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubblesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CategoryModal;
