// DictionaryCard.tsx
// This file defines a React Native component that represents a card displaying information about a word.
// It includes features such as liking the card, showing definitions, and displaying video content.

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { DefCard, VideoButtonCard, WordCard } from '@/constants/StyledText';
import { getColorForPOS } from './PosColors';
import VideoModal from './VideoModal';


// Interface for the information data used in the card
interface InformationData {
    word: string;
    lemma: string;
    pos: string;
    func: string;
    definition: string;
    url: string;
}

// Props for the DictionaryCard component
interface DictionaryCardProps extends InformationData {
    onUnlike?: () => void;  // Optional callback function for when the card is unliked
    refreshKey?: number;  // Optional prop to trigger a refresh
}
// Utility function to check if a URL is valid
const isValidUrl = (url: string) => {
    try {
        new URL(url); // Attempt to create a URL object
        return true; // URL is valid
    } catch {
        console.log(`Invalid URL: ${url}`); // Log invalid URL
        return false; // URL is not valid
    }
};

// Main component for the dictionary card
const DictionaryCard: React.FC<DictionaryCardProps> = ({ word, lemma, pos, func, definition, url, onUnlike, refreshKey }) => {
    const [isLiked, setIsLiked] = useState(false); // State to track if the card is liked
    const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the VideoModal

    // Fetch the like state from AsyncStorage when the component mounts
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

    // Reset like state when refreshKey changes
    useEffect(() => {
        setIsLiked(false);
    }, [refreshKey]);

    // Handle icon press to toggle like state and update AsyncStorage
    const handleIconPress = async () => {
        const newLikeState = !isLiked; // Toggle the like state
        setIsLiked(newLikeState); // Update the local state
        try {
            await AsyncStorage.setItem(`like-${word}`, JSON.stringify(newLikeState)); // Save the new like state
            if (newLikeState) {
                console.log(`Saving card data for ${word}`);
                const cardData = { word, lemma, pos, func, definition, url }; // Card data
                await AsyncStorage.setItem(`card-${word}`, JSON.stringify(cardData)); // Save the card data
            } else {
                console.log(`Removing card data for ${word}`);
                await AsyncStorage.removeItem(`card-${word}`); // Remove the card data
                if (onUnlike) {
                    onUnlike(); // Call the onUnlike callback if provided
                }
            }
        } catch (error) {
            console.error('Failed to save the like state:', error);
        }
    };

    // Handle the press of the video button to show the VideoModal
    const handleVideoButtonPress = () => {
        setModalVisible(true); // Set modalVisible to true to show the VideoModal
    };

    // Skip rendering for special characters
    if (['.', '!', '?', ';', ':', '(', ')', '[', ']', '{', '}', '-', '—', '’', '“', '”', '|', '‘', '>', '<', '…', '»', '«'].includes(word)) {
        console.log(`Skipping special character card for: ${word}`);
        return null; // Return null to skip rendering for special characters
    }

    const { color: cardColor, identifier } = getColorForPOS(pos); // Get color and identifier based on part of speech
    const showButton = url && isValidUrl(url); // Determine if the button should be shown
    const showDefinition = definition !== 'Non trouvé dans la BDD'; // Determine if the definition should be shown
    const shouldShowLemma = lemma !== word; // Determine if the lemma should be shown
    const showIcon = ['NOUN', 'VERB', 'ADJ'].includes(identifier); // Determine if the like icon should be shown

    return (
        <View style={[styles.card, { backgroundColor: cardColor }]} >
            <View style={styles.titleContainer}>
                <View style={styles.emptyContainer}></View>
                <View style={styles.textContainer}>
                    <WordCard style={styles.wordText}>{lemma}</WordCard>
                    {shouldShowLemma ? (
                        <Text style={styles.detailText}>({word})</Text>
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
                    <TouchableOpacity onPress={handleVideoButtonPress} style={styles.signButton}>
                        <EvilIcons name="pointer" style={styles.iconButton} />
                        <VideoButtonCard style={styles.linkText}>Signe</VideoButtonCard>
                    </TouchableOpacity>
                </View>
            ) : null}

            <VideoModal
                visible={modalVisible}
                url={url}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

// Styles for the DictionaryCard component
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