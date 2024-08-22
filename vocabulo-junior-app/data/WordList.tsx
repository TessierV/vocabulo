import scannedTextData from './scannedTextData';

/**
 * Function to extract words from a given text.
 * @param scannedTextData The text from which to extract words.
 * @returns An array of words extracted from the text.
 */
export function extractWordsFromText(scannedTextData: string): string[] {
    return scannedTextData
        .toLowerCase()
        .match(/[à-ÿ\w'-]+/g) || [];
}

export const wordsListFromText = extractWordsFromText(scannedTextData);


import dictionaryData from './dictionaryData';

/**
 * Function to extract words from dictionary data.
 * @param dictionaryData The dictionary data in CSV format.
 * @returns An array of words extracted from the dictionary.
 */
export function extractWordsFromDictionary(dictionaryData: string): string[] {
    const lines = dictionaryData.trim().split('\n');
    const header = lines[0].split(',');


    const wordIndex = header.indexOf('mot');

    if (wordIndex === -1) {
        throw new Error('Column "mot" not found in dictionary data.');
    }


    const words = lines.slice(1).map(line => {
        const columns = line.split(',');
        return columns[wordIndex].trim();
    });

    return words;
}

export const wordsListFromDictionary = extractWordsFromDictionary(dictionaryData);
