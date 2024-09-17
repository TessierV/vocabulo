// This file defines the OCRScannedTextScreen component, which displays and interacts with OCR-scanned text data, including sentence navigation and word definitions.

import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { InformationText, OriginalScannedtext, OriginalScannedtextTitle } from '@/constants/StyledText';
import { Scannedtext } from '@/constants/StyledText';
import DictionaryCard from './DictionaryCard';
import NoScannedText from './NoScannedText';
import LegendModal from './LegendModal';
import { getColorForPOS } from './PosColors';


interface Word {
  word: string;
  lemma: string;
  pos: string;
  function: string;
  definition: string;
  url: string;
  difficulty?: number;
  confidence: number;
}

interface Sentence {
  sentence: string;
  words: Word[];
}

interface ParsedData {
  original_text?: string;
  processed_results?: Sentence[];
}

// Function to clean up the definition text
const cleanDefinition = (definition: string) => {
  let cleanedDefinition = definition.replace(/["]/g, ''); // Remove double quotes
  cleanedDefinition = cleanedDefinition.replace(/;/g, ','); // Replace semicolons with commas
  cleanedDefinition = cleanedDefinition.replace(/\./g, ''); // Remove periods
  cleanedDefinition = cleanedDefinition.replace(/([?!])(\s|$)/g, '$1.$2'); // Add periods after punctuation
  if (cleanedDefinition.length > 0) {
    cleanedDefinition = cleanedDefinition.charAt(0).toUpperCase() + cleanedDefinition.slice(1); // Capitalize the first letter
  }
  if (!cleanedDefinition.endsWith('.')) {
    cleanedDefinition += '.'; // Ensure the definition ends with a period
  }
  return cleanedDefinition;
};

// Function to check if a definition is a placeholder
const isPlaceholderDefinition = (definition: string) => {
  const placeholder = 'Non trouvé dans la BDD';
  return definition.trim() === placeholder;
};

export default function OCRScannedTextScreen() {
  const { ocrData } = useLocalSearchParams(); // Retrieve OCR data from local search parameters
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // State to track the current sentence index
  const [showOriginalText, setShowOriginalText] = useState(false); // State to toggle visibility of original text
  const [selectedWord, setSelectedWord] = useState<Word | null>(null); // State to store the currently selected word
  const [refreshKey, setRefreshKey] = useState<number>(0); // State to trigger refresh

  // Convert the OCR data string to JSON
  const dataString = Array.isArray(ocrData) ? ocrData.join(' ') : ocrData;

  let parsedData: ParsedData = {};
  try {
    parsedData = dataString ? JSON.parse(dataString) : {}; // Parse the JSON data
  } catch (error) {
    console.error('Error parsing JSON data:', error); // Log any parsing errors
  }

  // Function to handle moving to the next sentence
  const handleNextSentence = () => {
    if (parsedData.processed_results && currentSentenceIndex < parsedData.processed_results.length - 1) {
      setSelectedWord(null); // Deselect the current word
      setCurrentSentenceIndex(currentSentenceIndex + 1); // Move to the next sentence
    }
  };

  // Function to handle moving to the previous sentence
  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setSelectedWord(null); // Deselect the current word
      setCurrentSentenceIndex(currentSentenceIndex - 1); // Move to the previous sentence
    }
  };

  const allowedPOS = ['NOUN', 'VERB', 'ADJ', 'ADV']; // List of allowed parts of speech

  // Function to render words with their definitions
  const renderWords = (words: Word[]) => {
    const uniqueWords = new Map<string, Word>();
    words.forEach(wordObj => {
      if (allowedPOS.includes(wordObj.pos) && !isPlaceholderDefinition(wordObj.definition)) {
        uniqueWords.set(wordObj.word, wordObj); // Add unique words to the map
      }
    });

    return (
      <>
        {Array.from(uniqueWords.values()).map((wordObj, index) => (
          <DictionaryCard
            key={`${wordObj.word}-${index}`} // Use a unique key for each card
            word={wordObj.word}
            lemma={wordObj.lemma}
            pos={wordObj.pos}
            func={wordObj.function}
            definition={cleanDefinition(wordObj.definition)} // Clean the definition text
            url={wordObj.url}
            refreshKey={refreshKey}  // Pass the refreshKey to DictionaryCard
          />
        ))}
      </>
    );
  };

  // Function to add spaces around punctuation in the text
  const addSpacesAroundPunctuation = (text: string) => {
    return text
      .replace(/([.,!?;:'"`])(?=\S)/g, '$1 ') // Add space after punctuation if followed by a non-whitespace character
      .replace(/(?<=\S)([.,!?;:'"`])/g, ' $1'); // Add space before punctuation if preceded by a non-whitespace character
  };

  // Function to render a sentence and its words
  const renderSentence = (sentenceObj: Sentence) => {
    const foundWordsWithColors = sentenceObj.words
      .filter(wordObj => allowedPOS.includes(wordObj.pos) && !isPlaceholderDefinition(wordObj.definition))
      .reduce((acc, wordObj) => {
        acc[wordObj.word] = getColorForPOS(wordObj.pos).color; // Get color for each word's part of speech
        return acc;
      }, {} as Record<string, string>);

    const processedSentence = addSpacesAroundPunctuation(sentenceObj.sentence); // Process the sentence text

    return (
      <View key={currentSentenceIndex} style={styles.sentenceAndWordCardContainer}>
        <View style={styles.sentenceContainer}>
          {/* Previous sentence button */}
          <TouchableOpacity onPress={handlePreviousSentence} disabled={currentSentenceIndex === 0}>
            <EvilIcons
              name="arrow-left"
              style={[styles.iconLeft, currentSentenceIndex === 0 && styles.disabledIcon]}
            />
          </TouchableOpacity>
          {/* Render the sentence text with clickable words */}
          <Scannedtext style={styles.sentenceText}>
            {processedSentence.split(' ').map((word, index) => {
              const wordWithoutPunctuation = word.replace(/[.,!?;:'"`]/g, ''); // Remove punctuation for color mapping
              const cardColor = foundWordsWithColors[wordWithoutPunctuation];
              const wordStyle = [
                styles.wordText,
                cardColor ? { backgroundColor: cardColor, marginHorizontal: 2, color: Colors.white } : {}
              ];

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.wordButton}
                  onPress={() => {
                    const selectedWordObj = sentenceObj.words.find(w => w.word === wordWithoutPunctuation);
                    if (selectedWordObj) {
                      setSelectedWord(selectedWordObj); // Set the selected word
                    }
                  }}
                >
                  <Scannedtext style={wordStyle}>{word + ' '}</Scannedtext>
                </TouchableOpacity>
              );
            })}
          </Scannedtext>
          {/* Next sentence button */}
          <TouchableOpacity onPress={handleNextSentence} disabled={parsedData.processed_results && currentSentenceIndex === parsedData.processed_results.length - 1}>
            <EvilIcons
              name="arrow-right"
              style={[styles.iconRight, parsedData.processed_results && currentSentenceIndex === parsedData.processed_results.length - 1 && styles.disabledIcon]}
            />
          </TouchableOpacity>
        </View>
        {/* Render the selected word's definitions */}
        <View style={styles.cardsContainer}>
          {selectedWord && renderWords([selectedWord])}
        </View>
      </View>
    );
  };

  // Refresh automatically every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1);
    }, 10000); // Refresh interval in milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Toggle button for showing original text */}
        {parsedData.original_text && (
          <TouchableOpacity style={styles.originalTextButton} onPress={() => setShowOriginalText(!showOriginalText)}>
            <FontAwesome name={showOriginalText ? "eye" : "eye-slash"} style={styles.originalTextButtonIcon} />
            <InformationText style={styles.originalTextButtonText}>
              {showOriginalText ? 'Masquer le texte original' : 'Afficher le texte original'}
            </InformationText>
          </TouchableOpacity>
        )}
        {/* Display original text if toggled */}
        {showOriginalText && parsedData.original_text ? (
          <View style={styles.originalTextContainer}>
            <OriginalScannedtextTitle style={styles.originalTextTitle}>Texte original</OriginalScannedtextTitle>
            <OriginalScannedtext style={styles.originalText}>{parsedData.original_text}</OriginalScannedtext>
          </View>
        ) : null}

        {/* Render the current sentence or show NoScannedText if no data */}
        {parsedData.processed_results && parsedData.processed_results.length > 0 ? (
          renderSentence(parsedData.processed_results[currentSentenceIndex])
        ) : (
          <NoScannedText />
        )}
      </ScrollView>
      {/* Button to open legend modal */}
      {parsedData.processed_results && parsedData.processed_results.length > 0 && (
        <TouchableOpacity
          style={styles.legendButton}
          onPress={() => setModalVisible(true)}
        >
          <InformationText>À quoi correspondent les couleurs</InformationText>
          <EvilIcons name="question" style={styles.legendIcon} />
        </TouchableOpacity>
      )}
      {/* Legend modal */}
      <LegendModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    marginTop: -50,
    paddingTop: 60,
    marginBottom: 60,
    marginHorizontal: 'auto',
  },
  scrollContainer: {
    flex: 1,
  },
  refreshButton: {
    padding: 10,
    alignSelf: 'center'
  },
  refreshIcon: {
    fontSize: 30,
    color: Colors.black
  },
  sentenceAndWordCardContainer: {
    marginBottom: 0,
  },
  sentenceContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    fontSize: 30,
    marginRight: 5,
    color: Colors.grey,
  },
  iconRight: {
    fontSize: 30,
    marginLeft: 5,
    color: Colors.grey,
  },
  disabledIcon: {
    color: Colors.lightGrey,
  },
  sentenceText: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    flex: 1,
    textAlign: 'left',
  },
  wordButton: {},
  wordText: {
    borderRadius: 5,
    paddingLeft: 6,
    lineHeight: 30,
    marginHorizontal: -3
  },
  cardsContainer: {},
  originalTextButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10
  },
  originalTextButtonText: {
    color: Colors.black,
  },
  originalTextButtonIcon: {
    marginRight: 5,
    fontSize: 15,
    color: Colors.black,
  },
  originalTextContainer: {
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: Colors.lightGreen,
    borderRadius: 15,
    padding: 15
  },
  originalTextTitle: {
    marginBottom: 10,
    color: Colors.black,
    alignSelf: 'center'
  },
  originalText: {
    color: Colors.black,
  },
  legendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey,
    marginRight: 3,
  },
  legendIcon: {
    fontSize: 20,
    color: Colors.black,
  },
});