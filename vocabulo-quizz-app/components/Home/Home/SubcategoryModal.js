// SubcategoryModal.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubcategoryModal = ({ subcategory }) => {
    if (!subcategory || !Array.isArray(subcategory.words)) {
        console.error('Invalid subcategory prop:', subcategory);
        return <Text>Aucun mot disponible</Text>;  // Affiche un message d'erreur si les données sont invalides
    }

    console.log('SubcategoryModal Subcategory:', subcategory); // Debugging

    return (
        <View style={styles.container}>
            <View style={styles.subcategoryDetailContainer}>
                <Text style={styles.subcategoryTitle}>
                    {subcategory.subcategory_name}
                </Text>
                <Text style={styles.subcategoryTitle}>
                    {subcategory.countSelected} / {subcategory.wordCount} mots
                </Text>
                {subcategory.words.map((word) => (
                    <View key={word.mot_id} style={styles.wordItemContainer}>
                        <Text style={styles.word}>{word.mot}</Text>
                        <Text style={styles.definition}>{word.definition}</Text>
                        {word.signes && word.signes.map((signe, index) => (
                            <View key={index}>
                                <Text>Sign URL: {signe.url_sign || 'Non spécifié'}</Text>
                                <Text>Definition URL: {signe.url_def || 'Non spécifié'}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    subcategoryDetailContainer: {
        marginBottom: 10,
    },
    subcategoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'pink',
    },
    wordItemContainer: {
        marginBottom: 10,
    },
    word: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    definition: {
        fontSize: 14,
        color: 'gray',
    },
});

export default SubcategoryModal;
