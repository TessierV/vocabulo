import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { color, darkTheme, lightTheme } from '@/constants/Colors';

const Slider = ({ data, darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <>
      <View style={styles.sliderContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.sliderItem}>
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
                backgroundColor: currentIndex === index ? lightTheme.darkShade : (darkMode ? darkTheme.dark_lightShade :  darkTheme.dark_lightShade)
              }
            ]}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginBottom: 10,
  },
  sliderItem: {
    width: Dimensions.get('window').width - 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    height: 150,
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
    borderRadius: 8,
    margin: 3,
  },
});

export default Slider;
