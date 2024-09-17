// LegendModal.tsx
// This file defines a React Native component for a modal that displays a legend with color codes.
// It includes a close button to dismiss the modal and uses the ColorsLegend component to show the legend details.

import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '@/constants/Colors';
import ColorsLegend from './ColorsLegend';

interface LegendModalProps {
  visible: boolean;
  onClose: () => void;
}

const LegendModal: React.FC<LegendModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <EvilIcons name="close" style={styles.closeIcon}/>
          </TouchableOpacity>
          <ColorsLegend />
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
    width: '80%',
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeIcon: {
    fontSize: 25,
    color: Colors.black
  }
});

export default LegendModal;