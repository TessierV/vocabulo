import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { lightTheme, color } from '@/constants/Colors';
import CategoryModal from '@/components/CategoryModal'; // Import the CategoryModal component
import { texts } from '@/constants/texts';
import { ContainerParagraph, Paragraph } from '@/constants/StyledText';
import Slider from '@/components/Slider/Slider';
import Header from '@/components/Header';

import BannerContainer from '@/components/Banner';
import DailyGoals from '@/components/Game/DailyGoals';


const GameScreen = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleNavigateToQuizScreen = () => {
    if (selectedCategory) {
      setModalVisible(false);
      setTimeout(() => {
        router.push('/quiz');
      }, 300);
    }
  };

  // Function to extract discovered and total from ratio string
  const parseRatio = (ratio) => {
    const [discovered, total] = ratio.split('/').map(Number);
    return { discovered, total };
  };

  // Function to generate SVG for circular progress based on ratio
  const getCircularProgressSvg = (ratio) => {
    const { discovered, total } = parseRatio(ratio);
    const progress = (discovered / total) * 100;
    const radius = 15; // Adjust radius for desired size
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color.neutralPlum};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${color.neutralBlue};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color.neutralGreen};stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="15" stroke=${lightTheme.dark_lightShade} stroke-width="5" fill="none" />
        <circle cx="20" cy="20" r="15" stroke="url(#progress-gradient)" stroke-width="5" fill="none"
          stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" transform="rotate(-90 20 20)" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="8" fill="black">
          ${Math.round(progress)}%
        </text>
      </svg>
    `;
  };

  return (
    <>
      <Header darkMode={darkMode} title="Game" firstLink="/home" secondLink="none" />
      <ScrollView contentContainerStyle={styles.container}>
        <Slider
          data={[
            { key: '1', component: <DailyGoals darkMode={darkMode} /> },
            { key: '2', component: <DailyGoals darkMode={darkMode} /> },
          ]}
          darkMode={darkMode}
        />
        {texts.categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.row}
            onPress={() => handleCategoryPress(category)}
          >
            <View style={styles.categorieContainer}>
              <SvgXml xml={category.icon} width={30} height={30} />
              <View>
                <Paragraph >{category.textLabel}</Paragraph>
                <ContainerParagraph style={styles.textLabel}>10 questions</ContainerParagraph>
              </View>
            </View>


            <View style={styles.circularProgressContainer}>
              <SvgXml xml={getCircularProgressSvg(category.ratio)} width={40} height={40} />
            </View>
          </TouchableOpacity>
        ))}

        <CategoryModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          category={selectedCategory}
          onConfirm={handleNavigateToQuizScreen}
          darkMode={darkMode} // Pass the darkMode prop to control styling
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: lightTheme.lightShade,
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 10,
  },
  categorieContainer: {
    flexDirection: 'row',
    gap: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontSize: 12,
    color: lightTheme.light_darkShade,
  },
  circularProgressContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
