import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
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

const HomeScreen = () => {
  const [darkMode] = useDarkMode();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  return (
    <ScrollView
      contentContainerStyle={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}
    >
      <View style={styles.container}>
      <BigTitle style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }}>
        {texts.homeScreen.bigTitle.title}
      </BigTitle>
      <Subtitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.light_darkShade }}>
        {texts.homeScreen.bigTitle.text}
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
        title={texts.homeScreen.section.title}
        text={texts.homeScreen.section.text}
        iconName="help-circle"
        popupTitle={texts.homeScreen.section.popup.title}
        popupText={texts.homeScreen.section.popup.text}
        popupButtonText={texts.homeScreen.section.popup.button}
        darkMode={darkMode}
      />
      <CategoryGrid
        categories={[
          { textLabel: texts.homeScreen.section.categoryGrid.column1.title, icon: texts.homeScreen.section.categoryGrid.column1.svg, route: texts.homeScreen.section.categoryGrid.column1.route },
          { textLabel: texts.homeScreen.section.categoryGrid.column2.title, icon: texts.homeScreen.section.categoryGrid.column2.svg, route: texts.homeScreen.section.categoryGrid.column2.route },
          { textLabel: texts.homeScreen.section.categoryGrid.column3.title, icon: texts.homeScreen.section.categoryGrid.column3.svg, route: texts.homeScreen.section.categoryGrid.column3.route },
          { textLabel: texts.homeScreen.section.categoryGrid.column4.title, icon: texts.homeScreen.section.categoryGrid.column4.svg, route: texts.homeScreen.section.categoryGrid.column4.route },
        ]}
        darkMode={darkMode}
      />
      <SectionTitle
        title={texts.homeScreen.section_second.title}
        text={texts.homeScreen.section_second.text}
        iconName="help-circle"
        popupTitle={texts.homeScreen.section_second.popup.title}
        popupText={texts.homeScreen.section_second.popup.text}
        popupButtonText={texts.homeScreen.section_second.popup.button}
        darkMode={darkMode}
      />
      <CategoryCard categories={texts.categories} darkMode={darkMode} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 40,
  },
  container: {
    width: '90%',
    alignSelf: 'center',

  },
});

export default HomeScreen;
