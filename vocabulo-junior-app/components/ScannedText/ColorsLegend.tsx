// ColorsLegend.tsx
// This file defines a React Native component that renders a legend displaying different colors
// associated with various parts of speech (POS) categories. Each category is displayed with a
// colored square and a descriptive label.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import { ModalText } from '@/constants/StyledText'; 

import { getColorForPOS } from './PosColors';


interface ColorsLegendItem {
    pos: 'NOUN' | 'VERB' | 'ADJ' | 'ADV' | 'OTHERS';
    description: string;
    color: string;
}

const ColorsLegendItems: ColorsLegendItem[] = [
    { pos: 'NOUN', description: 'Nom', color: getColorForPOS('NOUN').color },
    { pos: 'VERB', description: 'Verbe', color: getColorForPOS('VERB').color },
    { pos: 'ADJ', description: 'Adjectif', color: getColorForPOS('ADJ').color },
    { pos: 'ADV', description: 'Adverbe', color: getColorForPOS('ADV').color },
    {
        pos: 'OTHERS',
        description: 'Autres catégories grammaticales',
        color: getColorForPOS('OTHERS').color,
    },
];

const ColorsLegend: React.FC = () => (
    <View style={styles.container}>
        {ColorsLegendItems.map(item => (
            <View key={item.pos} style={styles.legendItem}>
                <View style={[styles.colorSquare, { backgroundColor: item.color }]} />
                <ModalText style={styles.description}>{item.description}</ModalText>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20,
        backgroundColor: Colors.white,
    },
    legendItem: { // Updated style name for clarity
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    colorSquare: {
        borderWidth: 0.1,
        borderColor: Colors.black,
        width: 20,
        height: 20,
        borderRadius: 15,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        color: Colors.grey,
    },
});

export default ColorsLegend;