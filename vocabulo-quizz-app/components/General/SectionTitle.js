import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Subtitle, Paragraph, BigTitle, ContainerTitle, ContainerParagraph } from '@/constants/StyledText';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import Bubble from '@/components/Effect/Bubble';
import { GradientBorderButton, GradientBorderButtonMini } from '../Button';

const SectionTitle = ({
  title,
  text,
  iconName = 'info',
  popupTitle,
  popupText,
  popupButtonText,
  darkMode,
  showTextAndIcon = true,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const fillColor = darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade;

  const handleIconPress = () => {
    setModalVisible(true);
  };

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
    <View style={styles.container}>
      <View style={styles.row}>
        <Subtitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }}>{title}</Subtitle>

        {showTextAndIcon && (
          <TouchableOpacity onPress={handleIconPress} style={styles.rightColumn}>
            <Paragraph style={[styles.textRight, { color: darkMode ? darkTheme.neutral : lightTheme.neutral }]}>
              {text}
            </Paragraph>
            <InterfaceSvg
              iconName={iconName}
              height={16}
              width={16}
              fillColor={darkMode ? darkTheme.neutral : lightTheme.neutral}
            />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
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
            <BigTitle style={[styles.modalTitle, {fontSize: 26, color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{popupTitle}</BigTitle>
            <ContainerParagraph style={[styles.modalText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>{popupText}</ContainerParagraph>
            <View>
              <GradientBorderButtonMini
                text="Fermer"
                background={darkMode ? 'dark' : 'light'}
                onPress={() => setModalVisible(false)}
                textColor={darkMode ? 'light' : 'dark'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRight: {
    marginRight: 10,
    fontSize: 12,
  },
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
  modalText: {
    textAlign: 'center',
    marginVertical: 15,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});

export default SectionTitle;
