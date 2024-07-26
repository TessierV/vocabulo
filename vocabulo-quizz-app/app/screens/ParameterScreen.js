import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import Header from '@/components/Header';
import Section from '@/components/Parameters/Section';
import Setting from '@/components/Parameters/Setting';
import BannerContainer from '@/components/Banner';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { texts } from '@/constants/texts';


const ParameterScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();


  return (
    <View style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Header darkMode={darkMode} title="Parametres" firstLink="/profile" secondLink="none" />
      <BannerContainer
        title={texts.parameterScreen.banner.title}
        text={texts.parameterScreen.banner.text}
        popuptitle={texts.parameterScreen.banner.popup.title}
        popuptext={texts.parameterScreen.banner.popup.text}
        popupbutton={texts.parameterScreen.banner.popup.button}
        darkMode={darkMode} />

      <ScrollView style={{ width: '100%' }}>
        <Section title={texts.parameterScreen.section.title} iconName="user" darkMode={darkMode}>
          <Setting
            iconName="edit-3"
            text={texts.parameterScreen.section.editProfile}
            buttonText=""
            onPress={() => console.log('Edit profile pressed')}
          />
          <Setting
            iconName="lock"
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
          <Setting
            iconName="type"
            text={texts.parameterScreen.section_second.sizeText}
            buttonText=""
            onPress={() => console.log('Edit text size pressed')}
          />
        </Section>

        <Section title={texts.parameterScreen.section_third.title} iconName="paperclip" darkMode={darkMode}>
          <Setting
            iconName="help-circle"
            text={texts.parameterScreen.section_third.ask}
            buttonText=""
            onPress={() => console.log('FAQ pressed')}
          />
          <Setting
            iconName="mail"
            text={texts.parameterScreen.section_third.contact}
            buttonText=""
            onPress={() => console.log('Contact us pressed')}
          />
          <Setting
            iconName="layers"
            text={texts.parameterScreen.section_third.version}
            buttonText=""
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
