import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';

const VideoModal = ({ visible, onClose, videoUrl, mot, svgXml }) => {
  const isDefineVideo = videoUrl.includes('define');

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Video
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls
            style={styles.video}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{mot}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={18} color="white" />
            </TouchableOpacity>
          </View>
          {svgXml && (
            <View style={styles.svgContainer}>
              <SvgXml xml={svgXml} width={50} height={50} />
            </View>
          )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '50%',
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',

    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  closeButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'black',
  },
});

export default VideoModal;
