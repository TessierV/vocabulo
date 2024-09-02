// GridCardHome.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import SvgIcon from '@/SVG/CategorySvgIcon';
import { BigTitle, Paragraph } from '@/constants/StyledText';
import { Feather } from '@expo/vector-icons';
import CategoryModal from '@/components/Home/Home/CategoryModal';
import SubcategoryModal from '@/components/Home/Home/SubcategoryModal';
import useFilter from '@/components/Home/Home/useFilter';
import { useRouter } from 'expo-router';

const GridCardHome = () => {
    const [darkMode] = useDarkMode();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter, applyFilter] = useFilter();
    const router = useRouter();

    const screenWidth = Dimensions.get('window').width;
    const squareSize = screenWidth / 3 - 25;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://192.168.0.12:3000/api/categories');
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedCategory(null);
    };

    const getTotalFilteredWordCount = (category) => {
        let totalFilteredCount = 0;

        if (Array.isArray(category.categoryWords)) {
            const { count: mainCategoryCount } = applyFilter(category.categoryWords);
            totalFilteredCount += mainCategoryCount;
        }

        (category.subcategories || []).forEach(subcategory => {
            const { count: subCategoryCount } = applyFilter(subcategory.words || []);
            totalFilteredCount += subCategoryCount;
        });

        return totalFilteredCount;
    };

    // GridCardHome.js
    const handleNavigateToWordList = () => {
        if (selectedCategory) {
            const { filteredWords: filteredMainCategoryWords } = applyFilter(selectedCategory.categoryWords || []);
            const filteredSubcategories = (selectedCategory.subcategories || []).map(subcategory => {
                const { filteredWords: filteredWords, count } = applyFilter(subcategory.words || []);
                return {
                    ...subcategory,
                    words: filteredWords,
                    countSelected: count,
                };
            });


            closeModal();

            router.push({
                pathname: `/wordlist/${selectedCategory.categorie_id}`,
                params: {
                    mainCategoryWords: filteredMainCategoryWords,
                    subcategories: filteredSubcategories,
                    filter: filter,
                },
            });
        }
    };



    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={darkMode ? color.neutralCoral : color.neutralCoral} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
            <BigTitle style={{ color: darkMode ? color.neutralCoral : color.neutralCoral, marginBottom: 20 }}>
                Text
            </BigTitle>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {categories.map((category) => (
                    <View key={category.categorie_id}>
                        <TouchableOpacity
                            style={[
                                styles.subcategoryContainer,
                                {
                                    width: squareSize,
                                    height: squareSize,
                                }
                            ]}
                            onPress={() => handleCategoryClick(category)}
                        >
                            <SvgIcon icon={category.categorie_name} fillColor={color.neutralCoral} />
                            <View>
                                <Paragraph style={{ textAlign: 'center', fontSize: 13, paddingTop: 5, color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>
                                    {category.categorie_name}
                                </Paragraph>
                                <Paragraph style={{ textAlign: 'center', fontSize: 10, color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>
                                    {category.totalWordCount} mots
                                </Paragraph>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {selectedCategory && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <Feather name="x" size={24} color="black" />
                            </TouchableOpacity>

                            <View style={styles.recapContainer}>
                                <SvgIcon icon={selectedCategory.categorie_name} fillColor={color.neutralCoral} />
                                <Text style={styles.recapTitle}>{selectedCategory.categorie_name}</Text>
                                <Text style={styles.recapCount}>
                                    {getTotalFilteredWordCount(selectedCategory)} / {selectedCategory.totalWordCount} mots
                                </Text>
                            </View>

                            <View style={styles.filterBar}>
                                {['all', 'easy', 'medium', 'hard'].map(option => (
                                    <TouchableOpacity key={option} onPress={() => setFilter(option)} style={styles.filterButton}>
                                        <Text style={styles.filterButtonText}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <ScrollView style={{ maxHeight: 300 }}>
                                {Array.isArray(selectedCategory.categoryWords) && (
                                    <CategoryModal words={applyFilter(selectedCategory.categoryWords).filteredWords} />
                                )}

                                {(selectedCategory.subcategories || []).map((subcategory) => (
                                    <SubcategoryModal
                                        key={subcategory.subcat_id}
                                        subcategory={{
                                            ...subcategory,
                                            words: applyFilter(subcategory.words || []).filteredWords,
                                            countSelected: applyFilter(subcategory.words || []).count,
                                        }}
                                    />
                                ))}
                            </ScrollView>

                            <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToWordList}>
                                <Text style={styles.navigateButtonText}>Voir la liste des mots</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    scrollView: {
        paddingBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        alignItems: 'flex-start',
    },
    subcategoryContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    recapContainer: {
        alignItems: 'center',
    },
    recapTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    recapCount: {
        fontSize: 16,
        color: 'gray',
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    filterButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    filterButtonText: {
        fontSize: 14,
    },
    navigateButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: color.neutralCoral,
        borderRadius: 5,
        alignItems: 'center',
    },
    navigateButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default GridCardHome;
