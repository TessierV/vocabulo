import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import scannedTextData from '@/data/scannedTextData'
import { CommonWordsList } from './CompareCommonWordsList'
import { extractWordsFromText } from '@/data/WordList'

export default function ScannedTextAnalyzed() {
  // Extraire les mots du texte
  const words = extractWordsFromText(scannedTextData)

  // Utiliser un set pour garder une trace des mots communs déjà surlignés
  const highlightedWords = new Set()

  // Fonction pour transformer le texte en composants Text stylisés
  const renderStyledText = (text: string) => {
    const regex = new RegExp(`\\b(${CommonWordsList.join('|')})\\b`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) => {
      // Vérifie si la partie du texte est un mot commun
      const isCommonWord = CommonWordsList.includes(part.toLowerCase())
      const shouldHighlight = isCommonWord && !highlightedWords.has(part.toLowerCase())

      if (shouldHighlight) {
        highlightedWords.add(part.toLowerCase())
      }

      return (
        <Text
          key={index}
          style={shouldHighlight ? styles.highlightedText : styles.text}
        >
          {part}
        </Text>
      )
    })
  }

  return (
    <View style={styles.container}>
      {renderStyledText(scannedTextData)}
      <Text style={styles.commonWords}>
        {CommonWordsList.join(', ')} {/* Affichage de la liste en une seule ligne avec des virgules */}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Optionnel: Ajoutez une couleur de fond pour le contraste
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  highlightedText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red', // Couleur rouge pour les mots communs
  },
  commonWords: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#333', // Couleur pour la liste des mots communs
  },
})
