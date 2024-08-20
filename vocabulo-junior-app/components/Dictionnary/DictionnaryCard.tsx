import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SourceCard, VideoButtonCard, WordCard, CategoryCard, DefCard } from '@/constants/StyledText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const { width: screenWidth } = Dimensions.get('window');

interface InformationData {
    mot: string;
    categorie: string;
    definition: string;
    urlVideoDef: string;
    urlVideoMot: string;
    urlSource: string;
}

const cleanDefinition = (definition: string) => {
    let cleanedDefinition = definition.replace(/["]/g, '');
    cleanedDefinition = cleanedDefinition.replace(/;/g, ',');
    cleanedDefinition = cleanedDefinition.replace(/\./g, '');
    cleanedDefinition = cleanedDefinition.replace(/([?!])(\s|$)/g, '$1.$2');
    if (cleanedDefinition.length > 0) {
        cleanedDefinition = cleanedDefinition.charAt(0).toUpperCase() + cleanedDefinition.slice(1);
    }
    if (!cleanedDefinition.endsWith('.')) {
        cleanedDefinition += '.';
    }
    return cleanedDefinition;
};

const isValidUrl = (url: string) => {
    try {
        // Check if URL is valid by creating a URL object
        new URL(url);
        // If needed, add specific domain checks here. For now, it allows any valid URL.
        return true;
    } catch (e) {
        console.error('Invalid URL:', url, e);
        return false;
    }
};

const handlePress = async (url: string) => {
    try {
        if (isValidUrl(url)) {
            await Linking.openURL(url);
        } else {
            console.error('Invalid or unsupported URL:', url);
        }
    } catch (error) {
        console.error('Failed to open URL:', error);
    }
};

const DictionnaryCard: React.FC<InformationData> = React.memo(({ mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource }) => {
    // Check if any URL is 'Non spécifié'
    if (urlVideoDef === 'Non spécifié' || urlVideoMot === 'Non spécifié' || urlSource === 'Non spécifié') {
        return null; // Do not render the card
    }

    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <WordCard style={styles.wordText}>{mot}</WordCard>
                <CategoryCard style={styles.categoryText}>({categorie})</CategoryCard>
            </View>
            <View style={styles.underline} />
            <DefCard style={styles.defText}>{cleanDefinition(definition)}</DefCard>
            <View style={styles.videosContainer}>
                <TouchableOpacity onPress={() => handlePress(urlVideoMot)} style={styles.signButton}>
                <EvilIcons name="pointer" style={styles.iconButton}/>
                    <VideoButtonCard>Signe</VideoButtonCard>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress(urlVideoDef)} style={styles.defButton}>
                <EvilIcons name="pencil" style={styles.iconButton}/>
                    <VideoButtonCard>Définition</VideoButtonCard>
                </TouchableOpacity>
            </View>
            <View style={styles.underline} />
            {urlSource ? (
                <TouchableOpacity onPress={() => handlePress(urlSource)} style={styles.sourceButton}>
                    <MaterialCommunityIcons name="web" style={styles.sourceIcon} />
                    <SourceCard>SOURCE WEB</SourceCard>
                </TouchableOpacity>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: screenWidth * 0.85,
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
    categoryText: {
        marginLeft: 3
    },
    defText: {
        marginTop: 20,
        textAlign: 'center',
    },
    videosContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20
    },
    defButton: {
        marginHorizontal: "2%",
        paddingHorizontal: '10%',
        paddingVertical: 8,
        borderRadius: 40,
        backgroundColor: Colors.grey,
        flexDirection: 'row',
        alignItems: 'center'
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
    sourceIcon: {
        fontSize: 14,
        color: Colors.lightGrey,
        marginRight: 2
    },
    sourceButton: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 5
    },
    underline: {
       borderTopWidth: 1,
       borderTopColor: Colors.lightGrey
    }
});

export default DictionnaryCard;
