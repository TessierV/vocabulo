import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import InfoModal from '@/components/Slider/SlideModal';
import TitleSlider from '@/components/Slider/SliderTitleWithInfo';
import { texts } from '@/constants/texts';
import { Paragraph } from '@/constants/StyledText';

// Main component for selecting difficulty
const SelectDifficulty = ({ darkMode, onFilterChange, categories = [] }) => {
  // State to manage the visibility of the info modal
  const [modalVisible, setModalVisible] = useState(false);

  // State to manage the currently selected difficulty
  const [activeDifficulty, setActiveDifficulty] = useState('all');

  // Calculate counts for each difficulty level
  const difficultyCounts = categories.reduce((acc, cat) => {
    if (cat.difficulty) acc[cat.difficulty] = (acc[cat.difficulty] || 0) + 1;
    return acc;
  }, {});

  // Calculate the total number of categories
  const totalCount = categories.length;

  // Define information for each difficulty level
  const goals = [
    {
      label: texts.categoryScreen.selectDifficulty.levelDifficulty.easy.textLabel || 'Easy',
      icon: texts.categoryScreen.selectDifficulty.levelDifficulty.easy.svg || '<svg></svg>',
      value: 'easy',
      color: color.lightGreen,
      count: difficultyCounts['easy'] || 0,
    },
    {
      label: texts.categoryScreen.selectDifficulty.levelDifficulty.middle.textLabel || 'Medium',
      icon: texts.categoryScreen.selectDifficulty.levelDifficulty.middle.svg || '<svg></svg>',
      value: 'middle',
      color: color.lightBlue,
      count: difficultyCounts['middle'] || 0,
    },
    {
      label: texts.categoryScreen.selectDifficulty.levelDifficulty.hard.textLabel || 'Hard',
      icon: texts.categoryScreen.selectDifficulty.levelDifficulty.hard.svg || '<svg></svg>',
      value: 'hard',
      color: color.lightPlum,
      count: difficultyCounts['hard'] || 0,
    },
  ];

  // Function to handle difficulty selection
  const handlePress = (difficulty) => {
    setActiveDifficulty(difficulty); // Update the active difficulty state
    onFilterChange(difficulty === 'all' ? null : difficulty); // Call the filter change function with the selected difficulty
  };

  // Function to determine the button style based on the difficulty
  const getButtonStyle = (difficulty) => {
    if (difficulty === 'all') {
      return 'url(#gradient)'; // Use gradient for the "All" button
    }
    const goal = goals.find(g => g.value === difficulty);
    return goal ? (activeDifficulty === difficulty ? goal.color : lightTheme.dark_lightShade) : lightTheme.dark_lightShade;
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
      {/* Header component with title and info button */}
      <TitleSlider
        title={texts.categoryScreen.selectDifficulty.title}
        iconName="info"
        onPress={() => setModalVisible(true)}
        darkMode={darkMode}
      />
      <View style={styles.goalsContainer}>
        {/* Button to select all difficulties */}
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
          <Paragraph style={styles.goalLabel}>{texts.categoryScreen.selectDifficulty.levelDifficulty.all.textLabel || 'All'}</Paragraph>
        </TouchableOpacity>
        {/* Buttons for each difficulty level */}
        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.goalCard, { backgroundColor: getButtonStyle(goal.value) }]}
            onPress={() => handlePress(goal.value)}
          >
            <SvgXml style={styles.goalSvg} xml={goal.icon} width={20} height={20} />
            <Paragraph style={styles.goalLabel}>{goal.label}</Paragraph>
            <Paragraph style={styles.goalStatus}>{`${goal.count}/${totalCount}`}</Paragraph>
          </TouchableOpacity>
        ))}
      </View>
      {/* Info modal component */}
      <InfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={texts.categoryScreen.selectDifficulty.popup.title || 'Difficulty'}
        text={texts.categoryScreen.selectDifficulty.popup.text || 'This is a detailed explanation that appears in the difficulty pop-up when you click on the icon.'}
        button={texts.categoryScreen.selectDifficulty.popup.button || 'Close'}
        darkMode={darkMode}
      />
    </View>
  );
};

// Styles for the component
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
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    padding: 5,
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
  goalSvg: {
    marginBottom: 5,
  },
  goalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: lightTheme.darkShade,
  },
  goalStatus: {
    fontSize: 10,
    color: lightTheme.darkShade,
  },
});

export default SelectDifficulty;
