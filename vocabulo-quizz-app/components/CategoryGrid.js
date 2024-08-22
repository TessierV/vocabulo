import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { GridText } from '@/constants/StyledText';
import SvgIcon from './Category/SvgIcon';

const CategoryGrid = ({ categories, darkMode }) => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth / 4 - 25;

  const handlePress = (route) => {
    router.push(route);
  };

  return (
    <View style={styles.grid}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => handlePress(category.route)}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade,
                width: squareSize,
                height: squareSize,
              }
            ]}
          >
            <SvgIcon icon={category.icon} fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
          </View>
          <View
            style={[
              styles.labelContainer,
              {
                width: squareSize,
              }
            ]}
          >
            <GridText style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }}>
              {category.textLabel || 'Unknown'}
            </GridText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default CategoryGrid;
