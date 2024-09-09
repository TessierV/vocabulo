// VideoModal.js

import React from 'react';
import { View, Modal, Button, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { lightTheme, color } from '@/constants/Colors';


const VideoModal = ({ videoUrl, modalVisible, closeModal }) => (
  <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={closeModal}
  >
    <View style={styles.modalView}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
      <Button title="Close" onPress={closeModal} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  video: {
    width: '100%',
    height: '80%',
  },
});

export default VideoModal;
