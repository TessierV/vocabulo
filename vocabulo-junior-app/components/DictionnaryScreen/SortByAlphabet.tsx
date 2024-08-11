import { View, TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';


type Letter = string;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function SortByAlphabet() {
    const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

    const handlePress = (letter: Letter) => {
        setSelectedLetter(selectedLetter === letter ? null : letter);
    };

    const renderItem = ({ item }: { item: Letter }) => {
        const isSelected = item === selectedLetter;
        return (
            <TouchableOpacity
                onPress={() => handlePress(item)}
                style={[styles.button, isSelected && styles.selectedButton]}
            >
                <InformationText style={styles.buttonText}>
                    {item}
                </InformationText>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={alphabet}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                numColumns={10}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 'auto',
        justifyContent: 'space-between',
        marginHorizontal: 'auto',
        top: 50,
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
});
