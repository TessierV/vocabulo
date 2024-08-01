// CategoryCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import CategoryModal from '@/components/CategoryModal';

const starFill = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.17038 0.326399L4.74158 2.2C4.81771 2.44966 4.95407 2.67678 5.13863 2.86134C5.3232 3.04591 5.55031 3.18226 5.79998 3.2584L7.67358 3.8296C7.84158 3.8808 7.84158 4.1192 7.67358 4.1704L5.79998 4.7416C5.55025 4.81761 5.32307 4.95392 5.13848 5.1385C4.9539 5.32309 4.81759 5.55027 4.74158 5.8L4.17038 7.6736C4.11918 7.8416 3.88078 7.8416 3.82958 7.6736L3.25838 5.8C3.18237 5.55027 3.04606 5.32309 2.86147 5.1385C2.67689 4.95392 2.44971 4.81761 2.19998 4.7416L0.326378 4.1704C0.158378 4.1192 0.158378 3.8808 0.326378 3.8296L2.19998 3.2584C2.44964 3.18226 2.67676 3.04591 2.86132 2.86134C3.04589 2.67678 3.18224 2.44966 3.25838 2.2L3.82958 0.326399C3.88078 0.157599 4.11918 0.157599 4.17038 0.326399Z" fill="url(#paint0_linear_284_720)"/><defs><linearGradient id="paint0_linear_284_720" x1="-0.125861" y1="-0.121361" x2="8.14382" y2="8.13936" gradientUnits="userSpaceOnUse"><stop offset="0.204633" stop-color="#99CDBD"/><stop offset="0.532819" stop-color="#7DAED6"/><stop offset="0.787645" stop-color="#AF7DD6"/></linearGradient></defs></svg>';
const starEmpty = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.80082 8.78397C4.7557 8.78398 4.71176 8.76949 4.6755 8.74264C4.63923 8.71579 4.61255 8.678 4.59939 8.63483L3.9353 6.4568C3.87739 6.26628 3.77344 6.09296 3.63263 5.95215C3.49182 5.81135 3.31849 5.7074 3.12796 5.6495L0.949823 4.98544C0.906691 4.97227 0.868927 4.94559 0.842096 4.90935C0.815264 4.8731 0.800781 4.82919 0.800781 4.7841C0.800781 4.739 0.815264 4.6951 0.842096 4.65885C0.868927 4.6226 0.906691 4.59593 0.949823 4.58276L3.12787 3.91869C3.3184 3.86079 3.49173 3.75684 3.63254 3.61604C3.77335 3.47524 3.87731 3.30192 3.93521 3.1114L4.59939 0.933278C4.61252 0.890081 4.63918 0.852249 4.67545 0.825364C4.71172 0.798479 4.75568 0.783966 4.80082 0.783966C4.84597 0.783966 4.88992 0.798479 4.92619 0.825364C4.96247 0.852249 4.98913 0.890081 5.00226 0.933278L5.66635 3.11131C5.72426 3.30183 5.82821 3.47515 5.96902 3.61596C6.10983 3.75676 6.28316 3.86071 6.47369 3.91861L8.65174 4.58267C8.69487 4.59584 8.73264 4.62252 8.75947 4.65876C8.7863 4.69501 8.80078 4.73892 8.80078 4.78401C8.80078 4.82911 8.7863 4.87302 8.75947 4.90926C8.73264 4.94551 8.69487 4.97218 8.65174 4.98535L6.47369 5.64942C6.28316 5.70732 6.10983 5.81127 5.96902 5.95207C5.82821 6.09287 5.72426 6.2662 5.66635 6.45672L5.00226 8.63492C4.98908 8.67807 4.9624 8.71584 4.92613 8.74267C4.88987 8.76951 4.84594 8.78398 4.80082 8.78397ZM1.73316 4.7841L3.25082 5.24682C3.50738 5.32484 3.74078 5.46484 3.93039 5.65446C4.12 5.84408 4.25999 6.07747 4.338 6.33403L4.80082 7.85179L5.26357 6.33411C5.34159 6.07756 5.4816 5.84418 5.67122 5.65457C5.86085 5.46497 6.09426 5.32499 6.35082 5.24699L7.86849 4.7841L6.35082 4.32138C6.09426 4.24336 5.86087 4.10335 5.67126 3.91374C5.48164 3.72412 5.34165 3.49072 5.26365 3.23417L4.80082 1.71641L4.33808 3.23409C4.26006 3.49063 4.12005 3.72402 3.93042 3.91362C3.7408 4.10322 3.50739 4.24321 3.25082 4.32121L1.73316 4.7841Z" fill="#313941"/></svg>';

const CategoryCard = ({ categories, darkMode }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const router = useRouter();

    const screenWidth = Dimensions.get('window').width;
    const squareSize = screenWidth / 3 - 25;

    const handlePress = (category) => {
      setSelectedCategory(category);
      setIsModalVisible(true);
    };

    const handleConfirm = () => {
      if (selectedCategory) {
        router.push(selectedCategory.route);
      }
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const getStyleForDifficulty = (difficulty) => {
      switch (difficulty) {
        case 'easy':
          return {
            contentContainerColor: color.lightGreen,
            iconContainerColor: color.neutralGreen,
            stars: [starFill, starEmpty, starEmpty],
          };
        case 'middle':
          return {
            contentContainerColor: color.lightBlue,
            iconContainerColor: color.neutralBlue,
            stars: [starFill, starFill, starEmpty],
          };
        case 'hard':
          return {
            contentContainerColor: color.lightPlum,
            iconContainerColor: color.neutralPlum,
            stars: [starFill, starFill, starFill],
          };
        default:
          return {
            contentContainerColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade,
            iconContainerColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade,
            stars: [],
          };
      }
    };

    return (
      <View style={styles.grid}>
        {categories.map((category, index) => {
          const { contentContainerColor, iconContainerColor, stars } = getStyleForDifficulty(category.difficulty);
          return (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handlePress(category)}
            >
              <View
                style={[
                  styles.contentContainer,
                  {
                    width: squareSize,
                    height: squareSize * 1.35,
                    backgroundColor: contentContainerColor,
                  }
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: iconContainerColor,
                      width: squareSize * 0.5,
                      height: squareSize * 0.5,
                      borderRadius: squareSize * 0.6 / 2,
                    }
                  ]}
                >
                  <SvgXml xml={category.icon} width="70%" height="70%" />
                </View>
                <Text style={[styles.label, { color: darkMode ? darkTheme.darkShade : lightTheme.light_darkShade }]}>
                  {category.textLabel || 'Unknown'}
                </Text>
                <Text style={[styles.label, { color: darkMode ? darkTheme.darkShade : lightTheme.light_darkShade }, styles.ratioText]}>
                  {category.ratio || '0/0'}
                </Text>
                <View style={styles.starsContainer}>
                  {stars.map((star, starIndex) => (
                    <SvgXml key={starIndex} xml={star} width={12} height={12} />
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <CategoryModal
          isVisible={isModalVisible}
          onClose={handleCancel}
          category={selectedCategory}
          onConfirm={handleConfirm}
          darkMode={darkMode}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: 10,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      marginVertical: 10,
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      overflow: 'hidden',
      position: 'relative',
      padding: 10,
    },
    ratioText: {
      fontSize: 12,
    },
    starsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 10,
      width: '100%',
    },
    label: {
      textAlign: 'center',
      fontSize: 14,
    },
  });

export default CategoryCard;
