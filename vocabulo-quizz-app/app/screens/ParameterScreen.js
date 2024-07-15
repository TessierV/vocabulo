import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import Header from '@/components/Header';
import Section from '@/components/Parameters/Section';
import Setting from '@/components/Parameters/Setting';
import BannerContainer from '@/components/Banner';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';


const ParameterScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();


  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.background : lightTheme.background }]}>
      <Header darkMode={darkMode} title="Parametres" firstLink="/profile" secondLink="none" />
      <BannerContainer title="Parametre" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit" darkMode={darkMode} />

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

        <Section title="Personnalisation" iconName="sliders" darkMode={darkMode}>
          <Setting
            iconName="moon"
            text="Dark Mode"
            buttonText=""
            onPress={toggleDarkMode}
            children={
              <Switch
                value={darkMode}
                onValueChange={toggleDarkMode}
                thumbColor={darkMode ? '#FFFFFF' : '#000000'}
                trackColor={{ false: '#CCCCCC', true: '#333333' }}
              />
            }
          />
          <Setting
            iconName="type"
            text="Taille Texte"
            buttonText="Edit"
            onPress={() => console.log('Edit text size pressed')}
          />
        </Section>

        <Section title="Settings" iconName="paperclip" darkMode={darkMode}>
          <Setting
            iconName="help-circle"
            text="FAQ"
            buttonText="View"
            onPress={() => console.log('FAQ pressed')}
          />
          <Setting
            iconName="mail"
            text="Contactez-nous"
            buttonText="Contact"
            onPress={() => console.log('Contact us pressed')}
          />
          <Setting
            iconName="layers"
            text="Version"
            buttonText="View"
            onPress={() => console.log('View version pressed')}
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

export default ParameterScreen;
