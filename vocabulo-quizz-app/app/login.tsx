//login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';  // Import this to format the data as form-urlencoded

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      // Prepare the data in x-www-form-urlencoded format
      const data = qs.stringify({
        username,
        password,
      });

      // Make a request to the FastAPI backend to log in
      const response = await axios.post('http://192.168.0.12:8000/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Important: send as form-urlencoded
        },
      });

      if (response.data && response.data.access_token) {
        // Store the token for future requests
        console.log('Login successful:', response.data.access_token);
        // Navigate to a protected screen after successful login
        navigation.navigate('home');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      <Text style={{ marginTop: 20 }}>Don't have an account?</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('signup')} />
    </View>
  );
}
