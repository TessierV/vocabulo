import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { Title, Subtitle, Paragraph, ButtonText, BigTitle, AnnonceTitle, AnnonceParagraph, ContainerTitle, ContainerParagraph } from '@/constants/StyledText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GameScreen from '../screens/GameScreen';
import DailyGoals from '@/components/Home/DailyGoals';

const Page = () => {
  const [darkMode] = useDarkMode();

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
      <GameScreen />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
