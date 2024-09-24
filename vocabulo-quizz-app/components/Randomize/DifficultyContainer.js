import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import useDarkMode from '@/components/useDarkMode';
import { Paragraph } from '@/constants/StyledText';

const DifficultyContainer = ({ randomCategory, handleChangeDifficulty, isDifficultyAvailable, getDifficultySVG, textStyle, buttonStyle }) => {
  const [darkMode] = useDarkMode();

  return (
    <View style={styles.difficultyContainer}>
      {['easy', 'middle', 'hard'].map(difficulty => (
        <TouchableOpacity
          key={difficulty}
          style={buttonStyle(difficulty)}
          onPress={() => handleChangeDifficulty(difficulty)}
          disabled={!isDifficultyAvailable(difficulty)}
        >
          <SvgXml xml={getDifficultySVG(difficulty)} width="30" height="30" />
          <Paragraph style={textStyle(difficulty)}>{difficulty === 'easy' ? 'Facile' : difficulty === 'middle' ? 'Moyen' : 'Difficile'}</Paragraph>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  difficultyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DifficultyContainer;
