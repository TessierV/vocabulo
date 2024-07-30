import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { BigTitle, Subtitle } from '@/constants/StyledText';
import useDarkMode from '@/components/useDarkMode';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import WeeklyOverview from '@/components/Home/WeeklyOverview';
import DailyGoals from '@/components/Home/DailyGoals';
import UpcomingEvents from '@/components/Home/UpcomingEvents';
import SectionTitle from '@/components/SectionTitle';

const HomeScreen = () => {
  const [darkMode] = useDarkMode();
  const { width } = Dimensions.get('window');

  const [currentIndex, setCurrentIndex] = useState(0);

  // Data for the FlatList
  const data = [
    { key: '1', component: <WeeklyOverview darkMode={darkMode} /> },
    { key: '2', component: <DailyGoals darkMode={darkMode} /> },
    { key: '3', component: <UpcomingEvents darkMode={darkMode} /> },
  ];

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
      <BigTitle style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }}>Welcome</BigTitle>
      <Subtitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.light_darkShade }}>Amandine</Subtitle>
      <View style={styles.sliderContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={[styles.sliderItem, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
              {item.component}
            </View>
          )}
          horizontal
          pagingEnabled
          keyExtractor={item => item.key}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          contentContainerStyle={styles.flatListContent}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: currentIndex === index ? color.darkGreen : (darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade)
              }
            ]}
          />
        ))}
      </View>

      <SectionTitle
        title="Exercice"
        text="aide"
        iconName="help-circle"
        popupTitle="À propos"
        popupText="Ceci est une explication détaillée apparaissant dans le pop-up lorsque vous cliquez sur l'icône."
        popupButtonText="Fermer"
        darkMode={darkMode}
      />

      <SectionTitle
        title="Populaire"
        text="aide"
        iconName="help-circle"
        popupTitle="À propos 2"
        popupText="Ceci est une explication détaillée apparaissant dans le pop-up lorsque vous cliquez sur l'icône."
        popupButtonText="Fermer"
        darkMode={darkMode}
      />



    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  sliderItem: {
    width: Dimensions.get('window').width - 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    height: 130,
    backgroundColor: 'plum',
    borderRadius: 8,
  },
  flatListContent: {
    paddingHorizontal: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
    backgroundColor: 'gray',
  },
});
