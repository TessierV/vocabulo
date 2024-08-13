// DictionnaryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors'; // Assurez-vous que le chemin est correct

interface InformationData {
    mot: string;
    categorie: string;
    definition: string;
    urlVideoDef: string;
    urlVideoMot: string;
    urlSource: string;
}

const DictionnaryCard: React.FC<InformationData> = ({ mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{mot}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Catégorie:</Text> {categorie}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Définition:</Text> {definition}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>URL Vidéo Définition:</Text> {urlVideoDef}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>URL Vidéo Mot:</Text> {urlVideoMot}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>URL Source:</Text> {urlSource}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: 15,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 16,
        marginVertical: 2,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default DictionnaryCard;
