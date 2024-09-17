// This file defines the LikedCardsList component, which displays a list of liked dictionary cards.
// The list is fetched from AsyncStorage and filtered based on category, letter, search term, and sort direction.

import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/Colors';
import { InformationText } from '@/constants/StyledText';
import DictionaryCard from './DictionaryCard';


interface Card {
    word: string;
    lemma: string;
    pos: string;
    func: string;
    definition: string;
    url: string;
}

interface LikedCardsListProps {
    refreshKey: number;
    selectedCategory: string | null;
    selectedLetter: string | null;
    searchTerm: string;
    sortDirection: 'A-Z' | 'Z-A'; // Prop for determining sort direction
}

const LikedCardsList: React.FC<LikedCardsListProps> = ({ refreshKey, selectedCategory, selectedLetter, searchTerm, sortDirection }) => {
    // State to store the list of liked cards
    const [likedCards, setLikedCards] = useState<Card[]>([]);

    // Function to map category names to part-of-speech abbreviations
    const getPOSFromCategory = (category: string | null): string | null => {
        const categoryMap: { [key: string]: string } = {
            'Nom': 'NOUN',
            'Verbe': 'VERB',
            'Adjectif': 'ADJ',
        };
        return category ? categoryMap[category] || null : null;
    };
    // Fetch liked cards from AsyncStorage when dependencies change
    useEffect(() => {
        const fetchLikedCards = async () => {
            try {
                // Get all keys from AsyncStorage and filter for liked cards
                const keys = await AsyncStorage.getAllKeys();
                const likeKeys = keys.filter(key => key.startsWith('like-'));

                // Retrieve card data for each liked card
                const likedCardsData = await Promise.all(
                    likeKeys.map(async (key) => {
                        const isLiked = JSON.parse(await AsyncStorage.getItem(key) || 'false');
                        if (isLiked) {
                            const cardData = await AsyncStorage.getItem(`card-${key.replace('like-', '')}`);
                            return cardData ? JSON.parse(cardData) : null;
                        }
                        return null;
                    })
                );

                // Filter out null values and cast to Card[]
                let validLikedCards = likedCardsData.filter((card: Card | null) => card !== null) as Card[];

                // Filter cards based on selected category
                const selectedPOS = getPOSFromCategory(selectedCategory);
                if (selectedPOS) {
                    validLikedCards = validLikedCards.filter(card => card.pos === selectedPOS);
                }

                // Filter cards based on the selected letter
                if (selectedLetter) {
                    validLikedCards = validLikedCards.filter(card => card.lemma[0].toUpperCase() === selectedLetter);
                }

                // Filter cards based on the search term
                if (searchTerm) {
                    validLikedCards = validLikedCards.filter(card =>
                        card.lemma.toLowerCase().startsWith(searchTerm.toLowerCase()) || 
                        card.lemma.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                // Sort cards alphabetically based on sort direction
                validLikedCards.sort((a, b) => {
                    const comparison = a.lemma.localeCompare(b.lemma);
                    return sortDirection === 'A-Z' ? comparison : -comparison;
                });

                // Update state with the filtered and sorted cards
                setLikedCards(validLikedCards);
            } catch (error) {
                console.error('Failed to fetch liked cards:', error);
            }
        };

        fetchLikedCards();
    }, [refreshKey, selectedCategory, selectedLetter, searchTerm, sortDirection]);

    // Handle unliking a card by removing it from AsyncStorage and updating state
    const handleUnlike = useCallback(async (cardWord: string) => {
        try {
            // Remove card and like states from AsyncStorage
            await AsyncStorage.removeItem(`card-${cardWord}`);
            await AsyncStorage.removeItem(`like-${cardWord}`);
            setLikedCards(prevCards => prevCards.filter(card => card.word !== cardWord));
        } catch (error) {
            console.error('Failed to unlike card:', error);
        }
    }, []);

    return (
        <View style={styles.container}>
            {likedCards.length > 0 ? (
                // Render a scrollable list of liked cards
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {likedCards.map((item) => (
                        <DictionaryCard
                            key={item.word}
                            word={item.word}
                            lemma={item.lemma}
                            pos={item.pos}
                            func={item.func}
                            definition={item.definition}
                            url={item.url}
                            onUnlike={() => handleUnlike(item.word)}
                        />
                    ))}
                </ScrollView>
            ) : (
                // Display message if no liked cards are present
                <View style={styles.emptyContainer}>
                    <InformationText style={styles.emptyText}>Aucun mot enregistré.</InformationText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.grey,
        fontSize: 18,
        marginTop: 20,
    },
});

export default LikedCardsList;