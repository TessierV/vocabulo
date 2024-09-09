import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Video } from 'expo-av'; // Import Video component from expo-av
import { Feather } from '@expo/vector-icons';
import { lightTheme, color, darkTheme } from '@/constants/Colors';
import { Paragraph, Subtitle } from '@/constants/StyledText';
import SearchAndKeyboard from '@/components/Dictionary/SearchAndKeyboard';
import WordSuggestionsDisplay from '@/components/Dictionary/WordSuggestionsDisplay';
import VideoModal from '@/components/Dictionary/VideoModal';
import Header from '@/components/Header/Header';
import { SvgXml } from 'react-native-svg';
import Slider from '@/components/Slider/Slider';
import ReusableCard from '@/components/Game/ReusableCard';
import useDarkMode from '@/components/useDarkMode';

// SVG for a simple circle
const DefineSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M54.172 12.209a6.052 6.052 0 0 0-4.391-1.693c-6.9.229-12.515 1.729-16.7 4.461a1.98 1.98 0 0 1-2.164 0c-4.182-2.731-9.8-4.231-16.7-4.46a6.024 6.024 0 0 0-4.39 1.693A5.948 5.948 0 0 0 8 16.519v26.053a5.957 5.957 0 0 0 5.776 5.991c6.1.2 11.176 1.55 15.091 4.023a5.907 5.907 0 0 0 6.268 0c3.913-2.473 8.99-3.826 15.089-4.023A5.957 5.957 0 0 0 56 42.572V16.519a5.948 5.948 0 0 0-1.828-4.31zM13.905 44.564A2 2 0 0 1 12 42.572V16.519a1.985 1.985 0 0 1 .61-1.436 2.011 2.011 0 0 1 1.408-.57h.068c6.156.2 11.083 1.487 14.644 3.811a5.916 5.916 0 0 0 1.27.613v29.689a34.536 34.536 0 0 0-16.095-4.062zM52 42.572a2 2 0 0 1-1.9 1.992A34.521 34.521 0 0 0 34 48.627V18.938a5.963 5.963 0 0 0 1.27-.613c3.561-2.324 8.488-3.607 14.643-3.811a1.965 1.965 0 0 1 1.477.569 1.985 1.985 0 0 1 .61 1.436z" fill="${color.neutralBlue}" opacity="1" data-original="${color.neutralBlue}"></path></g></svg>`;
const signSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="${color.lightPlum}" d="M13 2c-1.645 0-3 1.355-3 3v11.813l-.656-.688-.25-.219a2.968 2.968 0 0 0-4.188 0 2.968 2.968 0 0 0 0 4.188v.031l8.188 8.094.062.031.031.063a8.307 8.307 0 0 0 5 1.687h1.72a8.17 8.17 0 0 0 8.187-8.188V14c0-1.645-1.356-3-3-3-.426 0-.82.117-1.188.281C23.578 9.981 22.394 9 21 9c-.766 0-1.469.3-2 .781A2.984 2.984 0 0 0 17 9a2.95 2.95 0 0 0-1 .188V5c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v11h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2.094v-2c0-.555.445-1 1-1 .554 0 1 .445 1 1v7.813c0 3.464-2.723 6.187-6.188 6.187h-1.718c-1.465 0-2.731-.523-3.782-1.313l-8.093-8c-.446-.445-.446-.93 0-1.375s.93-.445 1.375 0L12 21.625V5c0-.555.445-1 1-1z" opacity="1" data-original="#000000"></path></g></svg>`;

// Function to fetch words by search term

async function fetchWordsBySearchTerm(searchTerm) {
  try {
    const response = await fetch(`http://192.168.0.12:3000/api/alphabet/search?searchTerm=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la récupération des mots: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du fetch des mots:', error);
    throw error;
  }
}

