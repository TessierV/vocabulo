import { wordsListFromDictionary, wordsListFromText } from '@/data/WordList'; // Ensure that the paths are correct

/**
 * Function to find common words between two lists.
 * @param list1 The first list of words from the text.
 * @param list2 The second list of words from the dictionary.
 * @returns An array of words common to both lists.
 */
export function CompareCommonWords(list1: string[], list2: string[]): string[] {
  const set1 = new Set(list1.map(word => word.toLowerCase().trim()));
  const set2 = new Set(list2.map(word => word.toLowerCase().trim()));
  const commonWords = [...set1].filter(word => set2.has(word));

  return commonWords;
}

export const CompareCommonWordsList = CompareCommonWords(wordsListFromDictionary, wordsListFromText);
