import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { color, darkTheme, lightTheme } from '@/constants/Colors';

const BigSlider = ({ data, darkMode }) => {
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
                backgroundColor:
                  currentIndex === index
                    ? darkMode
                      ? darkTheme.neutral
                      : lightTheme.darkShade
                    : darkMode
                    ? darkTheme.dark_lightShade
                    : color.neutral,
                    width:
                  currentIndex === index
                    ? 20
                    : 8,
              },
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
    height: 250,
  },
  sliderItem: {
    width: Dimensions.get('window').width - 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    height: 250,

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

export default BigSlider;
