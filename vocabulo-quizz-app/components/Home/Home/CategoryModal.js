// CategoryModal.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryModal = ({ words }) => {
    if (!Array.isArray(words)) {
        console.error('Invalid words prop:', words);
        return <Text>Aucun mot disponible</Text>; // Affiche un message d'erreur si les données sont invalides
    }

    console.log('CategoryModal Words:', words); // Debugging

    return (
        <View style={styles.container}>
            {words.length > 0 ? (
                words.map(word => (
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
                ))
            ) : (
                <Text>Aucun mot disponible</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
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

export default CategoryModal;
