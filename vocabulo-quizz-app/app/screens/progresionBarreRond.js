import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // Import Feather icons for use in the app
import { useRouter } from 'expo-router'; // Import useRouter hook from expo-router
import { SvgXml } from 'react-native-svg'; // Import SvgXml from react-native-svg
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme, color } from '@/constants/Colors';



// Main quiz component
const QuizScreen = () => {
    const [darkMode, toggleDarkMode] = useDarkMode();

  const router = useRouter(); // Initialize router

  // State hooks for managing current question index, score, selected answer, etc.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [score, setScore] = useState(0); // Current score
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Selected answer
  const [disabledAnswers, setDisabledAnswers] = useState([]); // Answers disabled after a wrong selection
  const [incorrectCount, setIncorrectCount] = useState(0); // Count of incorrect answers for the current question
  const [hint, setHint] = useState(''); // Help/Hint message
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [correctFirstAttempt, setCorrectFirstAttempt] = useState(0); // Number of correct answers on the first attempt
  const [correctSecondAttempt, setCorrectSecondAttempt] = useState(0); // Number of correct answers on the second attempt

  // Quiz questions, each question contains text, answers, and hints
  const questions = [
    {
      question: 'What is the capital of France?',
      answers: [
        { text: 'Berlin', correct: false },
        { text: 'Madrid', correct: false },
        { text: 'Paris', correct: true },
        { text: 'Rome', correct: false },
      ],
      hint: 'It is known as the "City of Light."', // Hint for the question
      secondHint: 'It is famous for its Eiffel Tower.', // Second hint to be shown in a popup
    },
    {
      question: 'What is the largest planet in our solar system?',
      answers: [
        { text: 'Earth', correct: false },
        { text: 'Jupiter', correct: true },
        { text: 'Mars', correct: false },
        { text: 'Saturn', correct: false },
      ],
      hint: 'It has the most moons in our solar system.', // Hint for the question
      secondHint: 'It is a gas giant with a prominent red spot.', // Second hint to be shown in a popup
    },
    {
      question: 'What is the chemical symbol for gold?',
      answers: [
        { text: 'Au', correct: true },
        { text: 'Ag', correct: false },
        { text: 'Pb', correct: false },
        { text: 'Fe', correct: false },
      ],
      hint: 'Its symbol comes from the Latin word "aurum."', // Hint for the question
      secondHint: 'It is a precious yellow metal.', // Second hint to be shown in a popup
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answers: [
        { text: 'Venus', correct: false },
        { text: 'Mars', correct: true },
        { text: 'Mercury', correct: false },
        { text: 'Jupiter', correct: false },
      ],
      hint: 'This planet is named after the Roman god of war.', // Hint for the question
      secondHint: 'It is the fourth planet from the Sun.', // Second hint to be shown in a popup
    },

  ];

  // Function to handle answer selection
  const handleAnswerSelection = (answer) => {
    if (!disabledAnswers.includes(answer.text)) {
      setSelectedAnswer(answer); // Set the selected answer if it is not disabled
    }
  };

  // Function to validate the selected answer
  const validateAnswer = () => {
    if (selectedAnswer) {
      if (selectedAnswer.correct) {
        setScore((prevScore) => prevScore + 1); // Increase score for correct answer
        if (incorrectCount === 0) {
          setCorrectFirstAttempt((prev) => prev + 1); // Increase count for correct first attempt
        } else {
          setCorrectSecondAttempt((prev) => prev + 1); // Increase count for correct second attempt
        }
        moveToNextQuestion(); // Move to the next question
      } else {
        setDisabledAnswers((prev) => [...prev, selectedAnswer.text]); // Disable the selected incorrect answer
        setIncorrectCount(incorrectCount + 1); // Increment the incorrect answer count
        setSelectedAnswer(null); // Reset the selected answer

        // Show the first hint if two incorrect answers have been selected
        if (incorrectCount + 1 === 2) {
          setHint(questions[currentQuestionIndex]?.hint || '');
        }

        // Show the second hint in a popup after three incorrect answers
        if (incorrectCount + 1 === 3) {
          Alert.alert('Second Hint', questions[currentQuestionIndex]?.secondHint || '');
        }
      }
    } else {
      Alert.alert('Warning', 'Please select an answer before validating.'); // Alert if no answer is selected
    }
  };

  // Function to move to the next question or finish the quiz
  const moveToNextQuestion = () => {
    setSelectedAnswer(null); // Reset selected answer
    setDisabledAnswers([]); // Reset disabled answers
    setIncorrectCount(0); // Reset incorrect answer count
    setHint(''); // Reset hint

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      // Show the modal with results before navigating
      setShowModal(true);
    }
  };

  // Function to handle modal close and navigate to the Home screen
  const handleModalClose = () => {
    router.push({
      pathname: '/game',
      params: { finalScore: score, totalQuestions: questions.length },
    });
    setShowModal(false); // Close the modal
    setCurrentQuestionIndex(0); // Reset to the first question
    setScore(0); // Reset score
    setCorrectFirstAttempt(0); // Reset correct first attempt count
    setCorrectSecondAttempt(0); // Reset correct second attempt count
  };

  // Function to determine the icon for each answer button
  const getIcon = (answer) => {
    if (disabledAnswers.includes(answer.text)) {
      return 'x-circle'; // Cross icon for incorrect answer
    } else if (selectedAnswer?.text === answer.text) {
      return 'check-circle'; // Check icon for the selected answer
    } else {
      return 'circle'; // Default icon for other answers
    }
  };

  // Function to get the label (A, B, C, D) for each answer
  const getLabel = (index) => {
    return String.fromCharCode(65 + index) + '. '; // Returns A., B., C., D., etc.
  };

  // Destructure the current question and its answers
  const currentQuestion = questions[currentQuestionIndex] || {};
  const { question, answers } = currentQuestion;

  // Calculate the progress percentage
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // SVG XML for circular progress with gradient
  const radius = 60; // Adjust radius to make the circle smaller
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const svgXml = `
  <svg width="130" height="130" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color.lightGreen};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${color.lightBlue};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color.lightPlum};stop-opacity:1" />
      </linearGradient>
    </defs>
    <circle cx="65" cy="65" r="60" stroke="#ddd" stroke-width="10" fill="none" />
    <circle cx="65" cy="65" r="60" stroke="url(#progress-gradient)" stroke-width="10" fill="none" stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" transform="rotate(-90 65 65)" />
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="18" fill="black">
      ${currentQuestionIndex + 1}/${questions.length}
    </text>
  </svg>
`;

  return (
    <>
    <View style={styles.container}>


      {/* Display the circular progress bar */}
      <View style={styles.progressContainer}>
        <SvgXml xml={svgXml} width="130" height="130" />
      </View>

      <Text style={styles.question}>{question}</Text>
      {answers?.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer?.text === answer.text && styles.selectedAnswerButton, // Black border if selected
            disabledAnswers.includes(answer.text) && styles.disabledAnswerButton, // Disabled style if incorrect
          ]}
          onPress={() => handleAnswerSelection(answer)}
          disabled={disabledAnswers.includes(answer.text)} // Disable if answer is incorrect
        >
          <Text style={styles.answerLabel}>{getLabel(index)}</Text>
          <Text style={styles.answerText}>{answer.text}</Text>
          <Feather name={getIcon(answer)} size={20} style={styles.icon} />
        </TouchableOpacity>
      ))}

      {/* Display hint if available */}
      {hint ? <Text style={styles.hintText}>Hint: {hint}</Text> : null}

      <TouchableOpacity style={styles.validateButton} onPress={validateAnswer}>
        <Text style={styles.validateButtonText}>Validate Answer</Text>
      </TouchableOpacity>

      {/* Modal for displaying the congratulations message */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={handleModalClose} // Close modal when back button is pressed
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalText}>You answered {correctFirstAttempt} questions correctly on the first attempt.</Text>
            <Text style={styles.modalText}>You answered {correctSecondAttempt} questions correctly on the second attempt.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
};

// Styles for the quiz screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  progressContainer: {
    marginBottom: 20,
    alignItems: 'center',
    width: 130,
    height: 130,
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  answerButton: {
    flexDirection: 'row', // Horizontal alignment
    alignItems: 'center',
    justifyContent: 'space-between', // Space between label, text, and icon
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedAnswerButton: {
    borderColor: color.darkBlue, // Black border if selected
  },
  disabledAnswerButton: {
    backgroundColor: color.lightCoral, // Red background if incorrect and disabled
    borderColor: color.darkCoral, // Red border if incorrect
  },
  answerLabel: {
    fontSize: 18,
    marginRight: 10, // Space between label and answer text
  },
  answerText: {
    fontSize: 18,
    flex: 1, // Occupy remaining space
  },
  validateButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    marginLeft: 10, // Space between answer text and icon
  },
  hintText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuizScreen;
