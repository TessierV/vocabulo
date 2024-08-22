import scannedTextData from './scannedTextData';


/**
 * Fonction qui prend une chaîne de texte et renvoie une liste de mots.
 * @param text La chaîne de texte à analyser.
 * @returns Un tableau de mots extraits du texte.
 */
export function extractWordsFromText(text: string): string[] {
  // Utiliser une expression régulière pour séparer les mots en éliminant les ponctuations.
  return text
    .toLowerCase() // Optionnel : mettre tout en minuscules pour normaliser.
    .match(/\b\w+\b/g) || []; // \b\w+\b correspond aux mots.
}

// Extraire les mots du texte importé
export const wordsListFromText = extractWordsFromText(scannedTextData);


// dictionaryProcessor.ts

import dictionaryData from './dictionaryData';

/**
 * Fonction pour extraire les mots d'une chaîne CSV.
 * @param csvData La chaîne de texte CSV contenant les données du dictionnaire.
 * @returns Un tableau de mots extraits de la colonne 'mot'.
 */
export function extractWordsFromDictionary(csvData: string): string[] {
  // Diviser le texte CSV en lignes
  const lines = csvData.trim().split('\n');
  
  // Extraire l'en-tête (première ligne)
  const header = lines[0].split(',');

  // Trouver l'index de la colonne 'mot'
  const wordIndex = header.indexOf('mot');

  if (wordIndex === -1) {
    throw new Error('Colonne "mot" non trouvée dans les données CSV.');
  }

  // Extraire les mots (ignorer la première ligne d'en-tête)
  const words = lines.slice(1).map(line => {
    const columns = line.split(',');
    return columns[wordIndex].trim();
  });

  return words;
}

// Utiliser la fonction pour extraire les mots du texte importé
export const wordsListFromDictionary = extractWordsFromDictionary(dictionaryData);
