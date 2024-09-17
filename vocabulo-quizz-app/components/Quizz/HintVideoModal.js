import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import Bubble from '@/components/Effect/Bubble';



const { width, height } = Dimensions.get('window');

const VideoModal = ({ visible, onClose, videoUrl, hintText, svgXml }) => {
  const bubbles = Array.from({ length: 20 }).map((_, index) => ({
    id: index.toString(),
    size: Math.random() * 30 + 20,
    color: index % 3 === 0
      ? '#464D8E'
      : index % 3 === 1
        ? '#615D99'
        : '#5266B4',
    duration: 15000,
    delay: Math.random() * 10000,
    opacity: 0.5,
  }));

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
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
          {videoUrl ? (
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
          ) : (
            <View style={styles.hintContainer}>
              {svgXml && <SvgXml xml={svgXml} width={50} height={50} />}
              {hintText && <Text style={styles.hintText}>{hintText}</Text>}
            </View>
          )}
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={18} color="white" />
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  hintContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hintText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'black',
  },
});

export default VideoModal;

