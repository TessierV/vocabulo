import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import Bubble from '@/components/Effect/Bubble';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CustomModal = ({ visible, title, content, buttonText, onPress }) => {
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
      onRequestClose={onPress}
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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onPress}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#464D8E',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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

export default CustomModal;
