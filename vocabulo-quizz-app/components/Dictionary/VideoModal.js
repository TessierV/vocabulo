import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { color } from '@/constants/Colors';

import Bubble from '@/components/Effect/Bubble';

const { width, height } = Dimensions.get('window');

const VideoModal = ({ closeModal, videoUrl, modalVisible, darkMode }) => {
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
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
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
          {videoUrl && (
            <Video
              source={{ uri: videoUrl }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
              shouldPlay
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Feather name="x" size={18} color="white" />
          </TouchableOpacity>
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
    backgroundColor: 'rgba(38, 45, 52, 0.6)',
  },
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  modalContainer: {
    width: '90%',
    height: '50%',
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'black',
  },
});

export default VideoModal;
