import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      // Send POST request to the FastAPI backend with proper headers
      const response = await axios.post(
        'http://192.168.0.12:8000/register',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json', // Make sure to set the correct content type
          },
        }
      );

      if (response.data.msg === 'User created successfully') {
        Alert.alert('Success', 'Account created. Please log in.');
        navigation.navigate('login');
      } else {
        Alert.alert('Signup Failed', response.data.detail);
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        // Handle specific status code errors
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
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <Button title="Sign Up" onPress={handleSignup} disabled={loading} />
      <Text style={{ marginTop: 20 }}>Already have an account?</Text>
      <Button title="Login" onPress={() => navigation.navigate('login')} />
    </View>
  );
}
