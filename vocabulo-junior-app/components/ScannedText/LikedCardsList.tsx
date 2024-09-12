import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DictionaryCard from './DictionaryCard'; 
import { Colors } from '@/constants/Colors';

interface LikedCardsListProps {
    refreshKey: number; // Ajoutez cette prop
}

const LikedCardsList: React.FC<LikedCardsListProps> = ({ refreshKey }) => {
    const [likedCards, setLikedCards] = useState<any[]>([]);

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
                setLikedCards(validLikedCards);
            } catch (error) {
                console.error('Failed to fetch liked cards:', error);
            }
        };

        fetchLikedCards();
    }, [refreshKey]); // Ajoutez refreshKey comme dépendance

    const handleUnlike = useCallback(async (cardWord: string) => {
        try {
            await AsyncStorage.removeItem(`card-${cardWord}`);
            await AsyncStorage.removeItem(`like-${cardWord}`);
            
            const updatedLikedCards = likedCards.filter(card => card.word !== cardWord);
            setLikedCards(updatedLikedCards);
        } catch (error) {
            console.error('Failed to unlike card:', error);
        }
    }, [likedCards]);

    return (
        <View style={styles.container}>
            <FlatList
                data={likedCards}
                keyExtractor={(item) => item.word}
                renderItem={({ item }) => (
                    <DictionaryCard
                        word={item.word}
                        lemma={item.lemma}
                        pos={item.pos}
                        func={item.func}
                        definition={item.definition}
                        url={item.url}
                        onUnlike={() => handleUnlike(item.word)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LikedCardsList;
