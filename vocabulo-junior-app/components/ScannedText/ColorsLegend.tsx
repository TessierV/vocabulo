import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ModalText } from '@/constants/StyledText';
import { getColorForPOS } from './PosColors';

interface ColorsLegendItem {
    pos: string;
    description: string;
    color: string;
}

const ColorsLegendItems: ColorsLegendItem[] = [
    { pos: 'NOUN', description: 'Nom', color: getColorForPOS('NOUN') },
    { pos: 'VERB', description: 'Verbe', color: getColorForPOS('VERB') },
    { pos: 'ADJ', description: 'Adjectif', color: getColorForPOS('ADJ') },
    { pos: 'ADP', description: 'Adposition', color: getColorForPOS('ADP') },
    { pos: 'DET', description: 'Déterminant', color: getColorForPOS('DET') },
    { pos: 'PRON', description: 'Pronom', color: getColorForPOS('PRON') },
    { pos: 'PROPN', description: 'Nom propre', color: getColorForPOS('PROPN') },
    { pos: 'ADV', description: 'Adverbe', color: getColorForPOS('ADV') },
    { pos: 'CCONJ', description: 'Conjonction de coordination', color: getColorForPOS('CCONJ') },
    { pos: 'SCONJ', description: 'Conjonction de subordination', color: getColorForPOS('SCONJ') },
    { pos: 'INTJ', description: 'Interjection', color: getColorForPOS('INTJ') },
    { pos: 'NUM', description: 'Numéro', color: getColorForPOS('NUM') },
    { pos: 'AUX', description: 'Auxiliaire', color: getColorForPOS('AUX') },
];

const ColorsLegend: React.FC = () => (
    <View style={styles.container}>
        {ColorsLegendItems.map(item => (
            <View key={item.pos} style={styles.ColorsLegendItem}>
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
    ColorsLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    colorSquare: {
        width: 20,
        height: 20,
        borderRadius: 3,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        color: Colors.grey,
    },
});

export default ColorsLegend;
