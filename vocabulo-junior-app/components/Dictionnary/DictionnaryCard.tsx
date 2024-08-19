import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SourceCard, VideoButtonCard, WordCard, CategoryCard } from '@/constants/StyledText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <WordCard style={styles.wordText}>{mot}</WordCard>
                <CategoryCard style={styles.categoryText}>({categorie})</CategoryCard>
            </View>
            <View style={styles.underline} />
            <Text style={styles.defText}>{cleanDefinition(definition)}</Text>
            <View style={styles.videosContainer}>
                {urlVideoMot && urlVideoMot !== 'Non spécifié' ? (
                    <TouchableOpacity onPress={() => handlePress(urlVideoMot)} style={styles.wordButton}>
                        <VideoButtonCard>Mot</VideoButtonCard>
                    </TouchableOpacity>
                ) : null}
                {urlVideoDef && urlVideoDef !== 'Non spécifié' ? (
                    <TouchableOpacity onPress={() => handlePress(urlVideoDef)} style={styles.defButton}>
                        <VideoButtonCard>Définition</VideoButtonCard>
                    </TouchableOpacity>
                ) : null}
            </View>
            <View style={styles.underline} />
            {urlSource ? (
                <TouchableOpacity onPress={() => handlePress(urlSource)} style={styles.sourceButton}>
                    <MaterialCommunityIcons name="web" style={styles.sourceIcon}/>
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
        borderRadius: 5,
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
        paddingVertical: 4,
        borderRadius: 100,
        backgroundColor: Colors.grey
    },
    wordButton: {
        marginHorizontal: "2%",
        paddingHorizontal: '10%',
        paddingVertical: 4,
        borderRadius: 100,
        backgroundColor: Colors.grey
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
