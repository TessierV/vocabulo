import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DictionaryCard from './DictionaryCard'; 
import { Colors } from '@/constants/Colors';
import { InformationText } from '@/constants/StyledText';

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
    sortDirection: 'A-Z' | 'Z-A'; // Add sortDirection prop
}

const LikedCardsList: React.FC<LikedCardsListProps> = ({ refreshKey, selectedCategory, selectedLetter, searchTerm, sortDirection }) => {
    const [likedCards, setLikedCards] = useState<Card[]>([]);

    const getPOSFromCategory = (category: string | null): string | null => {
        const categoryMap: { [key: string]: string } = {
            'Nom': 'NOUN',
            'Verbe': 'VERB',
            'Adjectif': 'ADJ',
        };
        return category ? categoryMap[category] || null : null;
    };

    useEffect(() => {
        const fetchLikedCards = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const likeKeys = keys.filter(key => key.startsWith('like-'));

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

                let validLikedCards = likedCardsData.filter((card: Card | null) => card !== null) as Card[];

                const selectedPOS = getPOSFromCategory(selectedCategory);
                if (selectedPOS) {
                    validLikedCards = validLikedCards.filter(card => card.pos === selectedPOS);
                }

                if (selectedLetter) {
                    validLikedCards = validLikedCards.filter(card => card.lemma[0].toUpperCase() === selectedLetter);
                }

                if (searchTerm) {
                    validLikedCards = validLikedCards.filter(card =>
                        card.lemma.toLowerCase().startsWith(searchTerm.toLowerCase()) || 
                        card.lemma.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                // Sort by alphabet based on the direction
                validLikedCards.sort((a, b) => {
                    const comparison = a.lemma.localeCompare(b.lemma);
                    return sortDirection === 'A-Z' ? comparison : -comparison;
                });

                setLikedCards(validLikedCards);
            } catch (error) {
                console.error('Failed to fetch liked cards:', error);
            }
        };

        fetchLikedCards();
    }, [refreshKey, selectedCategory, selectedLetter, searchTerm, sortDirection]);

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