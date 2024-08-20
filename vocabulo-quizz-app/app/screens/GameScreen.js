import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { texts } from '@/constants/texts'; // Assurez-vous que le chemin est correct

const GameScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter(); // Utilisation de useRouter pour la navigation

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleNavigateToQuizScreen = () => {
    // Cette fonction redirige vers QuizScreen après avoir fermé le modal
    if (selectedCategory) {
      setModalVisible(false);
      // Attendez un peu avant de naviguer pour permettre la fermeture du modal
      setTimeout(() => {
        router.push('/quiz'); // Utilisez la route vers QuizScreen
      }, 300); // 300ms devrait suffire pour la transition
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {texts.categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.row}
          onPress={() => handleCategoryPress(category)}
        >
          {/* SVG Icon */}
          <SvgXml xml={category.icon} width={30} height={30} />

          {/* Text Label */}
          <Text style={styles.textLabel}>{category.textLabel}</Text>

          {/* Ratio */}
          <Text style={styles.percentage}>{category.ratio}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal for Category Details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Category Details</Text>
            {selectedCategory && (
              <>
                <Text style={styles.modalText}>Label: {selectedCategory.textLabel}</Text>
                <Text style={styles.modalText}>Difficulty: {selectedCategory.difficulty}</Text>
                <Text style={styles.modalText}>Ratio: {selectedCategory.ratio}</Text>
              </>
            )}
            <Button title="Go to QuizScreen" onPress={handleNavigateToQuizScreen} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'plum',
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  textLabel: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  percentage: {
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default GameScreen;
