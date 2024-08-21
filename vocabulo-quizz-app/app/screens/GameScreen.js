import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { texts } from '@/constants/texts';
import { lightTheme } from '@/constants/Colors';

const GameScreen = () => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // Use router to navigate between screens
  const router = useRouter();

  // Handle the press event on a category item
  const handleCategoryPress = (category) => {
    setSelectedCategory(category); // Set the selected category
    setModalVisible(true); // Show the modal with category details
  };

  // Handle navigation to the QuizScreen
  const handleNavigateToQuizScreen = () => {
    if (selectedCategory) {
      setModalVisible(false); // Close the modal
      setTimeout(() => {
        router.push('/quiz'); // Navigate to the Quiz screen after a slight delay
      }, 300);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Render each category as a touchable row */}
      {texts.categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.row}
          onPress={() => handleCategoryPress(category)}
        >
          {/* SVG Icon for the category */}
          <SvgXml xml={category.icon} width={30} height={30} />

          {/* Text Label for the category */}
          <Text style={styles.textLabel}>{category.textLabel}</Text>

          {/* Display the ratio/percentage for the category */}
          <Text style={styles.percentage}>{category.ratio}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal to display category details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Category Details</Text>
            {/* Display the details of the selected category */}
            {selectedCategory && (
              <>
                <Text style={styles.modalText}>Label: {selectedCategory.textLabel}</Text>
                <Text style={styles.modalText}>Difficulty: {selectedCategory.difficulty}</Text>
                <Text style={styles.modalText}>Ratio: {selectedCategory.ratio}</Text>
              </>
            )}
            {/* Button to navigate to the QuizScreen */}
            <Button title="Go to QuizScreen" onPress={handleNavigateToQuizScreen} />
            {/* Button to close the modal */}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100, // Ensure there is some padding at the bottom
  },
  row: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 20, // Add some margin at the bottom of each row
    padding: 10, // Padding inside each row
    backgroundColor: lightTheme.lightShade, // Background color for the row
    width: '90%', // Width of each row
    minHeight: 40, // Minimum height for the row
    justifyContent: 'center', // Center the content horizontally
    alignContent: 'center', // Center the content vertically
    alignSelf: 'center', // Center the row itself
    borderRadius: 10, // Rounded corners for the row
  },
  textLabel: {
    fontSize: 16, // Font size for the text label
    marginLeft: 10, // Margin to the left of the text label
    flex: 1, // Flex to take up remaining space
  },
  percentage: {
    fontSize: 16, // Font size for the percentage text
    color: 'gray', // Text color for the percentage
  },
  modalContainer: {
    flex: 1, // Take up the full screen
    justifyContent: 'center', // Center the modal content vertically
    alignItems: 'center', // Center the modal content horizontally
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%', // Width of the modal content
    backgroundColor: 'white', // Background color for the modal
    padding: 20, // Padding inside the modal content
    borderRadius: 10, // Rounded corners for the modal
    alignItems: 'center', // Center align items inside the modal
  },
  modalTitle: {
    fontSize: 18, // Font size for the modal title
    fontWeight: 'bold', // Bold font for the modal title
    marginBottom: 10, // Margin below the modal title
  },
  modalText: {
    fontSize: 16, // Font size for modal text
    marginBottom: 10, // Margin below each modal text
  },
});

export default GameScreen;
