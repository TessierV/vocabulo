import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import data from '../../data/data';
import { Colors } from '@/constants/Colors';
import DictionnaryCard from './DictionnaryCard';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwitchButton from './SwitchButton';
import letterImages from './letterImages';
import { InformationText } from '@/constants/StyledText';

// Map des catégories en noms complets
const categoryMap: { [key: string]: string } = {
    'n.': 'Nom',
    'n.m.': 'Nom masculin',
    'n.f.': 'Nom féminin',
    'v.': 'Verbe',
    'adv.': 'Adverbe',
    'adj.': 'Adjectif',
    'int.': 'Interjection',
    'Faute Ortho': 'Faute Ortho'
};
const ByCategory = Object.values(categoryMap);
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const extractData = (searchTerm: string, selectedCategory: string | null, selectedLetter: string | null) => {
    const rows = data.trim().split('\n').slice(1); // Ignorer la première ligne (entête)

    const words = rows.map((row, index) => {
        const [mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource] = row.split(',');
        return { id: `${index}-${mot}`, mot, categorie, definition, urlVideoDef, urlVideoMot, urlSource };
    });

    return words.filter(word => {
        const matchesSearchTerm = !searchTerm || word.mot.toLowerCase().startsWith(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || categoryMap[word.categorie] === selectedCategory;
        const matchesLetter = !selectedLetter || word.mot.toUpperCase().startsWith(selectedLetter);

        return matchesSearchTerm && matchesCategory && matchesLetter;
    });
};

const AllFilters = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [isTextMode, setIsTextMode] = useState<boolean>(false); // État pour le mode d'affichage

    useEffect(() => {
        if (searchTerm) {
            setSelectedCategory(null);
            setSelectedLetter(null);
        }
    }, [searchTerm]);

    const words = useMemo(() => extractData(searchTerm, selectedCategory, selectedLetter), [searchTerm, selectedCategory, selectedLetter]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSearchTerm(''); // Effacer le terme de recherche lorsque la catégorie est modifiée
    };

    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter === selectedLetter ? null : letter);
        setSearchTerm(''); // Effacer le terme de recherche lorsque la lettre est modifiée
    };

    const handleSwitchPress = () => {
        setIsTextMode(prevMode => !prevMode); // Alterner le mode d'affichage
    };

    const renderWordItem = ({ item }: { item: { id: string, mot: string, categorie: string, definition: string, urlVideoDef: string, urlVideoMot: string, urlSource: string } }) => (
        <DictionnaryCard
            key={item.id}
            mot={item.mot}
            categorie={categoryMap[item.categorie] || item.categorie}
            definition={item.definition}
            urlVideoDef={item.urlVideoDef}
            urlVideoMot={item.urlVideoMot}
            urlSource={item.urlSource}
        />
    );

    const renderAlphabetItem = ({ item }: { item: string }) => {
        if (item === 'Switch') {
            return (
                <TouchableOpacity onPress={handleSwitchPress} style={styles.switchButton}>
                    <SwitchButton onPress={handleSwitchPress} />
                </TouchableOpacity>
            );
        }

        const isSelected = item === selectedLetter;
        return (
            <TouchableOpacity
                onPress={() => handleLetterSelect(item)}
                style={[styles.alphabetButton, isSelected && styles.selectedButton]}
            >
                {isTextMode ? (
                    <InformationText style={styles.alphabetButtonText}>{item}</InformationText>
                ) : (
                    <Image
                        source={letterImages[item]}
                        style={styles.buttonImage}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Barre de recherche */}
            <View style={styles.searchContainer}>
                <EvilIcons name="search" style={styles.searchIcon} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Rechercher un mot..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

            {/* Filtres par catégorie */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
                <View style={styles.buttonsWrapper}>
                    {ByCategory.map(category => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handleCategorySelect(category)}
                            style={[styles.categoryButton, category === selectedCategory && styles.selectedButton]}
                        >
                            <InformationText style={styles.categoryButtonText}>{category}</InformationText>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Filtres par lettre */}
            <View style={styles.alphabetContainer}>
                <FlatList
                    data={[...alphabet, 'Switch']} // Ajout du bouton Switch à la liste
                    renderItem={renderAlphabetItem}
                    keyExtractor={(item) => item}
                    numColumns={10}
                />
            </View>

            {/* Affichage des résultats */}
            <FlatList
                data={words}
                renderItem={renderWordItem}
                keyExtractor={(item) => item.id}
                style={styles.dictionnaryContainer}
            />
        <View style={styles.footerContainer}>
    </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginHorizontal: 'auto',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        borderRadius: 40,
        width: '100%',
        height: 40,
        marginVertical: 10,
        marginBottom: '2%',
    },
    inputText: {
        color: Colors.black,
        fontFamily: 'MontserratRegular',
        fontSize: 12,
        flex: 1,
    },
    searchIcon: {
        marginRight: 10,
        fontSize: 20,
        color: Colors.black,
    },
    categoryScrollView: {
        position: 'absolute',
        marginVertical: '6%',
        width: '100%',
        height: 40,
        top: 40,
        flexDirection: 'row',
    },
    buttonsWrapper: {
        flexDirection: 'row',
    },
    categoryButton: {
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginHorizontal: 3,
    },
    selectedButton: {
        backgroundColor: Colors.lightCoral,
    },
    categoryButtonText: {
        color: Colors.black,
    },
    alphabetButtonText: {
        color: Colors.black,
    },
    alphabetContainer: {
        width: '100%',
        top: 40,
        marginVertical: '3%'
    },
    buttonImage: {
        width: '100%',
        height: '100%',
    },
    alphabetButton: {
        backgroundColor: Colors.white,
        padding: 7,
        borderRadius: 5,
        width: '10.5%',
        height: 45,
        margin: '1%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dictionnaryContainer: {
        height: '100%',
        marginTop: 10,
        top: '3%'
    },
    footerContainer: {
        height: '55%',
    },
    switchButton: {
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 5,
        backgroundColor: Colors.grey,
        margin: '1%',
    },
});

export default AllFilters;
