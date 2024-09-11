import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header/Header';
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
      <Header darkMode={darkMode} PageTitle="Profile" firstLink="/home" secondLink="/parameter" />
      <ScrollView style={{ width: '100%' }}>
      <View style={styles.section}>
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
        </View>

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
  section:{
    width: '90%',
    alignSelf: 'center',
  },
});

export default ProfileScreen;
