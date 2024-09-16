import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getColorForPOS } from './PosColors';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { DefCard, VideoButtonCard, WordCard } from '@/constants/StyledText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoModal from './VideoModal'; // Import the new VideoModal component

interface InformationData {
    word: string;
    lemma: string;
    pos: string;
    func: string;
    definition: string;
    url: string;
}

interface DictionaryCardProps extends InformationData {
    onUnlike?: () => void;
    refreshKey?: number;  // New prop
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

const DictionaryCard: React.FC<DictionaryCardProps> = ({ word, lemma, pos, func, definition, url, onUnlike, refreshKey }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

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

    useEffect(() => {
        // Reset like state when refreshKey changes
        setIsLiked(false);  // Reset like state on refresh
    }, [refreshKey]);

    const handleIconPress = async () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        try {
            await AsyncStorage.setItem(`like-${word}`, JSON.stringify(newLikeState));
            if (newLikeState) {
                console.log(`Saving card data for ${word}`);
                const cardData = { word, lemma, pos, func, definition, url, addedDate: Date.now() };
                await AsyncStorage.setItem(`card-${word}`, JSON.stringify(cardData));
            } else {
                console.log(`Removing card data for ${word}`);
                await AsyncStorage.removeItem(`card-${word}`);
                if (onUnlike) {
                    onUnlike();
                }
            }
        } catch (error) {
            console.error('Failed to save the like state:', error);
        }
    };

    const handleVideoButtonPress = () => {
        setModalVisible(true);
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
