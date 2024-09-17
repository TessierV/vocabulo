import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';

const ProtectedScreen = ({ route }) => {
  const { token } = route.params;
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.12:8000/protected', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.msg);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch data');
      }
    };

    fetchData();
  }, [token]);

  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
};

export default ProtectedScreen;
