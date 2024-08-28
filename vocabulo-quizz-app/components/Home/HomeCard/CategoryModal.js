import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import SvgIcon from '@/components/Card/SvgIcon';
import { Paragraph, BigTitle, ContainerParagraph, Subtitle } from '@/constants/StyledText';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';

const CategoryModal = ({ isVisible, onClose, category, darkMode }) => {
  const { contentContainerColor, textColor } = {
    contentContainerColor: darkMode ? color.neutralCoral : lightTheme.lightShade,
    textColor: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
  };

  const categoryName = category?.categorie_name?.trim() || 'Unknown Category';

  const validSubcategories = category?.subcategories?.filter(subcat =>
    subcat?.subcategory_id && subcat?.subcategory_name?.trim() && subcat?.subcategory_word_count
  ) || [];

  // Group subcategories into groups of three
  const groupedSubcategories = [];
  for (let i = 0; i < validSubcategories.length; i += 3) {
    groupedSubcategories.push(validSubcategories.slice(i, i + 3));
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const slideWidth = Dimensions.get('window').width - 50;
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / slideWidth
    );
    setCurrentIndex(slideIndex);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, { backgroundColor: contentContainerColor }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <SvgIcon icon={categoryName} fillColor={textColor} width="60" height="60" />
            <BigTitle>Récapitulatif</BigTitle>
            <ContainerParagraph style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }}>
              Vous allez commencer
            </ContainerParagraph>

            <View style={styles.subcategoryContainer}>
              <Subtitle>Thème</Subtitle>
              <View style={[styles.categoryItem, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]} >
                <View style={styles.categoryRowIcon}>
                  <SvgIcon icon={categoryName} fillColor={textColor} />
                  <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
                    {categoryName}
                  </Paragraph>
                </View>
                <Paragraph style={[styles.subcategoryText, { color: textColor }]}>
                  {category?.word_count || '0'} mots
                </Paragraph>
              </View>

              {groupedSubcategories.length > 0 ? (
                <>
                  <Subtitle>Sous-Thème</Subtitle>
                  <FlatList
                    data={groupedSubcategories}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    keyExtractor={(item, index) => `slide-${index}`}
                    renderItem={({ item }) => (
                      <View style={styles.sliderContainer}>
                        {item.map((subcat) => {
                          const subcategoryName = subcat?.subcategory_name?.trim() || 'Unknown Subcategory';
                          return (
                            <View key={subcat.subcategory_id} style={[styles.subcategoryItem, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]}>
                              <View style={styles.categoryRowIcon}>
                                <SvgIcon icon={subcategoryName} fillColor={textColor} width="20" height="20" />
                                <Text style={[styles.subcategoryText, { color: textColor }]}>
                                  {subcategoryName}
                                </Text>
                              </View>
                              <Text style={[styles.subcategoryText, { color: textColor }]}>
                                {subcat?.subcategory_word_count || '0'} mots
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  />
                  <View style={styles.paginationContainer}>
                    {groupedSubcategories.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.paginationDot,
                          currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                      />
                    ))}
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalContent: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 5,
  },
  subcategoryContainer: {
    marginTop: 20,
    gap: 5,
    width: '100%',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,

  },

  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  categoryRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  subcategoryText: {
    fontSize: 12,
  },
  sliderContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 5,
    width: Dimensions.get('window').width - 50,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});

export default CategoryModal;
