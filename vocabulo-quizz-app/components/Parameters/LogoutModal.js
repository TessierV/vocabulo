import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Paragraph } from '@/constants/StyledText';

const LogoutModal = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Paragraph style={styles.modalText}>Voulez-vous vraiment vous déconnecter ?</Paragraph>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Paragraph style={styles.buttonText}>Annuler</Paragraph>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogout}>
              <Paragraph style={styles.buttonText}>Se déconnecter</Paragraph>
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
  logoutButton: {
    backgroundColor: '#f54242',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default LogoutModal;
