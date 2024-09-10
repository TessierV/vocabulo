import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { getColorForPOS } from './PosColors';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { DefCard, WordCard } from '@/constants/StyledText';

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
        return false;
    }
};

const handlePress = async (url: string) => {
    try {
        if (isValidUrl(url)) {
            await Linking.openURL(url);
        }
    } catch (error) {
        console.error('Failed to open URL:', error);
    }
};

const DictionnaryCard: React.FC<InformationData> = ({ word, lemma, pos, func, definition, url }) => {
    if (['.', ',', '!', '?', ';', ':', '(', ')', '[', ']', '{', '}', '-', '—', '’', '“', '”' , '|', '‘' , '>', '<', '…', '»', '«' ].includes(word)) {
        return null;
    }

    const cardColor = getColorForPOS(pos);
    const showButton = url && isValidUrl(url);
    const showDefinition = definition !== 'Non trouvé dans la BDD';
    const shouldShowLemma = lemma !== word;

    return (
        <View style={[styles.card, { backgroundColor: cardColor,}]}>
            <View style={styles.titleContainer}>
                <View></View>
                <WordCard style={styles.wordText}>{word}</WordCard>
                {shouldShowLemma ? (
                    <Text style={styles.detailText}>({lemma})</Text>
                ) : null}
            </View>
            <View style={styles.underline} />
            {showDefinition ? (
                <DefCard style={styles.definitionText}>{definition}</DefCard>
            ) : null}
            {showButton ? (
                <View style={styles.videosContainer}>
                    <TouchableOpacity onPress={() => handlePress(url)} style={styles.signButton}>
                        <EvilIcons name="pencil" style={styles.iconButton}/>
                        <Text style={styles.linkText}>Learn More</Text>
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
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row',
        marginBottom: 15
    },
    wordText: {
        marginRight: 3,
        textTransform: 'uppercase'
    },
    detailText: {
        fontSize: 14,
        color: Colors.grey,
    },
    definitionText: {
        marginTop: 15,
        textAlign: 'center',
    },
    videosContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 5
    },
    signButton: {
        marginHorizontal: "2%",
        paddingHorizontal: '10%',
        paddingVertical: 8,
        borderRadius: 40,
        backgroundColor: Colors.grey,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconButton: {
        marginRight: 3,
        fontSize: 22,
        color: Colors.white
     },
    linkText: {
        fontSize: 14,
        color: Colors.white,
    },
    underline: {
        borderTopWidth: 0.5,
        borderTopColor: Colors.grey
    }
});

export default DictionnaryCard;
