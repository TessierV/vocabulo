import { Colors } from '@/constants/Colors';

const PosColors: { [key: string]: { color: string, identifier: string } } = {
    'NOUN': { color: Colors.neutralPlum, identifier: 'NOUN' },
    'VERB': { color: Colors.darkCoral, identifier: 'VERB' },
    'ADJ': { color: Colors.neutralBlue, identifier: 'ADJ' },
    'ADV': { color: Colors.darkGreen, identifier: 'ADV' },
    'OTHERS': { color: Colors.white, identifier: 'OTHERS' }, // Regroupe toutes les catégories avec couleur blanche
};

export const getColorForPOS = (pos: string) => PosColors[pos] || { color: Colors.white, identifier: '' };

export function getPOSFromCategory(selectedCategory: string | null): string | null {
    switch (selectedCategory) {
        case 'Nouns':
            return 'NOUN';
        case 'Verbs':
            return 'VERB';
        case 'Adjectives':
            return 'ADJ';
        case 'Adverbs':
            return 'ADV';
        default:
            return null; // or 'OTHERS' if you want to group unknown categories
    }
}
