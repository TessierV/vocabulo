import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { BigTitle, Paragraph, Subtitle } from '@/constants/StyledText';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import WeeklyOverview from '@/components/Home/WeeklyOverview';
import DailyGoals from '@/components/Home/DailyGoals';
import SectionTitle from '@/components/SectionTitle';
import { texts } from '@/constants/texts';
import CategoryGrid from '@/components/CategoryGrid';
import Slider from '@/components/Slider/Slider';
import CategoryCard from '@/components/CategoryCard';
import { useNavigation } from '@react-navigation/native';
import GridCardHome from '@/components/Home/Home/GridCard';
import TitleSlider from '@/components/Slider/SliderTitleWithInfo';
import Header from '@/components/Header/Header';

const HomeScreen = () => {
  const [darkMode] = useDarkMode();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const fillColor = darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade;

  return (
    <ScrollView
      contentContainerStyle={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}
    >
      <Header darkMode={darkMode} PageTitle="Bienvenue" title="Home" firstLink="none" secondLink="none" />
      <Slider
        data={[
          { key: '1', component: <WeeklyOverview darkMode={darkMode} /> },
          { key: '2', component: <DailyGoals darkMode={darkMode} /> },
        ]}
        darkMode={darkMode}
      />

      <View style={styles.container}>
        <SectionTitle
          title={texts.homeScreen.section?.title || 'Default Section Title'}
          text={texts.homeScreen.section?.text || 'Default Section Text'}
          iconName="help-circle"
          popupTitle={texts.homeScreen.section?.popup?.title || 'Default Popup Title'}
          popupText={texts.homeScreen.section?.popup?.text || 'Default Popup Text'}
          popupButtonText={texts.homeScreen.section?.popup?.button || 'Default Button Text'}
          darkMode={darkMode}
        />

        <CategoryGrid
          categories={[
            { textLabel: texts.homeScreen.section.categoryGrid.column1?.title || 'Default Title', icon: 'category', route: texts.homeScreen.section.categoryGrid.column1?.route || '' },
            { textLabel: texts.homeScreen.section.categoryGrid.column2?.title || 'Default Title', icon: 'custom', route: texts.homeScreen.section.categoryGrid.column2?.route || '' },
            { textLabel: texts.homeScreen.section.categoryGrid.column3?.title || 'Default Title', icon: 'random', route: texts.homeScreen.section.categoryGrid.column3?.route || '' },
            { textLabel: texts.homeScreen.section.categoryGrid.column4?.title || 'Default Title', icon: 'dictionary', route: texts.homeScreen.section.categoryGrid.column4?.route || '' },
          ]}
          darkMode={darkMode}
        />
        <SectionTitle
          title={texts.homeScreen.section_second?.title || 'Default Section Title'}
          text={texts.homeScreen.section_second?.text || 'Default Section Text'}
          iconName="help-circle"
          popupTitle={texts.homeScreen.section_second?.popup?.title || 'Default Popup Title'}
          popupText={texts.homeScreen.section_second?.popup?.text || 'Default Popup Text'}
          popupButtonText={texts.homeScreen.section_second?.popup?.button || 'Default Button Text'}
          darkMode={darkMode}
        />
        <GridCardHome darkMode={darkMode}  />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default HomeScreen;
