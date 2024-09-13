import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import DictionaryCard from './DictionaryCard';
import LegendModal from './LegendModal';
import NoScannedText from './NoScannedText';
import { Colors } from '@/constants/Colors';
import { InformationText, OriginalScannedtext, OriginalScannedtextTitle } from '@/constants/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Scannedtext } from '@/constants/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import { getColorForPOS } from './PosColors';
import AntDesign from '@expo/vector-icons/AntDesign';

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

const cleanDefinition = (definition: string) => {
  let cleanedDefinition = definition.replace(/["]/g, '');
  cleanedDefinition = cleanedDefinition.replace(/;/g, ',');
  cleanedDefinition = cleanedDefinition.replace(/\./g, '');
  cleanedDefinition = cleanedDefinition.replace(/([?!])(\s|$)/g, '$1.$2');
  if (cleanedDefinition.length > 0) {
    cleanedDefinition = cleanedDefinition.charAt(0).toUpperCase() + cleanedDefinition.slice(1);
  }
  if (!cleanedDefinition.endsWith('.')) {
    cleanedDefinition += '.';
  }
  return cleanedDefinition;
};

const isPlaceholderDefinition = (definition: string) => {
  const placeholder = 'Non trouvé dans la BDD';
  return definition.trim() === placeholder;
};

export default function OCRScannedTextScreen() {
  const { ocrData } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0); // Ajouter un état pour gérer le rafraîchissement

  const dataString = Array.isArray(ocrData) ? ocrData.join(' ') : ocrData;

  let parsedData: ParsedData = {};
  try {
    parsedData = dataString ? JSON.parse(dataString) : {};
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }

  const handleNextSentence = () => {
    if (parsedData.processed_results && currentSentenceIndex < parsedData.processed_results.length - 1) {
      setSelectedWord(null);
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setSelectedWord(null);
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };

  const allowedPOS = ['NOUN', 'VERB', 'ADJ', 'ADV'];

  const renderWords = (words: Word[]) => {
    const uniqueWords = new Map<string, Word>();
    words.forEach(wordObj => {
      if (allowedPOS.includes(wordObj.pos) && !isPlaceholderDefinition(wordObj.definition)) {
        uniqueWords.set(wordObj.word, wordObj);
      }
    });

    return (
      <>
        {Array.from(uniqueWords.values()).map((wordObj, index) => (
          <DictionaryCard
            key={index}
            word={wordObj.word}
            lemma={wordObj.lemma}
            pos={wordObj.pos}
            func={wordObj.function}
            definition={cleanDefinition(wordObj.definition)}
            url={wordObj.url}
          />
        ))}
      </>
    );
  };

  const addSpacesAroundPunctuation = (text: string) => {
    return text
      .replace(/([.,!?;:'"`])(?=\S)/g, '$1 ') // Add space after punctuation if followed by a non-whitespace character
      .replace(/(?<=\S)([.,!?;:'"`])/g, ' $1'); // Add space before punctuation if preceded by a non-whitespace character
  };

  const renderSentence = (sentenceObj: Sentence) => {
    const foundWordsWithColors = sentenceObj.words
      .filter(wordObj => allowedPOS.includes(wordObj.pos) && !isPlaceholderDefinition(wordObj.definition))
      .reduce((acc, wordObj) => {
        acc[wordObj.word] = getColorForPOS(wordObj.pos).color;
        return acc;
      }, {} as Record<string, string>);

    const processedSentence = addSpacesAroundPunctuation(sentenceObj.sentence);

    return (
      <View key={currentSentenceIndex} style={styles.sentenceAndWordCardContainer}>
        <View style={styles.sentenceContainer}>
          <TouchableOpacity onPress={handlePreviousSentence} disabled={currentSentenceIndex === 0}>
            <EvilIcons
              name="arrow-left"
              style={[styles.iconLeft, currentSentenceIndex === 0 && styles.disabledIcon]}
            />
          </TouchableOpacity>
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
                      setSelectedWord(selectedWordObj);
                    }
                  }}
                >
                  <Scannedtext style={wordStyle}>{word + ' '}</Scannedtext>
                </TouchableOpacity>
              );
            })}
          </Scannedtext>
          <TouchableOpacity onPress={handleNextSentence} disabled={parsedData.processed_results && currentSentenceIndex === parsedData.processed_results.length - 1}>
            <EvilIcons
              name="arrow-right"
              style={[styles.iconRight, parsedData.processed_results && currentSentenceIndex === parsedData.processed_results.length - 1 && styles.disabledIcon]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {selectedWord && renderWords([selectedWord])}
        </View>
      </View>
    );
  };

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1); // Change la clé pour rafraîchir les données
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {parsedData.original_text && (
          <TouchableOpacity style={styles.originalTextButton} onPress={() => setShowOriginalText(!showOriginalText)}>
            <FontAwesome name={showOriginalText ? "eye" : "eye-slash"} style={styles.originalTextButtonIcon} />
            <InformationText style={styles.originalTextButtonText}>
              {showOriginalText ? 'Masquer le texte original' : 'Afficher le texte original'}
            </InformationText>
          </TouchableOpacity>
        )}
        {showOriginalText && parsedData.original_text ? (
          <View style={styles.originalTextContainer}>
            <OriginalScannedtextTitle style={styles.originalTextTitle}>Texte original</OriginalScannedtextTitle>
            <OriginalScannedtext style={styles.originalText}>{parsedData.original_text}</OriginalScannedtext>
          </View>
        ) : null}

        {parsedData.processed_results && parsedData.processed_results.length > 0 ? (
          renderSentence(parsedData.processed_results[currentSentenceIndex])
        ) : (
          <NoScannedText />
        )}

      </ScrollView>
      {parsedData.processed_results && parsedData.processed_results.length > 0 && (
        <>
          <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
            <EvilIcons name="retweet" style={styles.refreshIcon} />
          </TouchableOpacity>
          <View style={styles.legendContainer}>
            <TouchableOpacity
              style={styles.legendButton}
              onPress={() => setModalVisible(true)}
            >
              <InformationText>À quoi correspondent les couleurs</InformationText>
            </TouchableOpacity>
            <EvilIcons name="question" style={styles.legendIcon} />
          </View>
        </>
      )}
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
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey,
  },
  legendButton: {
    marginRight: 3,
  },
  legendIcon: {
    fontSize: 20,
    color: Colors.black,
  },
});
