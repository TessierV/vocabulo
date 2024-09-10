import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import WordCard from './WordCard'; // Ajustez le chemin d'importation si nécessaire
import LegendModal from './LegendModal'; // Ajustez le chemin d'importation si nécessaire
import NoScannedText from './NoScannedText'; // Ajustez le chemin d'importation si nécessaire
import { Colors } from '@/constants/Colors';
import { InformationText, OriginalScannedtext, OriginalScannedtextTitle } from '@/constants/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Scannedtext } from '@/constants/StyledText';

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

// Fonction pour nettoyer la définition
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

// Fonction pour vérifier si la définition est un espace réservé
const isPlaceholderDefinition = (definition: string) => {
  const placeholder = 'Non trouvé dans la BDD';
  return definition.trim() === placeholder;
};

export default function OCRScannedTextScreen() {
  const { ocrData } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // Suivi de l'index de la phrase affichée

  const dataString = Array.isArray(ocrData) ? ocrData.join(' ') : ocrData;

  let parsedData: ParsedData = {};
  try {
    parsedData = dataString ? JSON.parse(dataString) : {};
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }

  // Gérer la navigation des phrases
  const handleNextSentence = () => {
    if (parsedData.processed_results && currentSentenceIndex < parsedData.processed_results.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };

  const renderWords = (words: Word[]) => {
    return words
      .filter(wordObj => !isPlaceholderDefinition(wordObj.definition)) // Filtrer les définitions d'espace réservé
      .map((wordObj, index) => (
        <WordCard
          key={index}
          word={wordObj.word}
          lemma={wordObj.lemma}
          pos={wordObj.pos}
          func={wordObj.function}
          definition={cleanDefinition(wordObj.definition)} // Appliquer la fonction cleanDefinition
          url={wordObj.url}
        />
      ));
  };

  const renderSentence = (sentenceObj: Sentence) => (
    <View key={currentSentenceIndex} style={styles.sentenceAndWordCardContainer}>
      <View style={styles.sentenceContainer}>
        <TouchableOpacity onPress={handlePreviousSentence} disabled={currentSentenceIndex === 0}>
          <EvilIcons
            name="arrow-left"
            style={[styles.iconLeft, currentSentenceIndex === 0 && styles.disabledIcon]} // Flèche rouge si désactivée
          />
        </TouchableOpacity>
        <Scannedtext style={styles.sentenceText}>{sentenceObj.sentence}</Scannedtext>
        <TouchableOpacity onPress={handleNextSentence} disabled={parsedData.processed_results && currentSentenceIndex === parsedData.processed_results.length - 1}>
          <EvilIcons
            name="arrow-right"
            style={[
              styles.iconRight,
              parsedData.processed_results && currentSentenceIndex === parsedData.processed_results.length - 1 && styles.disabledIcon, // Flèche rouge si désactivée
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.wordsContainer}>
        {renderWords(sentenceObj.words)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {parsedData.original_text ? (
          <View style={styles.originalTextContainer}>
            <OriginalScannedtextTitle style={styles.originalTextTitle}>Texte original :</OriginalScannedtextTitle>
            <OriginalScannedtext style={styles.originalText}>{parsedData.original_text}</OriginalScannedtext>
          </View>
        ) : null}

        {/* Affichage de la phrase et des cartes */}
        {parsedData.processed_results && parsedData.processed_results.length > 0 ? (
          renderSentence(parsedData.processed_results[currentSentenceIndex])
        ) : (
          <NoScannedText />
        )}
      </ScrollView>

      <View style={styles.legendContainer}>
        <TouchableOpacity
          style={styles.legendButton}
          onPress={() => setModalVisible(true)}
        >
          <InformationText>À quoi correspondent les couleurs</InformationText>
        </TouchableOpacity>
        <EvilIcons name="question" style={styles.legendIcon} />
      </View>
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
  sentenceAndWordCardContainer: {
    marginBottom: 0,
  },
  sentenceContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    fontSize: 40,
    marginRight: 5,
    color: Colors.grey,
  },
  iconRight: {
    fontSize: 40,
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
  wordsContainer: {
    paddingHorizontal: 0,
  },
  originalTextContainer: {
  },
  originalTextTitle: {
    marginBottom: 10,
  },
  originalText: {
    color: Colors.grey,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
    backgroundColor: Colors.lightGrey,
  },
  legendButton: {
    marginRight: 3,
  },
  legendIcon: {
    fontSize: 20,
    color: Colors.black,
  },
});
