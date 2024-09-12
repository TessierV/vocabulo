import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwitchButton from './SwitchButton';
import letterImages from './letterImages';
import { InformationText } from '@/constants/StyledText';
import LikedCardsList from '../ScannedText/LikedCardsList';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const categoryMap: { [key: string]: string } = {
    'n.': 'Nom',
    'n.m.': 'Nom masculin',
    'n.f.': 'Nom féminin',
    'v.': 'Verbe',
    'adj.': 'Adjectif',
    'prep.': 'Préposition',
    'det.': 'Déterminent',
    'pro.': 'Pronom',
    'n.p.': 'Nom propre',
    'adv.': 'Adverbe',
    'int.': 'Interjection',
    'conj.': 'Conjonction',
    'Faute Ortho': 'Faute Ortho'
};

const ByCategory = Object.values(categoryMap);
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AllFilters = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [isTextMode, setIsTextMode] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    // Référence pour FlatList des mots
    const flatListRef = useRef<FlatList<any> | null>(null);

    useEffect(() => {
        if (searchTerm) {
            setSelectedCategory(null);
            setSelectedLetter(null);
        }
    }, [searchTerm]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSearchTerm('');

        // Défilement vers le haut de la liste des mots
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter === selectedLetter ? null : letter);
        setSearchTerm('');

        // Défilement vers le haut lorsque la lettre est sélectionnée
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    const handleSwitchPress = () => {
        setIsTextMode(prevMode => !prevMode);
    };

    const handleRefresh = () => {
        setSearchTerm('');
        setSelectedCategory(null);
        setSelectedLetter(null);
        setRefreshKey(prevKey => prevKey + 1); // Change la clé pour rafraîchir les cartes
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

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

            <ScrollView style={styles.dictionnaryContainer}>
            <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                    <EvilIcons name="retweet" style={styles.refreshIcon}/>
                </TouchableOpacity>
                {/* Affichage des cartes likées */}
                <LikedCardsList refreshKey={refreshKey} />
            </ScrollView>

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
    refreshButton: {
        padding: 10,
        alignSelf: 'center'
      },
      refreshIcon: {
        fontSize: 30,
        color: Colors.black
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
        backgroundColor: Colors.neutralGreen,
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
        marginTop: 0,
        padding: 0,
        top: '3%',
    },
    footerContainer: {
        height: '56%',
        justifyContent: 'flex-end',
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
    noDataText: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center',
        marginTop: 50,
    },
});

export default AllFilters;
