import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwitchButton from './SwitchButton';
import letterImages from './letterImages'; // Assurez-vous que ce module est correct
import { ButtonText, InformationText } from '@/constants/StyledText';
import LikedCardsList from '../ScannedText/LikedCardsList';
import { getColorForPOS } from '../ScannedText/PosColors'; // Assurez-vous que cette fonction existe
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native'; // Importer useFocusEffect

enum POSCategory {
    NOUN = 'Nom',
    VERB = 'Verbe',
    ADJ = 'Adjectif',
}

const categoryMap: { [key in keyof typeof POSCategory]: string } = POSCategory;

const ByCategory = Object.values(categoryMap);
const alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');

const AllFilters = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [isTextMode, setIsTextMode] = useState<boolean>(false);
    const [cardsRefreshKey, setCardsRefreshKey] = useState<number>(0);
    const [sortDirection, setSortDirection] = useState<'A-Z' | 'Z-A'>('A-Z');
    const [isSortByDateSelected, setIsSortByDateSelected] = useState<boolean>(false);
    const [isSortByAlphabetSelected, setIsSortByAlphabetSelected] = useState<boolean>(true);

    const rotateAnim = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<any> | null>(null);

    useEffect(() => {
        if (searchTerm) {
            setSelectedCategory(null);
            setSelectedLetter(null);
        }
    }, [searchTerm]);

    useFocusEffect(
        useCallback(() => {
            setCardsRefreshKey(prevKey => prevKey + 1); // Rafraîchit les cartes chaque fois que l'écran devient actif
        }, [])
    );

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSearchTerm('');
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter === selectedLetter ? null : letter);
        setSearchTerm('');
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const handleSwitchPress = () => {
        setIsTextMode(prevMode => !prevMode);
    };

    const handleRefresh = () => {
        setCardsRefreshKey(prevKey => prevKey + 1);
    };

    const sortByAphabet = () => {
        setSortDirection(prevDirection => (prevDirection === 'A-Z' ? 'Z-A' : 'A-Z'));
        setIsSortByAlphabetSelected(true);
        setIsSortByDateSelected(false);
    };

    const sortByDate = () => {
        setIsSortByDateSelected(true);
        setIsSortByAlphabetSelected(false);

        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            })
        ]).start();
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

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
    }, [handleSwitchPress, handleLetterSelect, isTextMode, selectedLetter, rotateAnim]);

    return (
        <View style={styles.container}>
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
                    onPress={sortByAphabet}
                    style={[styles.sortByAphabetButton, isSortByAlphabetSelected && styles.selectedSortByAphabetButton]}
                >
                    <Ionicons name="filter-outline" style={styles.sortByAphabetIcon} />
                    <InformationText style={styles.sortByAphabetText}>
                        {sortDirection}
                    </InformationText>
                </TouchableOpacity>
            </View>
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
            <View style={styles.alphabetContainer}>
                <FlatList
                    data={[...alphabet, 'Switch']}
                    renderItem={renderAlphabetItem}
                    keyExtractor={(item) => item}
                    numColumns={9}
                />
            </View>


            <ScrollView style={styles.dictionnaryContainer}>
                <LikedCardsList
                    refreshKey={cardsRefreshKey} 
                    selectedCategory={selectedCategory} 
                    selectedLetter={selectedLetter} 
                    searchTerm={searchTerm} 
                    sortDirection={sortDirection}
                />
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
    sortByAphabetButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        height: 40,
        paddingHorizontal: '2%',
        marginLeft: '2%',
    },
    selectedSortByAphabetButton: {
        backgroundColor: Colors.grey,
    },
    sortByAphabetText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.white
    },
    sortByAphabetIcon: {
        fontSize: 16,
        color: Colors.white,
        marginRight: '4%'
    },
    refreshButton: {
        paddingBottom: 5,
        alignSelf: 'center',
    },
    refreshIcon: {
        fontSize: 30,
        color: Colors.black,
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
