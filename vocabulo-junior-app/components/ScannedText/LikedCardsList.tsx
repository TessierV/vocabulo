import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DictionaryCard from './DictionaryCard'; 
import { Colors } from '@/constants/Colors';

const LikedCardsList: React.FC = () => {
    const [likedCard, setLikedCard] = useState<any | null>(null);

    useEffect(() => {
        const fetchLikedCards = async () => {
            try {
                console.log('Fetching liked cards from AsyncStorage');
                const keys = await AsyncStorage.getAllKeys();
                const likeKeys = keys.filter(key => key.startsWith('like-'));
                console.log('Like keys:', likeKeys);

                const likedCardsData = await Promise.all(
                    likeKeys.map(async (key) => {
                        const isLiked = JSON.parse(await AsyncStorage.getItem(key) || 'false');
                        if (isLiked) {
                            const cardData = await AsyncStorage.getItem(`card-${key.replace('like-', '')}`);
                            console.log(`Fetched card data for ${key.replace('like-', '')}:`, cardData);
                            return cardData ? JSON.parse(cardData) : null;
                        }
                        return null;
                    })
                );

                const validLikedCards = likedCardsData.filter(card => card !== null);
                if (validLikedCards.length > 0) {
                    // Vous pouvez choisir soit la première carte aimée, soit une carte aléatoire :
                    const randomIndex = Math.floor(Math.random() * validLikedCards.length); // Sélectionner une carte aléatoire
                    setLikedCard(validLikedCards[randomIndex]);
                }
            } catch (error) {
                console.error('Failed to fetch liked cards:', error);
            }
        };

        fetchLikedCards();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {likedCard ? (
                <DictionaryCard
                    word={likedCard.word}
                    lemma={likedCard.lemma}
                    pos={likedCard.pos}
                    func={likedCard.func}
                    definition={likedCard.definition}
                    url={likedCard.url}
                />
            ) : (
                <Text style={styles.noCardsText}>Aucune carte likée</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: Colors.white,
    },
    noCardsText: {
        fontSize: 18,
        color: Colors.grey,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default LikedCardsList;
