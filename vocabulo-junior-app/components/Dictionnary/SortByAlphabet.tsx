import { View, TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native';
import React, { useState } from 'react';
import data from './../../data/data';  // Assurez-vous que le chemin est correct

import { Colors } from '@/constants/Colors';
import DictionnaryCard from './DictionnaryCard';
import SortByAphabetLSF from './SortByAphabetLSF'; // Importez le composant ici
import SwitchButton from './SwitchButton'; // Importez le composant SwitchButton

type Letter = string;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const extractData = (letter: Letter) => {
    const rows = data.trim().split('\n').slice(1); // Ignorer la première ligne (entête)
    
    const words = rows.map((row, index) => {
        const [mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource] = row.split(',');
        return { id: `${index}-${mot}`, mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource };
    });
    
    return words.filter(word => word.mot.toUpperCase().startsWith(letter));
};

export default function SortByAlphabet() {
    const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
    const [showSortByAphabetLSF, setShowSortByAphabetLSF] = useState(false);

    const handlePress = (letter: Letter) => {
        setSelectedLetter(selectedLetter === letter ? null : letter);
        setShowSortByAphabetLSF(false);  // Assurez-vous que nous ne montrons pas SortByAphabetLSF
    };

    const handleSwitchPress = () => {
        setShowSortByAphabetLSF(true);
    };

    const renderItem = ({ item }: { item: Letter }) => {
        const isSelected = item === selectedLetter;
        return (
            <TouchableOpacity
                onPress={() => handlePress(item)}
                style={[styles.button, isSelected && styles.selectedButton]}
            >
                <Text style={styles.buttonText}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderWordItem = ({ item }: { item: { id: string, mot: string, categorie: string, definition: string, urlVideoDef: string, urlVideoMot: string, urlSource: string } }) => (
        <DictionnaryCard
            key={item.id}
            mot={item.mot}
            categorie={item.categorie}
            definition={item.definition}
            urlVideoDef={item.urlVideoDef}
            urlVideoMot={item.urlVideoMot}
            urlSource={item.urlSource}
        />
    );

    const words = selectedLetter ? extractData(selectedLetter) : [];

    const items = [...alphabet, 'Switch']; // Ajouter 'Switch' après Z

    return (
        <View style={styles.container}>
            {showSortByAphabetLSF ? (
                <SortByAphabetLSF />
            ) : (
                <>
                    <FlatList
                        data={items}
                        renderItem={({ item }) =>
                            item === 'Switch' ? (
                                <SwitchButton onPress={handleSwitchPress} style={styles.switchButton} />
                            ) : (
                                renderItem({ item })
                            )
                        }
                        keyExtractor={(item) => item}
                        numColumns={10}
                        style={styles.alphabetContainer}
                    />
                    {selectedLetter && (
                        <FlatList
                            data={words}
                            renderItem={renderWordItem}
                            keyExtractor={(item) => item.id}  // Utilisez l'ID comme clé
                            style={styles.DictionnaryContainer}
                        />
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        marginHorizontal: 'auto',
    },
    alphabetContainer: {
        height: 230,
        marginBottom: '5%',
    },
    button: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '10.5%',
        height: 45,
        margin: '1%',
    },
    selectedButton: {
        backgroundColor: Colors.lightCoral,
    },
    buttonText: {
        color: Colors.black,
    },
    DictionnaryContainer: {
        marginBottom: '14%',
    },
    switchButton: {
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        backgroundColor: Colors.grey,
        margin: '1%',
    },
});