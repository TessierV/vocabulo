// This file defines the AllFilters component which is responsible for rendering a search and filter UI for words.
// It includes filters by category, alphabet, and sort options (alphabetical).
// It also allows the user to switch between text and image modes for the alphabet buttons.

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

import { InformationText } from '@/constants/StyledText';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { getColorForPOS } from '../ScannedText/PosColors';
import letterImages from './letterImages';
import LikedCardsList from '../ScannedText/LikedCardsList';
import SwitchButton from './SwitchButton';


// Define categories using Part of Speech (POS)
enum POSCategory {
    NOUN = 'Nom',
    VERB = 'Verbe',
    ADJ = 'Adjectif',
}

// Create a map for the categories
const categoryMap: { [key in keyof typeof POSCategory]: string } = POSCategory;

// Define alphabet and category filters
const ByCategory = Object.values(categoryMap);
const alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');

const AllFilters = () => {
    // Define state variables for managing filters, sort options, and UI modes
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term for word search
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Selected category
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null); // Selected letter
    const [isTextMode, setIsTextMode] = useState<boolean>(false); // Toggle between text and image mode for letters
    const [cardsRefreshKey, setCardsRefreshKey] = useState<number>(0); // Key for refreshing the card list
    const [sortDirection, setSortDirection] = useState<'A-Z' | 'Z-A'>('A-Z'); // Sort direction: alphabetically A-Z or Z-A
    const [isSortByAlphabetSelected, setIsSortByAlphabetSelected] = useState<boolean>(true); // Whether sorting alphabetically is selected

    const flatListRef = useRef<FlatList<any> | null>(null); // Reference to FlatList for scrolling purposes

    // Reset category and letter selection when a search term is entered
    useEffect(() => {
        if (searchTerm) {
            setSelectedCategory(null);
            setSelectedLetter(null);
        }
    }, [searchTerm]);

    // Refresh the card list when the screen is focused
    useFocusEffect(
        useCallback(() => {
            setCardsRefreshKey(prevKey => prevKey + 1); // Refresh cards each time the screen becomes active
        }, [])
    );

    // Handle category selection logic
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSearchTerm('');
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true }); // Scroll to top when a category is selected
    };

    // Handle letter selection logic
    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter === selectedLetter ? null : letter);
        setSearchTerm('');
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true }); // Scroll to top when a letter is selected
    };

    // Handle switching between text and image mode for the alphabet
    const handleSwitchPress = () => {
        setIsTextMode(prevMode => !prevMode);
    };

    // Refresh the card list manually
    const handleRefresh = () => {
        setCardsRefreshKey(prevKey => prevKey + 1);
    };

    // Sort the list alphabetically and toggle the sort direction
    const sortByAlphabet = () => {
        setSortDirection(prevDirection => (prevDirection === 'A-Z' ? 'Z-A' : 'A-Z'));
        setIsSortByAlphabetSelected(true);
    };

    // Render alphabet items (letters or switch button)
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
                    <Image
                        source={letterImages[item]}
                        style={[styles.buttonImage, isSelected && styles.selectedImage]}
                        resizeMode="contain"
                    />
                ) : (
                    <InformationText
                        style={[styles.alphabetButtonText, isSelected && { color: Colors.white }]}
                    >
                        {item}
                    </InformationText>
                )}
            </TouchableOpacity>
        );
    }, [handleSwitchPress, handleLetterSelect, isTextMode, selectedLetter]);

    return (
        <View style={styles.container}>
            {/* Search and Sort Controls */}
            <View style={styles.searchAndFilterContainer}>
                <View style={styles.searchContainer}>
                    <EvilIcons name="search" style={styles.searchIcon} />
                    <TextInput
                        style={styles.inputText}
                        placeholder="Rechercher un mot..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>
                <TouchableOpacity
                    onPress={sortByAlphabet}
                    style={[styles.sortByAlphabetButton, isSortByAlphabetSelected && styles.selectedSortByAlphabetButton]}
                >
                    <Ionicons name="filter-outline" style={styles.sortByAlphabetIcon} />
                    <InformationText style={styles.sortByAlphabetText}>
                        {sortDirection}
                    </InformationText>
                </TouchableOpacity>
            </View>

            {/* Category Filters */}
            <View style={styles.categoryButtonContainer}>
                {ByCategory.map(category => {
                    const posIdentifier = Object.keys(categoryMap).find(
                        key => categoryMap[key as keyof typeof categoryMap] === category
                    );
                    const colorInfo = getColorForPOS(posIdentifier || '');

                    const isSelected = category === selectedCategory;
                    return (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handleCategorySelect(category)}
                            style={[styles.categoryButton, isSelected && { backgroundColor: colorInfo.color }]}
                        >
                            <InformationText
                                style={[styles.categoryButtonText, isSelected && { color: Colors.white }]}
                            >
                                {category}
                            </InformationText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Alphabet Buttons */}
            <View style={styles.alphabetContainer}>
                <FlatList
                    data={[...alphabet, 'Switch']}
                    renderItem={renderAlphabetItem}
                    keyExtractor={(item) => item}
                    numColumns={9}
                />
            </View>

            {/* Liked Cards List */}
            <ScrollView style={styles.dictionnaryContainer}>
                <LikedCardsList
                    refreshKey={cardsRefreshKey}
                    selectedCategory={selectedCategory}
                    selectedLetter={selectedLetter}
                    searchTerm={searchTerm}
                    sortDirection={sortDirection}
                />
            </ScrollView>

            {/* Footer */}
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
        borderWidth: 1,
        borderColor: Colors.neutralGrey,
        borderRadius: 8,
        height: 40,
        width: '80%',
        paddingHorizontal: '5%',
        marginVertical: 15,
    },
    inputText: {
        color: Colors.black,
        fontFamily: 'MontserratRegular',
        fontSize: 14,
        flex: 1,
    },
    searchIcon: {
        marginRight: 10,
        fontSize: 20,
        color: Colors.black,
    },
    searchAndFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    sortByAlphabetButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        height: 40,
        paddingHorizontal: '2%',
        marginLeft: '2%',
    },
    selectedSortByAlphabetButton: {
        backgroundColor: Colors.grey,
    },
    sortByAlphabetText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.white
    },
    sortByAlphabetIcon: {
        fontSize: 16,
        color: Colors.white,
        marginRight: '4%'
    },
    categoryButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryButton: {
        backgroundColor: Colors.white,
        width: '32%',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
    },
    selectedButton: {
        backgroundColor: Colors.neutralGrey,
    },
    categoryButtonText: {
        color: Colors.black,
    },
    alphabetButtonText: {
        color: Colors.black,
    },
    alphabetContainer: {
        width: '100%',
        marginVertical: 15,
    },
    buttonImage: {
        width: '100%',
        height: '100%',
    },
    alphabetButton: {
        backgroundColor: Colors.white,
        borderColor: Colors.neutralGrey,
        padding: 7,
        borderRadius: 7,
        width: '9.75%',
        height: 45,
        margin: '0.7%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedImage: {
        tintColor: Colors.white,
        width: '100%',
        height: '100%',
    },
    dictionnaryContainer: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        padding: 0
    },
    footerContainer: {
        height: '56%',
        justifyContent: 'flex-end',
    },
    switchButton: {
        width: '9.75%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 7,
        backgroundColor: Colors.grey,
        margin: '0.7%',
    },
    switchButtonText: {
        color: Colors.white,
    },
});

export default AllFilters;
