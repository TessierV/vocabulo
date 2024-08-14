import { View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import data from './../../data/data';  

import { Colors } from '@/constants/Colors';
import DictionnaryCard from './DictionnaryCard';
import SortByAlphabet from './SortByAlphabet'; 
import SwitchButton from './SwitchButton';

type Letter = string;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const letterImages: { [key: string]: any } = {
    A: require('./../../assets/images/pictoLSF/A.png'),
    B: require('./../../assets/images/pictoLSF/B.png'),
    C: require('./../../assets/images/pictoLSF/C.png'),
    D: require('./../../assets/images/pictoLSF/D.png'),
    E: require('./../../assets/images/pictoLSF/E.png'),
    F: require('./../../assets/images/pictoLSF/F.png'),
    G: require('./../../assets/images/pictoLSF/G.png'),
    H: require('./../../assets/images/pictoLSF/H.png'),
    I: require('./../../assets/images/pictoLSF/I.png'),
    J: require('./../../assets/images/pictoLSF/J.png'),
    K: require('./../../assets/images/pictoLSF/K.png'),
    L: require('./../../assets/images/pictoLSF/L.png'),
    M: require('./../../assets/images/pictoLSF/M.png'),
    N: require('./../../assets/images/pictoLSF/N.png'),
    O: require('./../../assets/images/pictoLSF/O.png'),
    P: require('./../../assets/images/pictoLSF/P.png'),
    Q: require('./../../assets/images/pictoLSF/Q.png'),
    R: require('./../../assets/images/pictoLSF/R.png'),
    S: require('./../../assets/images/pictoLSF/S.png'),
    T: require('./../../assets/images/pictoLSF/T.png'),
    U: require('./../../assets/images/pictoLSF/U.png'),
    V: require('./../../assets/images/pictoLSF/V.png'),
    W: require('./../../assets/images/pictoLSF/W.png'),
    X: require('./../../assets/images/pictoLSF/X.png'),
    Y: require('./../../assets/images/pictoLSF/Y.png'),
    Z: require('./../../assets/images/pictoLSF/Z.png'),
};

const extractData = (letter: Letter) => {
    const rows = data.trim().split('\n').slice(1); 

    return rows.map((row, index) => {
        const [mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource] = row.split(',');
        return { id: `${index}-${mot}`, mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource };
    }).filter(word => word.mot.toUpperCase().startsWith(letter));
};

export default function SortByAphabetLSF() {
    const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
    const [showSortByAlphabet, setShowSortByAlphabet] = useState(false);

    const handlePress = (letter: Letter) => {
        setSelectedLetter(selectedLetter === letter ? null : letter);
        setShowSortByAlphabet(false);
    };

    const handleSwitchPress = () => setShowSortByAlphabet(true);

    const renderAlphabetItem = ({ item }: { item: Letter }) => {
        const isSelected = item === selectedLetter;
        return (
            <TouchableOpacity
                onPress={() => handlePress(item)}
                style={[styles.button, isSelected && styles.selectedButton]}
            >
                <Image
                    source={letterImages[item]}
                    style={styles.buttonImage}
                    resizeMode="contain"
                />
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
    const items = [...alphabet, 'Switch'];

    return (
        <View style={styles.container}>
            {showSortByAlphabet ? (
                <SortByAlphabet />
            ) : (
                <>
                    <FlatList
                        data={items}
                        renderItem={({ item }) =>
                            item === 'Switch' ? (
                                <SwitchButton onPress={handleSwitchPress} style={styles.switchButton} />
                            ) : (
                                renderAlphabetItem({ item })
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
                            keyExtractor={(item) => item.id}
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
        flex: 1,
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
    buttonImage: {
        width: '100%',
        height: '100%',
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
