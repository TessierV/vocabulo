import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'; // Import necessary components
import useDarkMode from '@/components/useDarkMode'; // Custom hook for dark mode
import { darkTheme, lightTheme } from '@/constants/Colors'; // Theme constants
import SectionTitle from '@/components/General/SectionTitle'; // Section title component
import { home } from '@/constants/texts'; // Home text constants
import CategoryGrid from '@/components/CategoryGrid'; // Category grid component
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import GridCardHome from '@/components/Home/Home/GridCard'; // Grid card component for home
import Header from '@/components/Header/Header'; // Header component
import SliderHome from '@/components/Home/SliderHome'; // Slider component for home

// Main functional component
const HomeScreen = () => {
  const [darkMode] = useDarkMode(); // Get the current dark mode state
  const navigation = useNavigation(); // Initialize navigation
  const { width } = Dimensions.get('window'); // Get the device width

  // Set background color based on dark mode
  const fillColor = darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade;

  return (
    <ScrollView
      contentContainerStyle={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]} // Set background color
    >
      {/* Header with title and navigation links */}
      <Header darkMode={darkMode} PageTitle={home.header.title} title="Home" firstLink="none" secondLink="parameter" />

      {/* Slider component */}
      <SliderHome darkMode={darkMode} />

      <View style={styles.container}>
        {/* Section title for the first section */}
        <SectionTitle
          title={home.section.title}
          darkMode={darkMode}
          showTextAndIcon={false}
        />

        {/* Category grid component with predefined categories */}
        <CategoryGrid
          categories={[
            { textLabel: home.section.row1.text, icon: 'category', route: home.section.row1.route }, // Category 1
            { textLabel: home.section.row2.text, icon: 'hybrid', route: home.section.row2.route }, // Category 2
            { textLabel: home.section.row3.text, icon: 'custom', route: home.section.row3.route }, // Category 3
            { textLabel: home.section.row4.text, icon: 'random', route: home.section.row4.route }, // Category 4
          ]}
          darkMode={darkMode}
        />

        {/* Spacer for margin */}
        <View style={[styles.container, { marginBottom: 15 }]} />

        {/* Section title for the second section */}
        <SectionTitle
          title={home.section2.title}
          text={home.section2.subtitle} // Subtitle text
          iconName="info" // Icon for the section
          popupTitle={home.section2.popup.title} // Popup title
          popupText={home.section2.popup.text} // Popup text
          popupButtonText={home.section2.popup.button} // Popup button text
          darkMode={darkMode} // Pass dark mode state
        />

        {/* Grid card component for additional content */}
        <GridCardHome darkMode={darkMode} />
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%', // Full width of the screen
    alignSelf: 'center', // Center align
  },
  container: {
    width: '90%', // 90% width for inner container
    alignSelf: 'center', // Center align
  },
});


export default HomeScreen;
