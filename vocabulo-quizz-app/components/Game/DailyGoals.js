// DailyGoals.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/Colors';
import InfoModal from '@/components/Slider/SlideModal';
import { texts } from '@/constants/texts';
import TitleSlider from '../Slider/SliderTitleWithInfo';
import { ContainerParagraph } from '@/constants/StyledText';
import { GradientBorderButtonMini } from '@/components/Button';

const { height } = Dimensions.get('window');

const DailyGoals = ({ darkMode }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleStartPress = () => {
    console.log('Commencer pressed');
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
      <TitleSlider
        title={texts.homeScreen.slider.dailyGoals.title}
        iconName="info"
        onPress={handlePress}
        darkMode={darkMode}
      />
      <View style={styles.container}>
        <View style={styles.textSection}>
          <ContainerParagraph style={styles.title}>Explore Today’s Top Pick of Quizzes!</ContainerParagraph>
          <GradientBorderButtonMini
            text="Commencer"
            background={darkMode ? 'light' : 'dark'}
            textColor={darkMode ? 'dark' : 'light'}
            onPress={handleStartPress}
          />
        </View>
        <View style={styles.imageSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/300x600' }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
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
  mainContainer: {
    flex: 1,
    height: height,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
  },
  textSection: {
    width: '65%',
    justifyContent: 'start',
  },
  title: {
    color: 'pink',
    marginBottom: 20,
  },
  imageSection: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default DailyGoals;
