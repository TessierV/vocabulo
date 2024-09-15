import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';

interface VideoModalProps {
  visible: boolean;
  url: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ visible, url, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Video
            source={{ uri: url }}
            resizeMode={ResizeMode.COVER}
            shouldPlay={true}
            isLooping={true}
            style={styles.video}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <EvilIcons name="close" style={styles.closeIcon} />
          </TouchableOpacity>
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
    paddingVertical: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 3,
    backgroundColor: Colors.whiteTransparent,
    borderRadius: 20,
  },
  closeIcon: {
    fontSize: 25,
    color: Colors.black,
  },
  video: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
});

export default VideoModal;
