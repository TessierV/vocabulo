import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Section from '../../components/Parameters/Section';
import Setting from '../../components/Parameters/Setting';
import BannerContainer from '../../components/Banner';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';

const ProfileScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
      <Header darkMode={darkMode} firstLink="/home" secondLink="/parameter" />
      <BannerContainer title="Profil" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit " darkMode={darkMode} />
      <ScrollView style={{ width: '100%' }}>
        <Section title="Profil" iconName="user" darkMode={darkMode}>
          <Setting
            iconName="edit-3"
            text="Edit Profile"
            buttonText="Edit"
            onPress={() => console.log('Edit profile pressed')}
          />
          <Setting
            iconName="lock"
            text="Change Password"
            buttonText="Change"
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
