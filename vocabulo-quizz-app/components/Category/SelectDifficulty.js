import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import InfoModal from '@/components/Slider/SlideModal';
import TitleSlider from '@/components/Slider/SliderTitleWithInfo';
import { texts } from '@/constants/texts';

const SelectDifficulty = ({ darkMode, onFilterChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeDifficulty, setActiveDifficulty] = useState('all');

  const goals = [
    { label: texts.categoryScreen.selectDifficulty.levelDifficulty.easy.textLabel, icon: texts.categoryScreen.selectDifficulty.levelDifficulty.easy.svg, value: 'easy', color: color.lightGreen },
    { label: texts.categoryScreen.selectDifficulty.levelDifficulty.middle.textLabel, icon: texts.categoryScreen.selectDifficulty.levelDifficulty.middle.svg, value: 'middle', color: color.lightBlue },
    { label: texts.categoryScreen.selectDifficulty.levelDifficulty.hard.textLabel, icon: texts.categoryScreen.selectDifficulty.levelDifficulty.hard.svg, value: 'hard', color: color.lightPlum },
  ];

  const handlePress = (difficulty) => {
    setActiveDifficulty(difficulty);
    onFilterChange(difficulty === 'all' ? null : difficulty);
  };

  const getButtonStyle = (difficulty) => {
    if (difficulty === 'all') {
      return 'url(#gradient)';
    } else {
      return activeDifficulty === difficulty ? goals.find(g => g.value === difficulty).color : lightTheme.dark_lightShade;
    }
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
      <TitleSlider
        title={texts.categoryScreen.selectDifficulty.title}
        iconName="info"
        onPress={() => setModalVisible(true)}
        darkMode={darkMode}
      />
      <View style={styles.goalsContainer}>
        <TouchableOpacity
          style={[styles.goalCard, styles.goalAllCard]}
          onPress={() => handlePress('all')}
        >
          <SvgXml
            xml={`
              <svg width=70 height=70 viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color.lightGreen};stop-opacity:1" />
                    <stop offset="50%" style="stop-color:${color.lightBlue};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${color.lightPlum};stop-opacity:1" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#gradient)" />
              </svg>
            `}
            style={styles.svgBackground}
          />
          <Text style={styles.goalLabel}>{texts.categoryScreen.selectDifficulty.levelDifficulty.all.textLabel}</Text>
        </TouchableOpacity>
        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.goalCard, { backgroundColor: getButtonStyle(goal.value) }]}
            onPress={() => handlePress(goal.value)}
          >
            <SvgXml style={styles.goalSvg} xml={goal.icon} width={20} height={20} />
            <Text style={styles.goalLabel}>{goal.label}</Text>
            <Text style={styles.goalStatus}>{goal.total}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <InfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={texts.categoryScreen.selectDifficulty.popup.title}
        text={texts.categoryScreen.selectDifficulty.popup.text}
        button={texts.categoryScreen.selectDifficulty.popup.button}
        darkMode={darkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    minHeight: 150,
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  goalsContainer: {

    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  goalCard: {
    width: 70,
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    position: 'relative',
  },
  goalAllCard: {
    justifyContent: 'center',

  },
  svgBackground: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    zIndex: -1,
  },
  goalSvg:{
    marginBottom: 5,
  },
  goalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: lightTheme.darkShade,
  },
  goalStatus: {
    fontSize: 12,
    color: lightTheme.darkShade,
  },
});

export default SelectDifficulty;
