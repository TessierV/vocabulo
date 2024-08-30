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

const GridCardHome = () => {
    const [darkMode] = useDarkMode();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter, applyFilter] = useFilter();

    const screenWidth = Dimensions.get('window').width;
    const squareSize = screenWidth / 3 - 25;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://192.168.23.25:3000/api/categories');
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

        // Filter and count words in the main category
        if (category.categoryWords) {
            const { count: mainCategoryCount } = applyFilter(category.categoryWords);
            totalFilteredCount += mainCategoryCount;
        }

        // Filter and count words in each subcategory
        (category.subcategories || []).forEach(subcategory => {
            const { count: subCategoryCount } = applyFilter(subcategory.words || []);
            totalFilteredCount += subCategoryCount;
        });

        return totalFilteredCount;
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

                            {/* Recap Section */}
                            <View style={styles.recapContainer}>
                                <SvgIcon icon={selectedCategory.categorie_name} fillColor={color.neutralCoral} />
                                <Text style={styles.recapTitle}>{selectedCategory.categorie_name}</Text>
                                <Text style={styles.recapCount}>
                                    {getTotalFilteredWordCount(selectedCategory)} / {selectedCategory.totalWordCount} mots
                                </Text>
                            </View>

                            {/* Filter Bar */}
                            <View style={styles.filterBar}>
                                {['all', 'easy', 'medium', 'hard'].map(option => (
                                    <TouchableOpacity key={option} onPress={() => setFilter(option)} style={styles.filterButton}>
                                        <Text style={styles.filterButtonText}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <ScrollView style={{ maxHeight: 300 }}>
                                {/* Displaying CategoryModal once with all words */}
                                {selectedCategory.categoryWords && (
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
        marginBottom: 10,
    },
    recapContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    recapTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    recapCount: {
        fontSize: 14,
        color: 'gray',
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    filterButtonText: {
        fontSize: 14,
    },
});

export default GridCardHome;
