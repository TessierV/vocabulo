import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigTitle, ContainerTitle, Paragraph, Subtitle } from '@/constants/StyledText';
import { GradientBackgroundButton } from '@/components/Button';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { color, lightTheme } from '@/constants/Colors';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        navigation.navigate('home');
      }
    };
    checkLoggedIn();
  }, [navigation]);

  const handleKeyPress = (digit) => {
    if (password.length < 5) {
      setPassword((prevPassword) => prevPassword + digit);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  const handleLogin = async () => {
    if (username.trim() === '' || password.length !== 5) {
      Alert.alert('Error', 'Please enter a username and a 5-digit password.');
      return;
    }

    setLoading(true);

    try {
      const data = qs.stringify({
        username,
        password: parseInt(password),
      });

      const response = await axios.post('http://192.168.0.12:8000/token', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (response.data && response.data.access_token) {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('access_token', response.data.access_token);

        // Vérifie si user_id est présent dans la réponse
        if (response.data.user_id) {
          await AsyncStorage.setItem('user_id', String(response.data.user_id)); // Stocker user_id sous forme de chaîne
          console.log(`Stored user_id: ${response.data.user_id}`);
        } else {
          console.error('user_id is not provided in the response');
        }

        navigation.navigate('home');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <BigTitle style={styles.title}>Login</BigTitle>

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
          text="Login"
          textColor={'light'}
          onPress={handleLogin}
        />

        <TouchableOpacity style={{ textAlign: 'center', alignItems: 'center', marginTop: 10 }} onPress={() => navigation.navigate('signup')}>
          <Paragraph style={{ textDecorationLine: 'underline', fontSize: 12 }}>No account? Sign Up</Paragraph>
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
