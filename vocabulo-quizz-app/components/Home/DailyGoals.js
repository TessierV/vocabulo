// DailyGoals.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnnonceTitle } from '@/constants/StyledText';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import InfoModal from '@/components/Slider/SlideModal';
import TitleSlider from '@/components/Slider/SliderTitleWithInfo';
import { texts } from '@/constants/texts';
import { Paragraph } from '@/constants/StyledText';


const DailyGoals = ({ darkMode }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const goals = [
    { label: texts.homeScreen.slider.dailyGoals.column.firstColumn, completed: 7, total: 12 },
    { label: texts.homeScreen.slider.dailyGoals.column.secondColumn, completed: 2, total: 4 },
    { label: texts.homeScreen.slider.dailyGoals.column.thirdColumn, completed: 3, total: 4 },
    { label: texts.homeScreen.slider.dailyGoals.column.fourColumn, completed: 1, total: 4 },
  ];

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
      <TitleSlider
        title={texts.homeScreen.slider.dailyGoals.title}
        iconName="info"
        onPress={handlePress}
        darkMode={darkMode}
      />
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalCard}>
            <Paragraph style={styles.goalLabel}>{goal.label}</Paragraph>
            <Paragraph style={styles.goalStatus}>{goal.completed}/{goal.total}</Paragraph>
          </View>
        ))}
      </View>
      <InfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={texts.homeScreen.slider.dailyGoals.popup.title}
        text={texts.homeScreen.slider.dailyGoals.popup.text}
        button={texts.homeScreen.slider.dailyGoals.popup.button}
        darkMode={darkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,
  },
  goalCard: {
    width: 70,
    height: 70,
    backgroundColor: lightTheme.dark_lightShade,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  goalStatus: {
    fontSize: 12,
    color: '#333',
  },
});

export default DailyGoals;