const DictionaryScreen = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordSuggestions, setWordSuggestions] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [filteredWordCount, setFilteredWordCount] = useState(0);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const delayDebounceFn = setTimeout(() => {
        fetchSuggestionsByLetter(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleNavigateToQuizScreen = () => {
    if (selectedCategory) {
      setModalVisible(false);
      setTimeout(() => {
        router.push('/quiz');
      }, 300);
    }
  };

  const fetchSuggestionsByLetter = async (term) => {
    try {
      const data = await fetchWordsBySearchTerm(term);

      if (!data || !Array.isArray(data.words)) {
        setError('Données inattendues reçues.');
        return;
      }

      if (totalWordCount === 0) {
        setTotalWordCount(data.totalCount);
      }

      const filteredWords = data.words.filter((word) =>
        word.mot.toLowerCase().startsWith(term.toLowerCase())
      );

      setFilteredWordCount(filteredWords.length);
      setWordSuggestions(filteredWords.slice(0, 20));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLetterPress = (letter) => {
    setSearchTerm((prevSearchTerm) => `${prevSearchTerm}${letter}`);
    setWordSuggestions([]);
    setFinalResults([]);
  };

  const handleSearchValidation = () => {
    setLoading(true);
    fetchWordsBySearchTerm(searchTerm)
      .then(data => {
        if (!data || !Array.isArray(data.words)) {
          throw new Error('Données inattendues reçues.');
        }

        setFinalResults(data.words);
        setTotalWordCount(data.totalCount);
        setFilteredWordCount(data.words.length);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openVideoModal = (url) => {
    setVideoUrl(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setVideoUrl('');
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Header darkMode={darkMode} title="Game" firstLink="/home" secondLink="none" />
      <ScrollView >

        <Slider
          data={[
            {
              key: '1', component:

                <ReusableCard
                  title="Dictionnaire"
                  description="Plongez dans un monde de mots essentiels, accessibles à tous"
                  buttonText="Commencer"
                  onPressButton={() => console.log('Bouton pressé')}
                  darkMode={darkMode}
                  containerBgColor="#282C52"
                  iconBgColor={darkTheme.darkShade}
                  useSvg={true}
                  customSvg={`<svg id="&#xB808;&#xC774;&#xC5B4;_1" enable-background="new 0 0 256 256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="m217.1 233.7v-32.9l-16 10.6-.9 22.3z" fill="#7f5b42"/><path d="m208.9 211.4h-150.5-9.7l-5.1 7v10.5l6.9 4.7h7.9 141.8c4.8 0 8.7-3.9 8.7-8.7z" fill="#f9ebe1"/><path d="m38.9 222.5v-191.8s-.9-16.7 19.5-16.7v189.1z" fill="#bc9c80"/><path d="m208.8 242h-149.9c-10.5 0-19.5-8-20-18.5-.6-11.2 8.4-20.5 19.4-20.5l158.8-10.6v8.3c0 5.8-4.7 10.5-10.5 10.5h-147.8c-5.9 0-11.1 4.5-11.5 10.4-.4 6.5 4.7 11.9 11.1 11.9h158.8c-.1 4.8-3.8 8.5-8.4 8.5z" fill="#a58268"/><path d="m206.6 203.1h-148.2v-189.1h147.5c6.2 0 11.3 5.1 11.3 11.3v167.2c-.1 5.8-4.8 10.6-10.6 10.6z" fill="#d1b293"/><g fill="#fff8eb"><path d="m83.3 92.9 11.2-33.1c.9-2.5 3.2-4.2 5.9-4.2h4.6c2.7 0 5.1 1.7 5.9 4.2l11.2 33.1c1 3.1-1.2 6.2-4.5 6.2h-1c-2.1 0-3.9-1.3-4.5-3.3l-1.4-4.5c-.3-.9-1.2-1.6-2.2-1.6h-11.7c-1 0-1.9.6-2.2 1.6l-1.4 4.4c-.6 2-2.5 3.3-4.5 3.3h-1c-3.2.2-5.5-3-4.4-6.1zm22.3-10.9c1.1 0 2-1.1 1.6-2.2l-3.3-12.6c-.3-1.2-2-1.2-2.3 0l-3.3 12.6c-.3 1.1.5 2.2 1.6 2.2z"/><path d="m145.8 81.3h-12.3c-2.2 0-3.9-1.8-3.9-3.9 0-2.2 1.8-3.9 3.9-3.9h12.3c2.2 0 3.9 1.8 3.9 3.9 0 2.1-1.7 3.9-3.9 3.9z"/><path d="m157.6 92.1 19.4-26.7c.4-.6 0-1.4-.7-1.4h-15.4c-2.3 0-4.2-1.9-4.2-4.2 0-2.3 1.9-4.2 4.2-4.2h25.6c2.5 0 4.5 2 4.5 4.5 0 .9-.3 1.9-.8 2.6l-19.4 26.7c-.4.6 0 1.4.7 1.4h15.3c2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2h-25.6c-2.5 0-4.5-2-4.5-4.5 0-.9.3-1.8.9-2.6z"/></g><path d="m171.2 182.2h-66.9c-3 0-5.5-2.5-5.5-5.5v-18.2c0-3 2.5-5.5 5.5-5.5h66.9c3 0 5.5 2.5 5.5 5.5v18.2c.1 3-2.4 5.5-5.5 5.5z" fill="#c4a283"/><g fill="#af8a6b"><path d="m150.6 165.7h-40.4c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5h40.4c1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5z"/><path d="m136.6 174.2h-26.3c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5h26.3c1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.2 2.5-2.5 2.5z"/></g></svg>`}
                />
            },
            {
              key: '2', component:
                <ReusableCard
                  title="Palette"
                  description="Changement de palette pour des adaptée aux Daltoniens"
                  buttonText="Commencer"
                  onPressButton={() => console.log('Bouton pressé')}
                  darkMode={darkMode}
                  containerBgColor="#282C52"
                  iconBgColor={darkTheme.darkShade}
                  useSvg={true}
                  customSvg={`<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#AFE164;" d="M155.612,214.308V20.48C93.348,46.995,43.703,97.645,18.468,160.548l137.143,137.143L155.612,214.308	L155.612,214.308z"/><path style="fill:#D7E664;" d="M214.308,155.61L351.452,18.468C321.92,6.582,289.737,0,256,0c-35.657,0-69.577,7.314-100.388,20.48	v193.828L214.308,155.61z"/><path style="fill:#FFAA64;" d="M491.52,155.61H297.692l58.697,58.698l137.143,137.143C505.418,321.92,512,289.737,512,256	C512,220.343,504.686,186.423,491.52,155.61z"/><path style="fill:#FF6469;" d="M356.388,297.692V491.52c62.263-26.515,111.908-77.165,137.143-140.068L356.388,214.308V297.692z"/><path style="fill:#C3B4FA;" d="M297.692,356.388L160.548,493.532C190.08,505.417,222.263,512,256,512	c35.658,0,69.577-7.314,100.388-20.48V297.692L297.692,356.388z"/><path style="fill:#7DD2F0;" d="M214.308,356.388H20.48c26.515,62.263,77.165,111.908,140.068,137.143l137.143-137.143H214.308z"/><path style="fill:#7DE6C3;" d="M155.612,297.692L18.468,160.548C6.582,190.08,0,222.263,0,256c0,35.657,7.314,69.577,20.48,100.388 h193.828L155.612,297.692z"/><path style="fill:#FFE669;" d="M297.692,155.61H491.52C465.005,93.348,414.355,43.702,351.452,18.468L214.308,155.61H297.692z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`}
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
              />
            },
          ]}
          darkMode={darkMode}
        />

        <SearchAndKeyboard
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleLetterPress={handleLetterPress}
          handleSearchValidation={handleSearchValidation}
        />
        <WordSuggestionsDisplay
          wordSuggestions={wordSuggestions}
          openVideoModal={openVideoModal}
        />

        <VideoModal
          videoUrl={videoUrl}
          modalVisible={modalVisible}
          closeModal={closeModal}
        />
      </ScrollView>
    </View>
  );
};

export default DictionaryScreen;