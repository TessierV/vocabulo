import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { lightTheme, color } from '@/constants/Colors';
import CategoryModal from '@/components/CategoryModal';
import { texts } from '@/constants/texts';
import { ContainerParagraph, Paragraph } from '@/constants/StyledText';
import Slider from '@/components/Slider/Slider';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import ReusableCard from '@/components/Game/ReusableCard';
import CustomComponent from '@/components/CustomComponent';
import anotherImage from '@/assets/images/oyster.png';


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

  const parseRatio = (ratio) => {
    const [discovered, total] = ratio.split('/').map(Number);
    return { discovered, total };
  };

  const getCircularProgressSvg = (ratio) => {
    const { discovered, total } = parseRatio(ratio);
    const progress = (discovered / total) * 100;
    const radius = 15;
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
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <Slider
          data={[
            {
              key: '1', component:
                <ReusableCard
                  title="Quizz IA"
                  description="Testez vos connaissances avec des quizz personnalisés par l'IA."
                  buttonText="Commencer"
                  onPressButton={() => console.log('Quizz IA Commencer')}
                  iconName="cpu"
                  darkMode={darkMode}
                  containerBgColor={darkMode ? darkTheme.light_darkShade : '#424782'}
                  iconBgColor={lightTheme.light_darkShade}
                />

            },
            {
              key: '2', component: <ReusableCard
                title="Nouveaux Défis"
                description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
                buttonText="Découvrir"
                onPressButton={() => console.log('Nouveaux Défis Découvrir')}
                containerBgColor={darkMode ? darkTheme.light_darkShade : '#957CBD'}
                iconBgColor="green"
                darkMode={darkMode}
              />
            },
            {
              key: '3', component: <ReusableCard
                title="Nouveaux Défis"
                description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
                buttonText="Découvrir"
                onPressButton={() => console.log('Nouveaux Défis Découvrir')}
                containerBgColor={darkMode ? darkTheme.light_darkShade : '#957CBD'}
                iconBgColor="green"
                darkMode={darkMode}
              />
            },
          ]}
          darkMode={darkMode}
        />
        <View style={styles.section}>
          <View style={{ marginVertical: 10 }}>
            <CustomComponent />

          </View>
          <SectionTitle
            title={texts.homeScreen.section.title}
            text={texts.homeScreen.section.text}
            iconName="help-circle"
            popupTitle={texts.homeScreen.section.popup.title}
            popupText={texts.homeScreen.section.popup.text}
            popupButtonText={texts.homeScreen.section.popup.button}
            darkMode={darkMode}
          />
          {texts.categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.row}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={styles.rowContainer}>
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
              </View>
            </TouchableOpacity>
          ))}

          <CategoryModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            category={selectedCategory}
            onConfirm={handleNavigateToQuizScreen}
            darkMode={darkMode}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 100,
  },

  section: {
    width: '90%',
    alignSelf: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    minHeight: 70,
    backgroundColor: lightTheme.lightShade,
    borderRadius: 10,
    justifyContent: 'center',

  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    flexWrap: 'wrap',

  },
  categorieContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    flexWrap: 'wrap',
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
