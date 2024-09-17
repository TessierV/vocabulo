// This file defines the color mappings for different parts of speech (POS) and provides utility functions
// to retrieve colors based on POS and to convert category names to POS identifiers.

import { Colors } from '@/constants/Colors';


// Define a mapping of POS identifiers to their corresponding colors and identifiers
const PosColors: { [key: string]: { color: string, identifier: string } } = {
    'NOUN': { color: Colors.neutralPlum, identifier: 'NOUN' }, // Color for nouns
    'VERB': { color: Colors.darkCoral, identifier: 'VERB' }, // Color for verbs
    'ADJ': { color: Colors.neutralBlue, identifier: 'ADJ' }, // Color for adjectives
    'ADV': { color: Colors.darkGreen, identifier: 'ADV' }, // Color for adverbs
    'OTHERS': { color: Colors.white, identifier: 'OTHERS' }, // Default color for other or unknown POS categories
};

// Function to get the color and identifier for a given POS identifier
export const getColorForPOS = (pos: string) => PosColors[pos] || { color: Colors.white, identifier: '' };

// Function to convert a selected category name to its corresponding POS identifier
export function getPOSFromCategory(selectedCategory: string | null): string | null {
    switch (selectedCategory) {
        case 'Nouns':
            return 'NOUN'; // Convert 'Nouns' to 'NOUN'
        case 'Verbs':
            return 'VERB'; // Convert 'Verbs' to 'VERB'
        case 'Adjectives':
            return 'ADJ'; // Convert 'Adjectives' to 'ADJ'
        case 'Adverbs':
            return 'ADV'; // Convert 'Adverbs' to 'ADV'
        default:
            return null; // Return null for unknown categories; or use 'OTHERS' if grouping unknown categories
    }
}