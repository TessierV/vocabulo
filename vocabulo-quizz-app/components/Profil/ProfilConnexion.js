import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { Paragraph } from '@/constants/StyledText';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { profil } from '@/constants/texts';

const ProfilConnexion = ({ maxStreak, currentStreak, totalDaysOnline, darkMode }) => {
  const getStyles = (isDarkMode) => ({
    valueStyle: {
      color: isDarkMode ? darkTheme.lightShade : lightTheme.lightShade,
      backgroundColor: isDarkMode ? darkTheme.light_darkShade : lightTheme.darkShade,
    },
    titleStyle: {
      color: isDarkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade,
    },
  });

  const stylesMode = getStyles(darkMode);

  return (
    <View style={styles.streakContainer}>
      {[{ label: profil.section2.col1, value: maxStreak },
        { label: profil.section2.col2, value: currentStreak },
        { label: profil.section2.col3, value: totalDaysOnline }]
        .map((item, index) => (
          <View key={index} style={styles.streakColumn}>
            <Paragraph style={[styles.streakValue, stylesMode.valueStyle]}>{item.value}</Paragraph>
            <Paragraph style={[styles.streakTitle, stylesMode.titleStyle]}>{item.label}</Paragraph>
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  streakColumn: {
    alignItems: 'center',
    width: '30%',
  },
  streakTitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  streakValue: {
    fontSize: 24,
    textAlign: 'center',
    minHeight: 40,
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    width: '100%',
  },
});

export default ProfilConnexion;
