import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwitchButton from './SwitchButton';
import letterImages from './letterImages';
import { InformationText } from '@/constants/StyledText';
import LikedCardsList from '../ScannedText/LikedCardsList';
import { getColorForPOS } from '../ScannedText/PosColors';

enum POSCategory {
    NOUN = 'Nom',
    VERB = 'Verbe',
    ADJ = 'Adjectif',
}

const categoryMap: { [key in keyof typeof POSCategory]: string } = POSCategory;

const ByCategory = Object.values(categoryMap);
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AllFilters = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [isTextMode, setIsTextMode] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState<number>(0);

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
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter === selectedLetter ? null : letter);
        setSearchTerm('');
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
        setRefreshKey(prevKey => prevKey + 1);
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
                    <InformationText
                        style={[styles.alphabetButtonText, isSelected && { color: Colors.white }]}
                    >
                        {item}
                    </InformationText>
                ) : (
                    <Image
                        source={letterImages[item]}
                        style={[styles.buttonImage, isSelected && styles.selectedImage]}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        );
    }, [handleSwitchPress, handleLetterSelect, isTextMode, selectedLetter]);

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
                    numColumns={10}
                />
            </View>
            <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                <EvilIcons name="retweet" style={styles.refreshIcon} />
            </TouchableOpacity>
            <ScrollView style={styles.dictionnaryContainer}>
                <LikedCardsList 
                    refreshKey={refreshKey} 
                    selectedCategory={selectedCategory} 
                    selectedLetter={selectedLetter} 
                    searchTerm={searchTerm} 
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
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        borderRadius: 40,
        width: '100%',
        height: 40,
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
        borderWidth: 0.6,
        backgroundColor: Colors.whiteTransparent,
        borderColor: Colors.neutralGrey,
        padding: 7,
        borderRadius: 7,
        width: '10.5%',
        height: 45,
        margin: '1%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedImage: {
        tintColor: Colors.white,
        width: '100%',
        height: '100%',
    },
    dictionnaryContainer: {
        height: '100%',
        marginTop: 0,
        padding: 0,
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
    switchButtonText: {
        color: Colors.white,
    },
});

export default AllFilters;
