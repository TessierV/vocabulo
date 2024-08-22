import { wordsListFromDictionary, wordsListFromText } from '@/data/WordList'; // Assurez-vous que les chemins sont corrects

/**
 * Function to find common words between two lists.
 * @param list1 The first list of words from the dictionary.
 * @param list2 The second list of words from the text.
 * @returns An array of words common to both lists.
 */
export function CompareCommonWords(list1: string[], list2: string[]): string[] {
  const set1 = new Set(list1.map(word => word.toLowerCase().trim()));
  const set2 = new Set(list2.map(word => word.toLowerCase().trim()));
  const commonWords = [...set1].filter(word => set2.has(word));

  return commonWords;
}

/**
 * Function to generate all possible combinations of words from a list.
 * @param words The list of words to generate combinations from.
 * @param minLength The minimum length of combinations.
 * @param maxLength The maximum length of combinations.
 * @returns An array of combinations, where each combinations is a combination of words.
 */
function generatecombinations(words: string[], minLength: number, maxLength: number): string[] {
  const combinations: string[] = [];
  
  for (let length = minLength; length <= maxLength; length++) {
    for (let start = 0; start <= words.length - length; start++) {
      const sequence = words.slice(start, start + length).join(' ');
      combinations.push(sequence);
    }
  }
  
  return combinations;
}

/**
 * Function to check combinations of a list of words.
 * @param combinations The list of word combinations to check.
 * @param list The list of words to compare against.
 * @returns A list of combinations that are present in the list.
 */
function findCombinedWords(combinations: string[], list: string[]): string[] {
  const listSet = new Set(list.map(word => word.toLowerCase().trim()));
  return combinations.filter(sequence => listSet.has(sequence.toLowerCase().trim()));
}

/**
 * Function to filter valid combinations by keeping only the longest combination when multiple combinations have the same two starting words.
 * @param combinations The list of valid combinations to filter.
 * @returns A filtered list of combinations where only the longest sequence is kept for each pair of starting words.
 */
function filtercombinations(combinations: string[]): string[] {
  const sequenceMap = new Map<string, string>();

  for (const sequence of combinations) {
    const words = sequence.split(' ');
    if (words.length >= 2) {
      const key = words.slice(0, 2).join(' ');
      if (!sequenceMap.has(key) || sequence.length > sequenceMap.get(key)!.length) {
        sequenceMap.set(key, sequence);
      }
    }
  }
  return Array.from(sequenceMap.values());
}

const minSequenceLength = 2;
const maxSequenceLength = 4;
const SearchCombinedWords = generatecombinations(wordsListFromText, minSequenceLength, maxSequenceLength);
const CombinedWordsList = findCombinedWords(SearchCombinedWords, wordsListFromDictionary);
const SelectLongestCombinedWordsList = filtercombinations(CombinedWordsList);
const CompareCommonWordsList = CompareCommonWords(wordsListFromDictionary, wordsListFromText);
const wordsFromSelectLongestCombinedWordsList = SelectLongestCombinedWordsList.map(sequence => sequence.toLowerCase().trim());


const combinedWordsSet = new Set<string>([
  ...CompareCommonWordsList.map(word => word.toLowerCase().trim()), 
  ...wordsFromSelectLongestCombinedWordsList
]);

export const CommonWordsList = Array.from(combinedWordsSet);

// Log the lists
console.log('List from Dictionary:', wordsListFromDictionary);
console.log('List from Text:', wordsListFromText);
console.log('Search combined words:', SearchCombinedWords);
console.log('Combined words list:', CombinedWordsList);
console.log('Longest Combined words list:', SelectLongestCombinedWordsList);
console.log('Common Words list:', CommonWordsList);
