import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import axios from 'axios';
import uuid from 'react-native-uuid'; // Import react-native-uuid
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing quiz data
import Header from '@/components/Header/Header';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import AppSvgLogo from '@/SVG/AppSvgLogo';
import { GradientBorderButton } from '@/components/Button';
import Bubble from '@/components/Effect/Bubble';

import useDarkMode from '@/components/useDarkMode';
import SectionTitle from '@/components/SectionTitle';
import { Feather } from '@expo/vector-icons';
import { BigTitle, ContainerParagraph, Paragraph } from '@/constants/StyledText';
import RadarEffect from '@/components/RadarEffect';

import BigSlider from '@/components/Slider/BigSlider';
import ReusableCard from '@/components/Slider/ReusableCard';

export default function AIScreen() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(3);
  const [iaquizId, setIaquizId] = useState(null); // Store iaquiz_id in the state
  const [expirationTime, setExpirationTime] = useState(null); // Store expiration time
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://192.168.1.15:8000/get_recommendations', {
          user_id: '001b6789-96de-448c-9ede-5c787514be27',
        });
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setErrorMessage('Error fetching recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Function to generate questions and iaquiz_id
  const generateQuestions = (numQuestions) => {
    const questions = [];
    const usedWords = new Set(); // To keep track of correct words

    const getRandomWord = () => {
      let randomWord;
      do {
        randomWord = recommendations[Math.floor(Math.random() * recommendations.length)];
      } while (usedWords.has(randomWord));
      usedWords.add(randomWord);
      return randomWord;
    };

    while (questions.length < numQuestions) {
      if (recommendations.length < numQuestions * 2) {
        Alert.alert('Erreur', 'Pas assez de mots pour générer des questions.');
        return;
      }

      const correctWord = getRandomWord();
      const correctWordIndex = recommendations.indexOf(correctWord);

      const incorrectWords = [];
      while (incorrectWords.length < 3) {
        const randomIndex = Math.floor(Math.random() * recommendations.length);
        const word = recommendations[randomIndex];
        if (
          randomIndex !== correctWordIndex &&
          !incorrectWords.includes(word) &&
          !usedWords.has(word)
        ) {
          incorrectWords.push(word);
        }
      }

      questions.push({
        correctWord,
        incorrectWords,
      });
    }

    const newIaquizId = uuid.v4(); // Generate a new iaquiz_id using react-native-uuid
    setIaquizId(newIaquizId); // Store it in the state

    const newExpirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours expiration
    setExpirationTime(newExpirationTime); // Set expiration time

    setGeneratedQuestions(questions);
    setModalVisible(true); // Show modal with generated questions
  };

  const getRadarColors = () => {
    return [color.lightPlum, color.neutralPlum, color.darkPlum];
  };



  // Function to handle navigation to IAQuizPage with generated UUID4
  const navigateToQuiz = async () => {
    // Store the quiz data in AsyncStorage with a time limit of 24 hours
    await AsyncStorage.setItem(
      `iaquiz_${iaquizId}`,
      JSON.stringify({ questions: generatedQuestions, expirationTime })
    );

    // Navigate to the IAQuizPage with iaquiz_id
    navigation.navigate('iaquizpage/[iaquiz_id]', {
      iaquiz_id: iaquizId, // Pass the iaquiz_id as a param
    });

    // Close the modal
    setModalVisible(false);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <Header darkMode={darkMode} PageTitle="HybridRec" firstLink="home" secondLink="/profil" />
      <BigSlider
        data={[
          {
            key: '1', component:
              <ReusableCard
                title="HybridRec"
                description="Bienvenue sur la page du Quiz IA personnalisé. Grâce à l'intelligence artificielle, chaque quiz est adapté à ton niveau et à tes préférences d'apprentissage."
                buttonText="Commencer"
                onPressButton={() => console.log('Bouton pressé')}
                darkMode={darkMode}
                containerBgColor={color.darkPlum}
                iconBgColor={darkTheme.darkShade}
                useSvg={true}
                customSvg={`<svg id="Flat" height="512" viewBox="0 0 340 340" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m57.392 29.762s96.705 3.895 109.777 85.967l-102.245-47.788a76.418 76.418 0 0 0 -7.532-38.179z" fill="#ccd4ea"/><path d="m41.929 157.4-5.874-7.393s33.881-32.21 131.1-9.284c0 0 87.741-29.784 128.477 11.823l-5.162 9.777z" fill="#ea8744"/><path d="m165.906 112.155s-1.389-40.368 58.56-69.622c19.847-9.686 30.516-19.222 35.908-29.254 0 0 13.311 33.7-10.249 59.466z" fill="#ccd4ea"/><path d="m163.885 117.752s7.2-29.266 41.352-40.23 73.346-14.229 83.843-28.222c0 0 2.333 38.256-27.058 47.353l-90.974 25.029z" fill="#aeb7d3"/><path d="m170 117.752s-24.807-61.493-125.334-54.486c0 0 9.869 14.544 9.61 36.361z" fill="#aeb7d3"/><path d="m293.811 104.245a9.1 9.1 0 0 0 -7.223-7.206c-17.752-3.386-72.105-10.383-119.419 18.69-47.315-29.073-101.669-22.076-119.42-18.69a9.1 9.1 0 0 0 -7.223 7.206c-.627 3.241-1.117 6.388-1.5 9.377a17.063 17.063 0 0 1 -.69 6.511 137.146 137.146 0 0 0 -.426 18.894c63.372-20.076 129.256 0 129.256 0s65.883-20.076 129.255 0a134.164 134.164 0 0 0 -.293-17.221 11.243 11.243 0 0 1 -.635-6.64c-.399-3.443-.946-7.117-1.682-10.921z" fill="#dfe6ef"/><path d="m296.13 121.806c-.155-2.087-.363-4.311-.636-6.64a158.992 158.992 0 0 0 -90.131-5.628 152.005 152.005 0 0 0 -35.212 12.6v-9.491l-6-.021v9.739c-36.015-17.3-71.453-17.653-95.237-14.765a193.812 193.812 0 0 0 -29.883 6.023c-.288 2.269-.515 4.448-.69 6.51 22.868-6.849 74.349-17 125.81 8.923v9.131l6 .009v-9.24a143 143 0 0 1 36.787-13.623 153.049 153.049 0 0 1 89.192 6.473z" fill="#aeb7d3"/><path d="m260.388 289.854c1.3-13.347 9.764-18.844 9.764-18.844h-225.438a22.345 22.345 0 0 0 -22.345 22.345 22.345 22.345 0 0 0 22.345 22.345h225.438s-8.5-5.1-9.773-18.845a11.651 11.651 0 0 1 .009-7.001z" fill="#dfe6ef"/><path d="m301.667 259.988h-221.192a52.447 52.447 0 0 0 7.812-13.725 8.812 8.812 0 0 0 1.927-7 39.156 39.156 0 0 0 -.082-14.23 12.126 12.126 0 0 0 -1.9-7 63.273 63.273 0 0 0 -7.753-14.711h221.188a28.333 28.333 0 0 1 28.333 28.333 28.333 28.333 0 0 1 -28.333 28.333z" fill="#ffe7c7"/><path d="m298.739 136.5c-10.8-6.219-31.723-14.825-64.828-14.825-33.921 0-55.205 8.294-63.178 12.1a8.3 8.3 0 0 1 -7.129 0c-7.973-3.8-29.256-12.095-63.177-12.095-33.106 0-54.031 8.606-64.829 14.825a9.675 9.675 0 0 0 -2.974 14.242l4.237 5.629s16.871-19.294 63.81-19.294c33.267 0 52.78 7.767 61.326 12.292a11.034 11.034 0 0 0 10.343 0c8.546-4.525 28.06-12.292 61.326-12.292 46.939 0 62.9 20.318 62.9 20.318l5.145-6.653a9.675 9.675 0 0 0 -2.972-14.247z" fill="#ffb655"/><g fill="#e5ba93"><path d="m294.2 225.033h-53.114a3.5 3.5 0 0 1 0-7h53.114a3.5 3.5 0 0 1 0 7z"/><path d="m219.857 218.033h-131.63a45.882 45.882 0 0 1 1.9 7h129.73a3.5 3.5 0 0 0 0-7z"/><path d="m294.2 239.262h-203.99a40.746 40.746 0 0 1 -1.926 7h205.916a3.5 3.5 0 0 0 0-7z"/></g><path d="m260.4 289.855h-208.1a3.5 3.5 0 1 0 0 7h208.085c-.1-1.112-.164-3.5-.164-3.5 0-1.225.065-2.387.179-3.5z" fill="#aebed1"/><path d="m287.152 203.322h-33.713a32.631 32.631 0 0 0 -18.619 0h-121.7c-5.724-1.845-13.291-2.112-18.619 0h-49.147a11.585 11.585 0 0 1 -11.586-11.585v-29.181a10.011 10.011 0 0 1 10.011-10.011h50.721a33.038 33.038 0 0 0 18.619 0h121.7a27.9 27.9 0 0 0 18.619 0h35.066a10.232 10.232 0 0 1 10.232 10.232v28.96a11.585 11.585 0 0 1 -11.584 11.585z" fill="#c9656a"/><path d="m94.503 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m234.82 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m45.384 311.561a18.207 18.207 0 0 1 -18.207-18.206 18.208 18.208 0 0 1 18.207-18.207h233.716a11.365 11.365 0 0 0 11.366-11.365v-3.8h-247.099a33.367 33.367 0 0 0 -33.367 33.372 33.366 33.366 0 0 0 33.367 33.366h247.1v-3.794a11.366 11.366 0 0 0 -11.367-11.366z" fill="#5d80c6"/></svg>`}
              />
          },
          {
            key: '2', component:
              <ReusableCard
                title="Nouveaux Défis"
                description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
                buttonText="Découvrir"
                onPressButton={() => console.log('Nouveaux Défis Découvrir')}
                containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
                iconBgColor={darkMode ? darkTheme.darkShade : color.darkBlue}
                darkMode={darkMode}
                useSvg={true}
                customSvg={`<svg id="Flat" height="512" viewBox="0 0 340 340" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m57.392 29.762s96.705 3.895 109.777 85.967l-102.245-47.788a76.418 76.418 0 0 0 -7.532-38.179z" fill="#ccd4ea"/><path d="m41.929 157.4-5.874-7.393s33.881-32.21 131.1-9.284c0 0 87.741-29.784 128.477 11.823l-5.162 9.777z" fill="#ea8744"/><path d="m165.906 112.155s-1.389-40.368 58.56-69.622c19.847-9.686 30.516-19.222 35.908-29.254 0 0 13.311 33.7-10.249 59.466z" fill="#ccd4ea"/><path d="m163.885 117.752s7.2-29.266 41.352-40.23 73.346-14.229 83.843-28.222c0 0 2.333 38.256-27.058 47.353l-90.974 25.029z" fill="#aeb7d3"/><path d="m170 117.752s-24.807-61.493-125.334-54.486c0 0 9.869 14.544 9.61 36.361z" fill="#aeb7d3"/><path d="m293.811 104.245a9.1 9.1 0 0 0 -7.223-7.206c-17.752-3.386-72.105-10.383-119.419 18.69-47.315-29.073-101.669-22.076-119.42-18.69a9.1 9.1 0 0 0 -7.223 7.206c-.627 3.241-1.117 6.388-1.5 9.377a17.063 17.063 0 0 1 -.69 6.511 137.146 137.146 0 0 0 -.426 18.894c63.372-20.076 129.256 0 129.256 0s65.883-20.076 129.255 0a134.164 134.164 0 0 0 -.293-17.221 11.243 11.243 0 0 1 -.635-6.64c-.399-3.443-.946-7.117-1.682-10.921z" fill="#dfe6ef"/><path d="m296.13 121.806c-.155-2.087-.363-4.311-.636-6.64a158.992 158.992 0 0 0 -90.131-5.628 152.005 152.005 0 0 0 -35.212 12.6v-9.491l-6-.021v9.739c-36.015-17.3-71.453-17.653-95.237-14.765a193.812 193.812 0 0 0 -29.883 6.023c-.288 2.269-.515 4.448-.69 6.51 22.868-6.849 74.349-17 125.81 8.923v9.131l6 .009v-9.24a143 143 0 0 1 36.787-13.623 153.049 153.049 0 0 1 89.192 6.473z" fill="#aeb7d3"/><path d="m260.388 289.854c1.3-13.347 9.764-18.844 9.764-18.844h-225.438a22.345 22.345 0 0 0 -22.345 22.345 22.345 22.345 0 0 0 22.345 22.345h225.438s-8.5-5.1-9.773-18.845a11.651 11.651 0 0 1 .009-7.001z" fill="#dfe6ef"/><path d="m301.667 259.988h-221.192a52.447 52.447 0 0 0 7.812-13.725 8.812 8.812 0 0 0 1.927-7 39.156 39.156 0 0 0 -.082-14.23 12.126 12.126 0 0 0 -1.9-7 63.273 63.273 0 0 0 -7.753-14.711h221.188a28.333 28.333 0 0 1 28.333 28.333 28.333 28.333 0 0 1 -28.333 28.333z" fill="#ffe7c7"/><path d="m298.739 136.5c-10.8-6.219-31.723-14.825-64.828-14.825-33.921 0-55.205 8.294-63.178 12.1a8.3 8.3 0 0 1 -7.129 0c-7.973-3.8-29.256-12.095-63.177-12.095-33.106 0-54.031 8.606-64.829 14.825a9.675 9.675 0 0 0 -2.974 14.242l4.237 5.629s16.871-19.294 63.81-19.294c33.267 0 52.78 7.767 61.326 12.292a11.034 11.034 0 0 0 10.343 0c8.546-4.525 28.06-12.292 61.326-12.292 46.939 0 62.9 20.318 62.9 20.318l5.145-6.653a9.675 9.675 0 0 0 -2.972-14.247z" fill="#ffb655"/><g fill="#e5ba93"><path d="m294.2 225.033h-53.114a3.5 3.5 0 0 1 0-7h53.114a3.5 3.5 0 0 1 0 7z"/><path d="m219.857 218.033h-131.63a45.882 45.882 0 0 1 1.9 7h129.73a3.5 3.5 0 0 0 0-7z"/><path d="m294.2 239.262h-203.99a40.746 40.746 0 0 1 -1.926 7h205.916a3.5 3.5 0 0 0 0-7z"/></g><path d="m260.4 289.855h-208.1a3.5 3.5 0 1 0 0 7h208.085c-.1-1.112-.164-3.5-.164-3.5 0-1.225.065-2.387.179-3.5z" fill="#aebed1"/><path d="m287.152 203.322h-33.713a32.631 32.631 0 0 0 -18.619 0h-121.7c-5.724-1.845-13.291-2.112-18.619 0h-49.147a11.585 11.585 0 0 1 -11.586-11.585v-29.181a10.011 10.011 0 0 1 10.011-10.011h50.721a33.038 33.038 0 0 0 18.619 0h121.7a27.9 27.9 0 0 0 18.619 0h35.066a10.232 10.232 0 0 1 10.232 10.232v28.96a11.585 11.585 0 0 1 -11.584 11.585z" fill="#c9656a"/><path d="m94.503 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m234.82 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m45.384 311.561a18.207 18.207 0 0 1 -18.207-18.206 18.208 18.208 0 0 1 18.207-18.207h233.716a11.365 11.365 0 0 0 11.366-11.365v-3.8h-247.099a33.367 33.367 0 0 0 -33.367 33.372 33.366 33.366 0 0 0 33.367 33.366h247.1v-3.794a11.366 11.366 0 0 0 -11.367-11.366z" fill="#5d80c6"/></svg>`}

              />
          },
          {
            key: '3', component: <ReusableCard
              title="Nouveaux Défis"
              description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
              buttonText="Découvrir"
              onPressButton={() => console.log('Nouveaux Défis Découvrir')}
              containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
              iconBgColor={darkMode ? darkTheme.darkShade : color.darkBlue}
              darkMode={darkMode}
              useSvg={true}
              customSvg={`<svg id="Flat" height="512" viewBox="0 0 340 340" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m57.392 29.762s96.705 3.895 109.777 85.967l-102.245-47.788a76.418 76.418 0 0 0 -7.532-38.179z" fill="#ccd4ea"/><path d="m41.929 157.4-5.874-7.393s33.881-32.21 131.1-9.284c0 0 87.741-29.784 128.477 11.823l-5.162 9.777z" fill="#ea8744"/><path d="m165.906 112.155s-1.389-40.368 58.56-69.622c19.847-9.686 30.516-19.222 35.908-29.254 0 0 13.311 33.7-10.249 59.466z" fill="#ccd4ea"/><path d="m163.885 117.752s7.2-29.266 41.352-40.23 73.346-14.229 83.843-28.222c0 0 2.333 38.256-27.058 47.353l-90.974 25.029z" fill="#aeb7d3"/><path d="m170 117.752s-24.807-61.493-125.334-54.486c0 0 9.869 14.544 9.61 36.361z" fill="#aeb7d3"/><path d="m293.811 104.245a9.1 9.1 0 0 0 -7.223-7.206c-17.752-3.386-72.105-10.383-119.419 18.69-47.315-29.073-101.669-22.076-119.42-18.69a9.1 9.1 0 0 0 -7.223 7.206c-.627 3.241-1.117 6.388-1.5 9.377a17.063 17.063 0 0 1 -.69 6.511 137.146 137.146 0 0 0 -.426 18.894c63.372-20.076 129.256 0 129.256 0s65.883-20.076 129.255 0a134.164 134.164 0 0 0 -.293-17.221 11.243 11.243 0 0 1 -.635-6.64c-.399-3.443-.946-7.117-1.682-10.921z" fill="#dfe6ef"/><path d="m296.13 121.806c-.155-2.087-.363-4.311-.636-6.64a158.992 158.992 0 0 0 -90.131-5.628 152.005 152.005 0 0 0 -35.212 12.6v-9.491l-6-.021v9.739c-36.015-17.3-71.453-17.653-95.237-14.765a193.812 193.812 0 0 0 -29.883 6.023c-.288 2.269-.515 4.448-.69 6.51 22.868-6.849 74.349-17 125.81 8.923v9.131l6 .009v-9.24a143 143 0 0 1 36.787-13.623 153.049 153.049 0 0 1 89.192 6.473z" fill="#aeb7d3"/><path d="m260.388 289.854c1.3-13.347 9.764-18.844 9.764-18.844h-225.438a22.345 22.345 0 0 0 -22.345 22.345 22.345 22.345 0 0 0 22.345 22.345h225.438s-8.5-5.1-9.773-18.845a11.651 11.651 0 0 1 .009-7.001z" fill="#dfe6ef"/><path d="m301.667 259.988h-221.192a52.447 52.447 0 0 0 7.812-13.725 8.812 8.812 0 0 0 1.927-7 39.156 39.156 0 0 0 -.082-14.23 12.126 12.126 0 0 0 -1.9-7 63.273 63.273 0 0 0 -7.753-14.711h221.188a28.333 28.333 0 0 1 28.333 28.333 28.333 28.333 0 0 1 -28.333 28.333z" fill="#ffe7c7"/><path d="m298.739 136.5c-10.8-6.219-31.723-14.825-64.828-14.825-33.921 0-55.205 8.294-63.178 12.1a8.3 8.3 0 0 1 -7.129 0c-7.973-3.8-29.256-12.095-63.177-12.095-33.106 0-54.031 8.606-64.829 14.825a9.675 9.675 0 0 0 -2.974 14.242l4.237 5.629s16.871-19.294 63.81-19.294c33.267 0 52.78 7.767 61.326 12.292a11.034 11.034 0 0 0 10.343 0c8.546-4.525 28.06-12.292 61.326-12.292 46.939 0 62.9 20.318 62.9 20.318l5.145-6.653a9.675 9.675 0 0 0 -2.972-14.247z" fill="#ffb655"/><g fill="#e5ba93"><path d="m294.2 225.033h-53.114a3.5 3.5 0 0 1 0-7h53.114a3.5 3.5 0 0 1 0 7z"/><path d="m219.857 218.033h-131.63a45.882 45.882 0 0 1 1.9 7h129.73a3.5 3.5 0 0 0 0-7z"/><path d="m294.2 239.262h-203.99a40.746 40.746 0 0 1 -1.926 7h205.916a3.5 3.5 0 0 0 0-7z"/></g><path d="m260.4 289.855h-208.1a3.5 3.5 0 1 0 0 7h208.085c-.1-1.112-.164-3.5-.164-3.5 0-1.225.065-2.387.179-3.5z" fill="#aebed1"/><path d="m287.152 203.322h-33.713a32.631 32.631 0 0 0 -18.619 0h-121.7c-5.724-1.845-13.291-2.112-18.619 0h-49.147a11.585 11.585 0 0 1 -11.586-11.585v-29.181a10.011 10.011 0 0 1 10.011-10.011h50.721a33.038 33.038 0 0 0 18.619 0h121.7a27.9 27.9 0 0 0 18.619 0h35.066a10.232 10.232 0 0 1 10.232 10.232v28.96a11.585 11.585 0 0 1 -11.584 11.585z" fill="#c9656a"/><path d="m94.503 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m234.82 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m45.384 311.561a18.207 18.207 0 0 1 -18.207-18.206 18.208 18.208 0 0 1 18.207-18.207h233.716a11.365 11.365 0 0 0 11.366-11.365v-3.8h-247.099a33.367 33.367 0 0 0 -33.367 33.372 33.366 33.366 0 0 0 33.367 33.366h247.1v-3.794a11.366 11.366 0 0 0 -11.367-11.366z" fill="#5d80c6"/></svg>`}

            />
          },
        ]}
        darkMode={darkMode}
      />
      <View style={styles.container}>

        {/* Buttons to generate 1, 3, or 5 questions */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.dark_lightShade }]}
            onPress={() => generateQuestions(1)}
          >
            <Text style={[styles.buttonText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>Questions</Text>
            <Text style={styles.buttonQuestionNumber}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.dark_lightShade }]}
            onPress={() => generateQuestions(3)}
          >
            <Text style={[styles.buttonText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>Questions</Text>
            <Text style={styles.buttonQuestionNumber}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.dark_lightShade }]}
            onPress={() => generateQuestions(5)}
          >
            <Text style={[styles.buttonText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>Questions</Text>
            <Text style={styles.buttonQuestionNumber}>5</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.buttonSave, { backgroundColor: darkMode ? '#555' : darkTheme.darkShade }]}
          onPress={async () => {
            const savedProgress = await AsyncStorage.getItem(`iaquiz_progress_${iaquizId}`);
            if (savedProgress) {
              navigation.navigate('iaquizpage/[iaquiz_id]', {
                iaquiz_id: iaquizId,
              });
            } else {
              Alert.alert('No saved progress', 'You have no saved progress for this quiz.');
            }
          }}
        >
          <Text style={styles.buttonText}>Reprendre le quiz</Text>
          {expirationTime && (
            <Text style={styles.expirationTime}>Expire à: {new Date(expirationTime).toLocaleString()}</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide"
        transparent={true}
      >
        <View style={styles.bubbleContainer}>
        <Bubble size={30} color={color.lightPlum} duration={5000} delay={0} opacity={0.3} />
        <Bubble size={50} color={color.neutralPlum} duration={7000} delay={1000} opacity={0.2} />
        <Bubble size={40} color={color.darkPlum} duration={6000} delay={500} opacity={0.25} />
      </View>
        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.recapContainer}>
              <BigTitle>Récapitulatif</BigTitle>
              <ContainerParagraph style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }}>
                Vous allez commencer avec ce thème:
              </ContainerParagraph>
            </View>
            <ScrollView>
              {generatedQuestions.map((item, index) => (
                <View key={index} style={styles.questionCard}>
                  <Text style={styles.mot}>Correct Word: {item.correctWord.mot}</Text>
                  <Text>Category: {item.correctWord.category}</Text>
                  <Text>Subcategory: {item.correctWord.subcategory}</Text>
                  <TouchableOpacity onPress={() => console.log('Play sign video', item.correctWord.url_sign)}>
                    <Text style={styles.link}>Play Correct Sign Video</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('Play definition video', item.correctWord.url_def)}>
                    <Text style={styles.link}>Play Correct Definition Video</Text>
                  </TouchableOpacity>

                  <Text style={styles.mot}>Incorrect Words:</Text>
                  {item.incorrectWords.map((word, i) => (
                    <View key={i}>
                      <Text style={styles.incorrectWord}>Mot: {word.mot}</Text>
                      <Text>Category: {word.category}</Text>
                      <Text>Subcategory: {word.subcategory}</Text>
                      <TouchableOpacity onPress={() => console.log('Play sign video', word.url_sign)}>
                        <Text style={styles.link}>Play Incorrect Sign Video</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log('Play definition video', word.url_def)}>
                        <Text style={styles.link}>Play Incorrect Definition Video</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>

            <GradientBorderButton
              background={darkMode ? 'dark' : 'light'}
              textColor={darkMode ? 'light' : 'dark'}
              onPress={navigateToQuiz}
              text="Commencer"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: lightTheme.dark_lightShade,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    width: '90%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '30%',
    minHeight: 100,
    flexWrap: 'wrap',
    padding: 1,
    backgroundColor: '#007bff',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.neutral,
  },
  buttonSave: {
    width: '100%',
    bottom: 20,
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonQuestionNumber: {
    fontSize: 30,
    color: lightTheme.darkShade,
    fontWeight: 'bold',
  },
  buttonText: {
    color: lightTheme.lightShade,
    fontSize: 12,
  },
  expirationTime: {
    marginTop: 5,
    color: lightTheme.light_darkShade,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  modalContent: {
    position: 'relative',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '90%',
    backgroundColor: lightTheme.dark_lightShade,
  },
  recapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  mot: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incorrectWord: {
    color: '#ff4d4d',
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  startQuizButton: {
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 8,
    marginTop: 20,
  },
  startQuizButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
