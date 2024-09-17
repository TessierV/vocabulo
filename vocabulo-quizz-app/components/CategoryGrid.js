import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { GridText } from '@/constants/StyledText';
import InterfaceSvg from '@/SVG/InterfaceSvg';

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
              },
            ]}
          >
            <InterfaceSvg
              width={36}
              height={36}
              iconName={category.icon}
              fillColor={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade}
            />
          </View>
          <View
            style={[
              styles.labelContainer,
              {
                width: squareSize,
              },
            ]}
          >
            <GridText style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.neutral }}>
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
    flexWrap: 'wrap',
    alignContent: 'center',

  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CategoryGrid;
