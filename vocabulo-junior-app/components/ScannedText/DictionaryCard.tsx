import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { getColorForPOS } from './PosColors';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { DefCard, VideoButtonCard, WordCard } from '@/constants/StyledText';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InformationData {
    word: string;
    lemma: string;
    pos: string;
    func: string;
    definition: string;
    url: string;
}

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        console.log(`Invalid URL: ${url}`);
        return false;
    }
};

const handlePress = async (url: string) => {
    try {
        if (isValidUrl(url)) {
            console.log(`Opening URL: ${url}`);
            await Linking.openURL(url);
        }
    } catch (error) {
        console.error('Failed to open URL:', error);
    }
};

const DictionaryCard: React.FC<InformationData> = ({ word, lemma, pos, func, definition, url }) => {
    const [isLiked, setIsLiked] = useState(false); 

    useEffect(() => {
        const fetchLikeState = async () => {
            try {
                console.log(`Fetching like state for word: ${word}`);
                const storedLikeState = await AsyncStorage.getItem(`like-${word}`);
                if (storedLikeState !== null) {
                    setIsLiked(JSON.parse(storedLikeState));
                    console.log(`Like state found for ${word}: ${storedLikeState}`);
                } else {
                    console.log(`No like state found for ${word}`);
                }
            } catch (error) {
                console.error('Failed to fetch the like state:', error);
            }
        };

        fetchLikeState();
    }, [word]);

    const handleIconPress = async () => {
        const newLikeState = !isLiked;
        console.log(`Toggling like state for ${word}: ${newLikeState}`);
        setIsLiked(newLikeState);
        try {
            await AsyncStorage.setItem(`like-${word}`, JSON.stringify(newLikeState));
            if (newLikeState) {
                console.log(`Saving card data for ${word}`);
                await AsyncStorage.setItem(`card-${word}`, JSON.stringify({ word, lemma, pos, func, definition, url }));
            } else {
                console.log(`Removing card data for ${word}`);
                await AsyncStorage.removeItem(`card-${word}`);
            }
        } catch (error) {
            console.error('Failed to save the like state:', error);
        }
    };

    if (['.', '!', '?', ';', ':', '(', ')', '[', ']', '{', '}', '-', '—', '’', '“', '”', '|', '‘', '>', '<', '…', '»', '«'].includes(word)) {
        console.log(`Skipping special character card for: ${word}`);
        return null;
    }

    const { color: cardColor, identifier } = getColorForPOS(pos);
    const showButton = url && isValidUrl(url);
    const showDefinition = definition !== 'Non trouvé dans la BDD';
    const shouldShowLemma = lemma !== word;
    const showIcon = ['NOUN', 'VERB', 'ADJ'].includes(identifier);

    return (
        <View style={[styles.card, { backgroundColor: cardColor }]}>
            <View style={styles.titleContainer}>
                <View style={styles.emptyContainer}></View>
                <View style={styles.textContainer}>
                    <WordCard style={styles.wordText}>{word}</WordCard>
                    {shouldShowLemma ? (
                        <Text style={styles.detailText}>({lemma})</Text>
                    ) : null}
                </View>
                {showIcon ? (
                    <TouchableOpacity onPress={handleIconPress}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} style={styles.likeIcon} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.emptyContainer} /> 
                )}
            </View>
            <View style={styles.underline} />
            {showDefinition ? (
                <DefCard style={styles.definitionText}>{definition}</DefCard>
            ) : null}
            {showButton ? (
                <View style={styles.videosContainer}>
                    <TouchableOpacity onPress={() => handlePress(url)} style={styles.signButton}>
                        <EvilIcons name="pointer" style={styles.iconButton} />
                        <VideoButtonCard style={styles.linkText}>Signe</VideoButtonCard>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginHorizontal: 'auto',
        marginVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignSelf: 'flex-start',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    emptyContainer: {
        width: 20,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    wordText: {
        marginRight: 3,
        textTransform: 'uppercase',
        color: Colors.white,
    },
    detailText: {
        fontSize: 14,
        color: Colors.white,
    },
    definitionText: {
        marginTop: 15,
        textAlign: 'center',
        color: Colors.white,
    },
    videosContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 5,
    },
    signButton: {
        marginHorizontal: '2%',
        paddingHorizontal: '10%',
        paddingVertical: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: 3,
        fontSize: 22,
        color: Colors.white,
    },
    linkText: {
        fontSize: 14,
        color: Colors.white,
    },
    underline: {
        borderTopWidth: 0.5,
        borderTopColor: Colors.white,
    },
    likeIcon: {
        fontSize: 20,
        color: Colors.white,
    },
});

export default DictionaryCard;
