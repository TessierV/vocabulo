import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { BigTitle, Subtitle } from '@/constants/StyledText';
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
import HomeCategoryCard from '@/components/Home/HomeCard/CategoryCard';
import GridCardHome from '@/components/Home/Home/GridCard';

const HomeScreen = () => {
  const [darkMode] = useDarkMode();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const fillColor = darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade;

  return (
    <ScrollView
      contentContainerStyle={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}
    >
      <View style={styles.container}>
        <BigTitle style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }}>
          {texts.homeScreen.bigTitle?.title || 'Default Title'}
        </BigTitle>
        <Subtitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.light_darkShade }}>
          {texts.homeScreen.bigTitle?.text || 'Default Subtitle Text'}
        </Subtitle>
      </View>

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
        <CategoryCard categories={texts.categories} darkMode={darkMode} />

        <HomeCategoryCard darkMode={darkMode} />

        <GridCardHome darkMode={darkMode}  />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 40,
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default HomeScreen;
