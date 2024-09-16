import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Paragraph } from '@/constants/StyledText';
import SvgIcon from '@/SVG/CategorySvgIcon';
import { darkTheme, lightTheme, color } from '@/constants/Colors';

const SubcategoryList = ({ subcategories, filter, darkMode, getWordCountByDifficulty, getCircularProgressSvg, handleSectionClick }) => {
  return (
    <>
      {subcategories.map(subcat => {
        const { totalWords, filteredCount } = getWordCountByDifficulty(subcat, filter);

        return (
          <TouchableOpacity
            key={subcat.subcat_id}
            style={[
              styles.subcategoryContainer,
              filteredCount < 6
                ? {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: darkMode ? darkTheme.light_darkShade : color.neutral,
                  }
                : {
                    backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade,
                  },
            ]}
            // Change onPress to do nothing if filteredCount < 6
            onPress={filteredCount >= 6 ? () => handleSectionClick(subcat, filter) : null}
          >
            <View style={styles.iconTextContainer}>
              <SvgIcon icon={subcat.subcategory_name} fillColor={color.darkBlue} width="30" height="30" />
              <Paragraph
                style={[
                  styles.subcategoryText,
                  { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade },
                ]}
              >
                {subcat.subcategory_name}
              </Paragraph>
            </View>

            <View style={styles.progressContainer}>
              {filter === 'all' ? (
                <Paragraph style={[{ fontSize: 12, color: darkMode ? darkTheme.neutral : lightTheme.neutral }]}>
                  {totalWords} {subcat.word_count > 1 ? 'words' : 'word'}
                </Paragraph>
              ) : (
                <SvgXml xml={getCircularProgressSvg(filteredCount, totalWords, color.neutralGreen, color.neutralBlue, color.neutralPlum)} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    minHeight: 60,
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  subcategoryText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubcategoryList;
