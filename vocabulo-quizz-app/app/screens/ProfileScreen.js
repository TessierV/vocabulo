import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Section from '../../components/Parameters/Section';
import Setting from '../../components/Parameters/Setting';
import BannerContainer from '../../components/Banner';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { texts } from '@/constants/texts';

const ProfileScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Header darkMode={darkMode} firstLink="/home" secondLink="/parameter" />
      <BannerContainer
        title={texts.profilScreen.banner.title}
        text={texts.profilScreen.banner.text}
        popuptitle={texts.profilScreen.banner.popup.title}
        popuptext={texts.profilScreen.banner.popup.text}
        popupbutton={texts.profilScreen.banner.popup.button}
        darkMode={darkMode}
      />
      <ScrollView style={{ width: '100%' }}>
        <Section title={texts.profilScreen.section.title} iconName="user" darkMode={darkMode}>
          <Setting
            iconName="edit-3"
            text={texts.profilScreen.section.editProfile}
            onPress={() => console.log('Edit profile pressed')}
          />
          <Setting
            iconName="lock"
            text={texts.profilScreen.section.changePassword}
            onPress={() => console.log('Change password pressed')}
          />
        </Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default ProfileScreen;
