import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import SvgIcon from '@/SVG/CategorySvgIcon';
import SvgDifficulty from '@/SVG/DifficultySvgIcon';
import { BigTitle, ContainerParagraph, Paragraph } from '@/constants/StyledText';
import { Feather } from '@expo/vector-icons';
import CategoryModal from '@/components/Home/Home/CategoryModal';
import SubcategoryModal from '@/components/Home/Home/SubcategoryModal';
import useFilter from '@/components/Home/Home/useFilter';
import { useRouter } from 'expo-router';
import { GradientBorderButton } from '@/components/Button';
import GradientSVG from '@/SVG/GradientSVG';
import RadarEffect from '@/components/RadarEffect';
import config from '@/backend/config/config';

// Create a mapping for filter options
const filterTranslations = {
    all: 'Tout',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile'
};

const GridCardHome = () => {
    const [darkMode] = useDarkMode();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter, applyFilter] = useFilter();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();

    const screenWidth = Dimensions.get('window').width; // Get screen width
    const squareSize = screenWidth / 3 - 25; // Size for square items
    const itemsPerSlide = 2; // Number of items per slide

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}:3000/api/categories`);
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

    const getRadarColors = (filter) => {
        switch (filter) {
            case 'easy':
                return [color.darkGreen, color.neutralGreen, color.lightGreen];
            case 'medium':
                return [color.darkBlue, color.neutralBlue, color.lightBlue];
            case 'hard':
                return [color.darkPlum, color.neutralPlum, color.lightPlum];
            case 'all':
            default:
                return [color.lightPlum, color.neutralBlue, color.neutralGreen];
        }
    };

    const chunkSubcategories = (subcategories, chunkSize) => {
        const result = [];
        for (let i = 0; i < subcategories.length; i += chunkSize) {
            result.push(subcategories.slice(i, i + chunkSize));
        }
        return result;
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newPage = Math.floor(contentOffsetX / screenWidth + 0.5);
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={darkMode ? color.darkPlum : color.darkBlue} />
            </View>
        );
    }

    const slides = chunkSubcategories(selectedCategory?.subcategories || [], itemsPerSlide);

    return (
        <View style={{ flex: 1, backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {categories.map((category) => (
                    <View key={category.categorie_id}>
                        <TouchableOpacity
                            style={[
                                styles.subcategoryContainer,
                                {
                                    width: squareSize,
                                    height: squareSize,
                                    backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade
                                }
                            ]}
                            onPress={() => handleCategoryClick(category)}
                        >
                            <SvgIcon icon={category.categorie_name} fillColor={color.neutralCoral} />
                            <View>
                                <Paragraph style={{ textAlign: 'center', textTransform: 'capitalize', fontSize: 12, paddingTop: 5, color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>
                                    {category.categorie_name}
                                </Paragraph>
                                <Paragraph style={{ textAlign: 'center', fontSize: 9, color: darkMode ? darkTheme.neutral : lightTheme.neutral }}>
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
                        <View style={[styles.modalContent, {backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade}]}>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Feather name="x" size={24} color={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade} />
                            </TouchableOpacity>

                            <View style={styles.recapContainer}>
                                <RadarEffect
                                    colors={getRadarColors(selectedFilter)}
                                    minRadius={30}
                                    maxRadius={50}
                                    svgIcon={SvgIcon({ icon: selectedCategory.categorie_name }).props.xml}
                                />
                                <BigTitle style={{color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade}}>Récapitulatif</BigTitle>
                                <ContainerParagraph style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>
                                    Vous allez commencer avec ce thème:
                                </ContainerParagraph>
                                <View style={[styles.categoryRow, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
                                    <View style={styles.categoryRowIcon}>
                                        <SvgIcon icon={selectedCategory.categorie_name} width="25" height="25" />
                                        <Paragraph style={styles.recapTitle}>{selectedCategory.categorie_name}</Paragraph>
                                    </View>
                                    <Paragraph style={[styles.recapCount, { color: darkMode ? darkTheme.neutral : lightTheme.dark_lightShade }]}>
                                        {getTotalFilteredWordCount(selectedCategory)} / {selectedCategory.totalWordCount} mots
                                    </Paragraph>
                                </View>

                            </View>

                            <>
                                <ScrollView
                                    horizontal
                                    style={styles.filterScrollView}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.filterBar}
                                >
                                    {['all', 'easy', 'medium', 'hard'].map(option => (
                                        <TouchableOpacity
                                            key={option}
                                            onPress={() => {
                                                setFilter(option);
                                                setSelectedFilter(option);
                                            }}
                                            style={[
                                                styles.filterButton,
                                                {
                                                    borderColor: selectedFilter === option ?
                                                        option === 'all' ? color.neutral :
                                                            option === 'easy' ? color.neutralGreen :
                                                                option === 'medium' ? color.neutralBlue :
                                                                    color.neutralPlum
                                                        : '#DDD',
                                                    backgroundColor: selectedFilter === option ?
                                                        option === 'all' ? lightTheme.dark_lightShade :
                                                            option === 'easy' ? color.neutralGreen :
                                                                option === 'medium' ? color.neutralBlue :
                                                                    color.neutralPlum
                                                        : 'transparent'
                                                }
                                            ]}
                                        >
                                            {selectedFilter === option && (
                                                <View style={styles.gradientContainer}>
                                                    <GradientSVG
                                                        colors={
                                                            option === 'all' ? [color.neutralGreen, color.neutralBlue, color.neutralPlum] :
                                                                option === 'easy' ? [color.lightGreen, color.neutralGreen, color.darkGreen] :
                                                                    option === 'medium' ? [color.lightBlue, color.neutralBlue, color.darkBlue] :
                                                                        [color.lightPlum, color.neutralPlum, color.darkPlum]
                                                        }
                                                    />
                                                </View>
                                            )}
                                            <SvgDifficulty difficulty={option} isSelected={selectedFilter === option} />
                                            <Paragraph style={[
                                                styles.filterButtonText,
                                                { color: selectedFilter === option ? lightTheme.darkShade : lightTheme.light_darkShade }
                                            ]}>
                                                {filterTranslations[option] || option.charAt(0).toUpperCase() + option.slice(1)}
                                            </Paragraph>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </>

                            <View style={{ width: '100%' }}>
                                <FlatList
                                    data={slides}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal
                                    pagingEnabled
                                    onScroll={handleScroll}
                                    renderItem={({ item }) => (
                                        <View style={styles.sliderItem}>
                                            {item.map(subcategory => (
                                                <SubcategoryModal
                                                darkMode={darkMode}
                                                    key={subcategory.subcat_id}
                                                    subcategory={{
                                                        ...subcategory,
                                                        words: applyFilter(subcategory.words || []).filteredWords,
                                                        countSelected: applyFilter(subcategory.words || []).count,
                                                    }}
                                                />
                                            ))}
                                        </View>
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                />

                                <View style={styles.paginationContainer}>
                                    {slides.map((_, index) => (
                                        <View
                                            key={index}
                                            style={[
                                                styles.paginationDot,
                                                currentPage === index ? styles.activeDot : styles.inactiveDot,
                                            ]}
                                        />
                                    ))}
                                </View>
                            </View>

                            {getTotalFilteredWordCount(selectedCategory) > 6 ? (
                                <GradientBorderButton
                                    background={darkMode ? 'dark' : 'light'}
                                    textColor={darkMode ? 'light' : 'dark'}
                                    onPress={handleNavigateToWordList}
                                    text="Commencer"
                                />
                            ) : (
                                <View style={styles.warningContainer}>
                                    <Paragraph style={[styles.warningText, {fontSize: 12, color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade}]}>
                                        Attention, la catégorie doit avoir au moins 7 mots pour lancer une série
                                    </Paragraph>
                                </View>
                            )}
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    recapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    recapTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoryRowIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gradientContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        marginBottom: 40,
    },
    subcategoryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 5,
    },
    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
    },
    modalContent: {
        position: 'relative',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        gap: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '90%',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'space-between',
        minHeight: 40,
        marginTop: 20,

    },
    categoryRowIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },
    recapTitle: {
        color: lightTheme.lightShade,
    },
    // Filter
    recapCount: {
        fontSize: 12,
    },
    filterScrollView: {
        width: '100%',
        maxHeight: 45,
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        gap: 5,
        height: 40,
        width: '100%',
    },
    filterButton: {
        minWidth: 80,
        flexWrap: 'wrap',
        borderRadius: 8,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 5,
        overflow: 'hidden',
        position: 'relative',
        padding: 5,
        borderWidth: 1,
    },
    filterButtonText: {
        fontSize: 12,
    },
    // Slider
    sliderItem: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 5,
        width: Dimensions.get('window').width - 50,
    },

    paginationContainer: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: lightTheme.light_darkShade,
        borderRadius: 8,
    },
    inactiveDot: {
        backgroundColor: color.neutral,
        borderRadius: 8,
    },
    warningContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: color.warningBackground, // couleur pour le fond d'avertissement
    },
    warningText: {
        textAlign: 'center',
    },
});

export default GridCardHome;
