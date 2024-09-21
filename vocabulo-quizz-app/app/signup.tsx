import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BigTitle, ContainerTitle, Paragraph, Subtitle } from '@/constants/StyledText';
import { GradientBackgroundButton } from '@/components/Button';
import { color, lightTheme } from '@/constants/Colors';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import config from '@/backend/config/config';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleKeyPress = (digit) => {
    if (password.length < 5) {
      setPassword((prevPassword) => prevPassword + digit);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  const handleSignup = async () => {
    if (username.trim() === '' || password.length !== 5) {
      Alert.alert('Error', 'Please enter a username and a 5-digit password.');
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}:8000/register`, { username, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.msg === 'User created successfully') {
        Alert.alert('Success', 'Account created. Please log in.');
        navigation.navigate('login');
      } else {
        Alert.alert('Signup Failed', response.data.detail);
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert('Signup Failed', 'This username is already registered.');
        } else {
          Alert.alert('Signup Failed', 'An error occurred. Please try again.');
        }
      } else {
        Alert.alert('Signup Failed', 'Network error. Please check your connection.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <BigTitle style={styles.title}>Sign Up</BigTitle>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <View style={styles.passwordBoxes}>
          {[...Array(5)].map((_, i) => (
            <View
              key={i}
              style={[styles.box, { backgroundColor: password[i] ? color.neutralBlue : 'transparent' }]}
            >
              <Text style={styles.boxText}>{showPassword ? password[i] : password[i] ? '*' : ''}</Text>
            </View>
          ))}
        </View>
      </View>

      <ContainerTitle>Clavier :</ContainerTitle>
      <View style={styles.numericKeyboard}>
        {Array.from({ length: 10 }, (_, i) => (
          <TouchableOpacity
            key={i}
            style={styles.numericKey}
            onPress={() => handleKeyPress(i.toString())}
          >
            <Subtitle style={styles.keyText}>{i}</Subtitle>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.toggleButton} onPress={handleDelete}>
          <InterfaceSvg iconName="key_delete" height={21} width={21} fillColor={lightTheme.dark_lightShade} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.toggleButton}>
          <InterfaceSvg iconName={showPassword ? 'eye-off' : 'eye'} height={20} width={20} fillColor={lightTheme.dark_lightShade} />
        </TouchableOpacity>
      </View>

      <View style={{ alignSelf: 'center', marginTop: '8%' }}>
        <GradientBackgroundButton
          text="Sign Up"
          textColor="light"
          onPress={handleSignup}
        />
        <TouchableOpacity style={{ textAlign: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('login')}>
          <Paragraph style={{ textDecorationLine: 'underline', fontSize: 12, borderColor: lightTheme.darkShade }}>Already have an account? Log in</Paragraph>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: lightTheme.dark_lightShade, flex: 1, justifyContent: 'center', gap: 20 },
  title: { fontSize: 35, marginBottom: 20, textAlign: 'center' },
  input: { padding: 10, borderWidth: 1, borderColor: color.neutral, borderRadius: 8, fontSize: 16 },
  passwordContainer: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  passwordBoxes: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  box: { borderWidth: 1, borderColor: color.neutral, borderRadius: 8, width: 55, height: 60, justifyContent: 'center', alignItems: 'center' },
  boxText: { fontSize: 18, fontWeight: 'bold' },
  toggleButton: { backgroundColor: lightTheme.darkShade, borderWidth: 1, borderColor: color.neutral, borderRadius: 8, height: 50, width: 50, alignItems: 'center', justifyContent: 'center' },
  numericKeyboard: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%', gap: 8 },
  numericKey: { width: 50, height: 50, borderColor: color.neutral, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  keyText: { fontSize: 18, color: lightTheme.darkShade },
});
