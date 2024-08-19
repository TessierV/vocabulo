import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import data from '../../data/data';
import { Colors } from '@/constants/Colors';
import DictionnaryCard from './DictionnaryCard';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwitchButton from './SwitchButton';
import letterImages from './letterImages';
import { InformationText } from '@/constants/StyledText';

type WordData = {
    id: string;
    mot: string;
    categorie: string;
    definition: string;
    urlVideoDef: string;
    urlVideoMot: string;
    urlSource: string;
};

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

const extractData = (searchTerm: string, selectedCategory: string | null, selectedLetter: string | null): WordData[] => {
    const rows = data.trim().split('\n').slice(1);

    const words: WordData[] = rows.map((row, index) => {
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

const groupByMot = (words: WordData[]): { [key: string]: WordData[] } => {
    return words.reduce((groups, word) => {
        if (!groups[word.mot]) {
            groups[word.mot] = [];
        }
        groups[word.mot].push(word);
        return groups;
    }, {} as { [key: string]: WordData[] });
};

const AllFilters = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [isTextMode, setIsTextMode] = useState<boolean>(false);

    useEffect(() => {
        if (searchTerm) {
            setSelectedCategory(null);
            setSelectedLetter(null);
        }
    }, [searchTerm]);

    const words = useMemo(() => extractData(searchTerm, selectedCategory, selectedLetter), [searchTerm, selectedCategory, selectedLetter]);
    const groupedWords = useMemo(() => groupByMot(words), [words]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSearchTerm('');
    };

    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter === selectedLetter ? null : letter);
        setSearchTerm('');
    };

    const handleSwitchPress = () => {
        setIsTextMode(prevMode => !prevMode);
    };

    const renderWordGroup = useCallback(({ item }: { item: [string, WordData[]] }) => {
        const [mot, words] = item;
        const isMultiple = words.length > 1;
        
        return (
            <View key={mot}>
                {isMultiple ? (
                    <FlatList
                        data={words}
                        renderItem={({ item: word }) => (
                            <DictionnaryCard
                                key={word.id}
                                mot={word.mot}
                                categorie={categoryMap[word.categorie] || word.categorie}
                                definition={word.definition}
                                urlVideoDef={word.urlVideoDef}
                                urlVideoMot={word.urlVideoMot}
                                urlSource={word.urlSource}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal={false} // Scroll vertical for multiple occurrences
                        showsVerticalScrollIndicator={true}
                        style={styles.verticalFlatList}
                    />
                ) : (
                    <DictionnaryCard
                        key={words[0].id}
                        mot={words[0].mot}
                        categorie={categoryMap[words[0].categorie] || words[0].categorie}
                        definition={words[0].definition}
                        urlVideoDef={words[0].urlVideoDef}
                        urlVideoMot={words[0].urlVideoMot}
                        urlSource={words[0].urlSource}
                    />
                )}
            </View>
        );
    }, []);

    const renderAlphabetItem = useCallback(({ item }: { item: string }) => {
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
    }, [handleSwitchPress, handleLetterSelect, isTextMode, selectedLetter]);

    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: any[] }) => {
        // Traitez les éléments visibles ici si nécessaire
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <EvilIcons name="search" style={styles.searchIcon} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Rechercher un mot..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

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

            <View style={styles.alphabetContainer}>
                <FlatList
                    data={[...alphabet, 'Switch']}
                    renderItem={renderAlphabetItem}
                    keyExtractor={(item) => item}
                    numColumns={10}
                />
            </View>

            <FlatList
                data={Object.entries(groupedWords)}
                renderItem={renderWordGroup}
                keyExtractor={(item) => item[0]}
                style={styles.dictionnaryContainer}
                horizontal={true}
                showsVerticalScrollIndicator={true}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50
                }}
            />
            
            <View style={styles.footerContainer} />
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
        marginVertical: '3%',
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
        marginTop: 30,
        top: '5%',
    },
    footerContainer: {
        height: '57%',
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
    verticalFlatList: {
        flex: 1,
        width: '100%',
    },
});

export default AllFilters;
