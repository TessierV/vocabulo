import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import GradientSVG from '@/SVG/GradientSVG';
import SvgDifficulty from '@/SVG/DifficultySvgIcon';
import { Paragraph } from '@/constants/StyledText';
import { darkTheme, lightTheme, color } from '@/constants/Colors';

const FilterButtons = ({ darkMode, selectedFilter, setFilter, setSelectedFilter, options }) => {
  return (
    <ScrollView
      horizontal
      style={{ marginVertical: 15 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterBar}
    >
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => {
            setFilter(option);
            setSelectedFilter(option);
          }}
          style={[
            styles.filterButton,
            {
              borderColor:
                selectedFilter === option
                  ? option === 'all'
                    ? darkMode
                      ? darkTheme.light_darkShade
                      : lightTheme.dark_lightShade
                    : option === 'easy'
                    ? color.neutralGreen
                    : option === 'medium'
                    ? color.neutralBlue
                    : color.neutralPlum
                  : darkMode
                  ? darkTheme.light_darkShade
                  : color.neutral,
              backgroundColor:
                selectedFilter === option
                  ? option === 'all'
                    ? lightTheme.dark_lightShade
                    : option === 'easy'
                    ? color.neutralGreen
                    : option === 'medium'
                    ? color.neutralBlue
                    : color.neutralPlum
                  : 'transparent',
              gap: 5,
            },
          ]}
        >
          {selectedFilter === option && (
            <View style={styles.gradientContainer}>
              <GradientSVG
                colors={
                  option === 'all'
                    ? [color.neutralGreen, color.neutralBlue, color.neutralPlum]
                    : option === 'easy'
                    ? [color.lightGreen, color.neutralGreen, color.darkGreen]
                    : option === 'medium'
                    ? [color.lightBlue, color.neutralBlue, color.darkBlue]
                    : [color.lightPlum, color.neutralPlum, color.darkPlum]
                }
              />
            </View>
          )}
          <SvgDifficulty difficulty={option} isSelected={selectedFilter === option} />
          <Paragraph
            style={[
              styles.filterButtonText,
              {
                color:
                  selectedFilter === option
                    ? darkTheme.darkShade
                    : darkMode
                    ? darkTheme.dark_lightShade
                    : lightTheme.lightDarkShade,
              },
            ]}
          >
            {option === 'all'
              ? 'Tout'
              : option === 'easy'
              ? 'Facile'
              : option === 'medium'
              ? 'Moyen'
              : 'Difficile'}
          </Paragraph>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  recapCount: {
    fontSize: 12,
    color: lightTheme.dark_lightShade,
  },
  filterScrollView: {
    width: '100%',
    maxHeight: 45,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    height: 40,
    width: '100%',
  },
  filterButton: {
    minWidth: 80,
    flexWrap: 'wrap',
    borderRadius: 8,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    padding: 5,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 12,
  },

  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    overflow: 'hidden',
  },

});

export default FilterButtons;
