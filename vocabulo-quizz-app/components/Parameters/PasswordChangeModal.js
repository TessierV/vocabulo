import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Paragraph } from '@/constants/StyledText';

const PasswordChangeModal = ({ visible, onClose, onConfirm, randomDigits, newPassword, setNewPassword, loading }) => {
  const handleKeyPress = (digit) => {
    if (newPassword.length < 5) {
      setNewPassword((prevPassword) => prevPassword + digit);
    }
  };

  const handleDelete = () => {
    setNewPassword(newPassword.slice(0, -1));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Paragraph style={styles.modalText}>Entrez un nouveau mot de passe de 5 chiffres</Paragraph>

          <View style={styles.passwordContainer}>
            <View style={styles.passwordBoxes}>
              {[...Array(5)].map((_, i) => (
                <View key={i} style={[styles.box, { backgroundColor: newPassword[i] ? '#90EE90' : 'transparent' }]}>
                  <Paragraph style={styles.boxText}>{newPassword[i] ? newPassword[i] : ''}</Paragraph>
                </View>
              ))}
            </View>

            <View style={styles.numericKeyboard}>
              {randomDigits.map((digit) => (
                <TouchableOpacity
                  key={digit}
                  style={styles.numericKey}
                  onPress={() => handleKeyPress(digit)}
                >
                  <Paragraph style={styles.keyText}>{digit}</Paragraph>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.deleteKey} onPress={handleDelete}>
                <Paragraph style={styles.keyText}>Delete</Paragraph>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Paragraph style={styles.buttonText}>Annuler</Paragraph>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onConfirm} disabled={loading}>
              <Paragraph style={styles.buttonText}>Confirmer</Paragraph>
            </TouchableOpacity>
          </View>
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
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  passwordBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  numericKeyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numericKey: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  deleteKey: {
    width: 100,
    height: 50,
    backgroundColor: '#f54242',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  keyText: {
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default PasswordChangeModal;
