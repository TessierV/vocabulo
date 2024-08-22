const fs = require('fs').promises;
const path = require('path');

// Fonction pour lire un fichier et retourner son contenu en tant que chaîne
async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, error);
    throw error;
  }
}

// Fonction pour extraire les mots du texte en remplaçant la ponctuation par des espaces
function extractWords(text) {
  // Remplace les caractères de ponctuation spécifiés par des espaces
  const cleanedText = text.replace(/[.,!?'"()\/;]+/g, ' ');

  // Utilise une expression régulière pour séparer le texte en mots
  return cleanedText
    .toLowerCase() // Convertit en minuscules pour une comparaison insensible à la casse
    .match(/\w+/g) // Conserve les mots uniquement
    .filter(word => word.trim().length > 0); // Filtre les mots vides
}

// Fonction pour extraire les mots du dictionnaire
function extractDictionaryWords(dictionary) {
  const lines = dictionary.trim().split('\n');
  const words = new Set();

  for (const line of lines.slice(1)) { // Ignore la première ligne d'en-tête
    const columns = line.split(',');
    if (columns.length > 0) {
      const word = columns[0].trim().toLowerCase();
      words.add(word);
    }
  }

  console.log(`Nombre de mots dans le dictionnaire: ${words.size}`);
  return words;
}

// Fonction principale pour trouver les mots communs
async function findCommonWords(textFilePath, dictionaryFilePath) {
  try {
    const [text, dictionary] = await Promise.all([
      readFile(textFilePath),
      readFile(dictionaryFilePath)
    ]);

    const textWords = extractWords(text);
    const dictionaryWords = extractDictionaryWords(dictionary);

    // Utilise un Set pour stocker les mots communs afin d'éliminer les duplications
    const commonWords = new Set(textWords.filter(word => dictionaryWords.has(word)));

    return Array.from(commonWords); // Retourne la liste des mots communs sous forme de tableau
  } catch (error) {
    console.error('Erreur lors de la lecture des fichiers ou du traitement des données:', error);
    return []; // Retourne une liste vide en cas d'erreur
  }
}

// Utilisation de la fonction avec chemins absolus
const textFilePath = path.resolve(__dirname, './scannedTextData.js'); // Ajustez le chemin relatif en fonction de votre structure de répertoire
const dictionaryFilePath = path.resolve(__dirname, './data.js'); // Ajustez le chemin relatif en fonction de votre structure de répertoire

findCommonWords(textFilePath, dictionaryFilePath).then(commonWords => {
  if (commonWords.length > 0) {
    console.log('Mots communs:', commonWords);
  } else {
    console.log('Aucun mot commun trouvé.');
  }
}).catch(error => {
  console.error('Erreur lors de la recherche des mots communs:', error);
});
