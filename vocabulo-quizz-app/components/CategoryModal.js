import React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { GradientBackgroundButton } from './Button';

const CategoryModal = ({ isVisible, onClose, category, onConfirm, darkMode }) => {
  if (!category) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      style={styles.modal}
    >
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContent,
          { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }
        ]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="x" size={24} color="#333" />
          </TouchableOpacity>
          <SvgXml xml={category.icon} width={100} height={100} />
          <Text style={[
            styles.modalTitle,
            { color: darkMode ? darkTheme.text : lightTheme.text }
          ]}>{category.textLabel}</Text>
          <Text style={[
            styles.modalDifficulty,
            { color: darkMode ? darkTheme.text : lightTheme.text }
          ]}>Difficulté: {category.difficulty}</Text>
          <Text style={[
            styles.modalText,
            { color: darkMode ? darkTheme.text : lightTheme.text }
          ]}>Tu as choisi ce thème. Voulez-vous continuer ?</Text>
          <View style={styles.modalButtons}>
            <GradientBackgroundButton text="Commencer" textColor={darkMode ? 'light' : 'dark'} onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderRadius: 8,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDifficulty: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});

export default CategoryModal;
