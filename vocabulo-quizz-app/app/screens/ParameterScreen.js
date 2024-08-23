import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import Header from '@/components/Header/Header';
import Section from '@/components/Parameters/Section';
import Setting from '@/components/Parameters/Setting';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { texts } from '@/constants/texts';


const ParameterScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();


  return (
    <View style={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Header darkMode={darkMode} title="Parametres" firstLink="/profil" secondLink="none" />
      <ScrollView style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
        <View style={styles.Section}>
        <Section title={texts.parameterScreen.section.title} iconName="user" darkMode={darkMode}>
          <Setting
            iconName="edit"
            text={texts.parameterScreen.section.editProfile}
            buttonText=""
            onPress={() => console.log('Edit profile pressed')}
          />
          <Setting
            iconName="key"
            text={texts.parameterScreen.section.changePassword}
            buttonText=""
            onPress={() => console.log('Change password pressed')}
          />
        </Section>

        <Section title={texts.parameterScreen.section_second.title} iconName="sliders" darkMode={darkMode}>
          <Setting
            iconName={darkMode ? "moon": "sun"}
            text={darkMode ? texts.parameterScreen.section_second.themeDark : texts.parameterScreen.section_second.themeLight}
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
        </Section>

        <Section title={texts.parameterScreen.section_third.title} iconName="paperclip" darkMode={darkMode}>
          <Setting
            iconName="faq"
            text={texts.parameterScreen.section_third.ask}
            buttonText=""
            onPress={() => console.log('FAQ pressed')}
          />
          <Setting
            iconName="send"
            text={texts.parameterScreen.section_third.contact}
            buttonText=""
            onPress={() => console.log('Contact us pressed')}
          />
          <Setting
            iconName="layer"
            text={texts.parameterScreen.section_third.version}
            buttonText=""
            onPress={() => console.log('View version pressed')}
          />
        </Section>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    width: '100%',
  },
  Section: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default ParameterScreen;
