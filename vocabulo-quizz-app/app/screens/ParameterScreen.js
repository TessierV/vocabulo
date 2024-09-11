import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Switch, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import Header from '@/components/Header/Header';
import Section from '@/components/Parameters/Section';
import Setting from '@/components/Parameters/Setting';
import Slider from '@/components/Slider/Slider';
import ReusableCard from '@/components/Game/ReusableCard';
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { texts } from '@/constants/texts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // For password visibility toggle

const ParameterScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [username, setUsername] = useState('');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [randomDigits, setRandomDigits] = useState(shuffleArray(Array.from({ length: 10 }, (_, i) => i.toString()))); // Shuffle digits for numeric keyboard
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          const response = await axios.get('http://192.168.0.12:8000/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsername(response.data.username);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  // Shuffle the digits for randomized keyboard
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
        'http://192.168.0.12:8000/change-password', // Ensure this is the correct endpoint
        { username, new_password: newPassword }, // Corrected payload format
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

  return (
    <View style={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Header darkMode={darkMode} PageTitle="Paramètre" title="Parametres" firstLink="/profil" secondLink="none" />
      <ScrollView style={[styles.container, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
      <Slider
          data={[
            {
              key: '1', component:
              <ReusableCard
              title={username}
              description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
              buttonText="Découvrir"
              onPressButton={() => console.log('Nouveaux Défis Découvrir')}
              containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
              iconBgColor={darkMode ? darkTheme.darkShade : color.darkBlue}
              darkMode={darkMode}
            />

            },
            {
              key: '2', component:
              <ReusableCard
                title="Nouveaux Défis"
                description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
                buttonText="Découvrir"
                onPressButton={() => console.log('Nouveaux Défis Découvrir')}
                containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
                iconBgColor={darkMode ? darkTheme.darkShade : color.darkBlue}
                darkMode={darkMode}
              />
            },

          ]}
          darkMode={darkMode}
        />
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
              onPress={() => setPasswordModalVisible(true)} // Show password modal
            />
          </Section>

          <Section title={texts.parameterScreen.section_second.title} iconName="sliders" darkMode={darkMode}>
            <Setting
              iconName={darkMode ? 'moon' : 'sun'}
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
            <Setting
              iconName="logout"
              text="Se déconnecter"
              buttonText=""
              onPress={() => setLogoutModalVisible(true)}
            />
          </Section>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Voulez-vous vraiment vous déconnecter ?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
                <Text style={styles.buttonText}>Se déconnecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Entrez un nouveau mot de passe de 5 chiffres</Text>

            <View style={styles.passwordContainer}>
              <View style={styles.passwordBoxes}>
                {[...Array(5)].map((_, i) => (
                  <View key={i} style={[styles.box, { backgroundColor: newPassword[i] ? '#90EE90' : 'transparent' }]}>
                    <Text style={styles.boxText}>{newPassword[i] ? newPassword[i] : ''}</Text>
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

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handlePasswordChange} disabled={loading}>
                <Text style={styles.buttonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    height: '80%',
    position: 'relative',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: '#f54242',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ParameterScreen;
