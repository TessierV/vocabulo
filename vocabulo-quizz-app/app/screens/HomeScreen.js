import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import SectionTitle from '@/components/General/SectionTitle';
import { home } from '@/constants/texts';
import CategoryGrid from '@/components/CategoryGrid';
import { useNavigation } from '@react-navigation/native';
import GridCardHome from '@/components/Home/Home/GridCard';
import Header from '@/components/Header/Header';
import SliderHome from '@/components/Home/SliderHome';

const HomeScreen = () => {
  const [darkMode] = useDarkMode();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const fillColor = darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade;

  return (
    <ScrollView
      contentContainerStyle={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}
    >
      <Header darkMode={darkMode} PageTitle={home.header.title} title="Home" firstLink="none" secondLink="parameter" />
      <SliderHome darkMode={darkMode} />

      <View style={styles.container}>
        <SectionTitle
          title={home.section.title}
          darkMode={darkMode}
          showTextAndIcon={false}
        />
        <CategoryGrid
          categories={[
            { textLabel: home.section.row1.text, icon: 'category', route: home.section.row1.route },
            { textLabel: home.section.row2.text, icon: 'hybrid', route: home.section.row2.route },
            { textLabel: home.section.row3.text, icon: 'custom', route: home.section.row3.route },
            { textLabel: home.section.row4.text, icon: 'random', route: home.section.row4.route },
          ]}
          darkMode={darkMode}
        />
        <View style={[styles.container, { marginBottom: 15 }]} />
        <SectionTitle
          title={home.section2.title}
          text={home.section2.subtitle}
          iconName="info"
          popupTitle={home.section2.popup.title}
          popupText={home.section2.popup.text}
          popupButtonText={home.section2.popup.button}
          darkMode={darkMode}
        />
        <GridCardHome darkMode={darkMode} />
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
