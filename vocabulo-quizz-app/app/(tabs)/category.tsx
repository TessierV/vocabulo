import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { Title, Subtitle, Paragraph, ButtonText, BigTitle, AnnonceTitle, AnnonceParagraph, ContainerTitle, ContainerParagraph } from '@/constants/StyledText';

const Page = () => {
  const [darkMode] = useDarkMode();

  return (
    <View style={{ flex: 1, padding: 40, justifyContent: 'space-around', backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }}>
      <View>
        <BigTitle style={{ color: darkMode ? color.neutralCoral : color.neutralCoral}}>BigTitle</BigTitle>
        <Title style={{ color: darkMode ? darkTheme.lightShade : lightTheme.darkShade}}>Title</Title>
      </View>
      <View>
        <Subtitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.darkShade}}>Subtitle</Subtitle>
        <Paragraph style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade}}>Paragraph</Paragraph>
      </View>
      {/* Annonce Banner */}
      <View style={{ backgroundColor: darkMode ? color.darkPlum : color.darkPlum, padding: 10, borderRadius: 8 }}>
        <AnnonceTitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade}}>AnnonceTitle</AnnonceTitle>
        <AnnonceParagraph style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.lightShade}}>AnnonceParagraph</AnnonceParagraph>
      </View>

      {/* Container */}
      <View>
        <ContainerTitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.darkShade}}>ContainerTitle</ContainerTitle>
        <View style={{ backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade, paddingVertical: 10, borderRadius: 8 }}>
          <ContainerParagraph style={{ color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade}}>ContainerParagraph</ContainerParagraph>
        </View>
      </View>

      {/* Button */}
      <View style={{ backgroundColor: darkMode ? color.neutralCoral : color.neutralCoral, padding: 10, borderRadius: 8 }}>
        <ButtonText style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade}}>ButtonText</ButtonText>
      </View>
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
