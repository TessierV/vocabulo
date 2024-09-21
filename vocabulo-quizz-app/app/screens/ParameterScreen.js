import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Switch, Text, TouchableOpacity, Alert } from 'react-native';
import Header from '@/components/Header/Header';
import Section from '@/components/Parameters/Section';
import Setting from '@/components/Parameters/Setting';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { texts, parameters } from '@/constants/texts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import SliderParameters from '@/components/Parameters/SliderParameters';
import ExplanationModal from '@/components/Parameters/ExplanationModal';
import config from '@/backend/config/config';
import axios from 'axios';
import EnhancedCustomModal from '@/components/Parameters/EnhancedCustomModal';



const ParameterScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [username, setUsername] = useState('');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [randomDigits, setRandomDigits] = useState(shuffleArray(Array.from({ length: 10 }, (_, i) => i.toString())));
  const navigation = useNavigation();
  const [sliderModalVisible, setSliderModalVisible] = useState(false);
  const [userFetchError, setUserFetchError] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const storedUsername = await AsyncStorage.getItem('username');
        if (token && storedUsername) {
          setUsername(storedUsername);
          setUserFetchError(false);
        } else {
          console.error('No token or username found');
          setUserFetchError(true);
          navigation.navigate('login');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
        setUserFetchError(true);
        Alert.alert(
          "Error",
          "An error occurred while fetching user information. Please try logging in again.",
          [{ text: "OK", onPress: () => navigation.navigate('login') }]
        );
      }
    };

    fetchUsername();
  }, [navigation]);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const handleKeyPress = (digit) => {
    if (newPassword.length < 5) {
      setNewPassword((prevPassword) => prevPassword + digit);
    }
  };

  const handleDelete = () => {
    setNewPassword(newPassword.slice(0, -1));
  };

  const handlePasswordChange = async () => {
    if (newPassword.length !== 5) {
      Alert.alert('Error', 'Password must be 5 digits.');
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.post(
        `${config.BASE_URL}:8000/change-password`,
        { username, new_password: newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.msg === 'Password changed successfully') {
        Alert.alert('Success', 'Password updated.');
        setPasswordModalVisible(false);
      } else {
        Alert.alert('Failed', response.data.detail);
      }
    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert('Failed', 'Error changing password.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      setLogoutModalVisible(false);
      navigation.navigate('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const handleCancelPasswordChange = () => {
    setPasswordModalVisible(false);
    setNewPassword('');
    setShowPassword(false);
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Header darkMode={darkMode} PageTitle="Paramètre" title="Parametres" firstLink="/profil" secondLink="none" />
      <ScrollView style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
        <SliderParameters darkMode={darkMode} setSliderModalVisible={setSliderModalVisible} />
        <View style={styles.Section}>
          <Section title={`${parameters.parameterScreen.section.title} - ${username}`} iconName="user" darkMode={darkMode}>
            <Setting
              iconName="edit"
              text={parameters.parameterScreen.section.editProfile}
              buttonText=""
              onPress={() => console.log('Edit profile pressed')}
            />
            <Setting
              iconName="key"
              text={parameters.parameterScreen.section.changePassword}
              buttonText=""
              onPress={() => setPasswordModalVisible(true)}
            />
          </Section>

          <Section title={parameters.parameterScreen.section_second.title} iconName="sliders" darkMode={darkMode}>
            <Setting
              iconName={darkMode ? 'moon' : 'sun'}
              text={darkMode ? parameters.parameterScreen.section_second.themeDark : parameters.parameterScreen.section_second.themeLight}
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

          <Section title={parameters.parameterScreen.section_third.title} iconName="paperclip" darkMode={darkMode}>
            <Setting
              iconName="faq"
              text={parameters.parameterScreen.section_third.ask}
              buttonText=""
              onPress={() => console.log('FAQ pressed')}
            />
            <Setting
              iconName="send"
              text={parameters.parameterScreen.section_third.contact}
              buttonText=""
              onPress={() => console.log('Contact us pressed')}
            />
            <Setting
              iconName="layer"
              text={parameters.parameterScreen.section_third.version}
              buttonText=""
              onPress={() => console.log('View version pressed')}
            />
            <Setting
              iconName="logout"
              text="Se déconnecter"
              buttonText=""
              onPress={() => setLogoutModalVisible(true)}
            />
          </Section>
        </View>
      </ScrollView>

      <EnhancedCustomModal
        visible={logoutModalVisible}
        title="Déconnexion"
        content="Voulez-vous vraiment vous déconnecter ?"
        buttonText="Se déconnecter"
        onPress={logout}
        onCancel={handleCancelLogout}
        darkMode={darkMode}
      />

      <EnhancedCustomModal
        visible={passwordModalVisible}
        title="Changer le mot de passe"
        content={
          <View style={styles.passwordContainer}>
            <View style={styles.passwordBoxes}>
              {[...Array(5)].map((_, i) => (
                <View key={i} style={[styles.box, { backgroundColor: newPassword[i] ? '#90EE90' : 'transparent' }]}>
                  <Text style={styles.boxText}>{newPassword[i] ? (showPassword ? newPassword[i] : '*') : ''}</Text>
                </View>
              ))}
            </View>
            <View style={styles.numericKeyboard}>
              {randomDigits.map((digit) => (
                <TouchableOpacity
                  key={digit}
                  style={styles.numericKey}
                  onPress={() => handleKeyPress(digit)}
                >
                  <Text style={styles.keyText}>{digit}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.deleteKey} onPress={handleDelete}>
                <Text style={styles.keyText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.toggleButton}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#1E90FF" />
            </TouchableOpacity>
          </View>
        }
        buttonText="Confirmer"
        onPress={handlePasswordChange}
        onCancel={handleCancelPasswordChange}
        darkMode={darkMode}
      />

      <ExplanationModal visible={sliderModalVisible} onClose={() => setSliderModalVisible(false)} darkMode={darkMode} />
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
    width: '100%',
  },
  Section: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 70,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: darkTheme.lightShade,
  },
  passwordContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  passwordBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  numericKeyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numericKey: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  deleteKey: {
    width: 100,
    height: 50,
    backgroundColor: '#f54242',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  keyText: {
    fontSize: 18,
  },
  toggleButton: {
    marginTop: 10,
  },
});

export default ParameterScreen;