import { View, Animated, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ButtonText } from '@/constants/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function CustomProfile() {
  const [userName, setUserName] = useState<string>('Utilisateur');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>(userName);
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData && userData.name) {
              setUserName(userData.name);
              setNewUserName(userData.name);
            }
          } else {
            console.log('User document does not exist');
          }
        } else {
          console.error('No user is authenticated');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();

    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    moveAnimation.start();
  }, [moveAnim]);

  // Function to update user name in Firestore
  const updateUserName = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await firestore().collection('users').doc(user.uid).update({
          name: newUserName,
        });
        setUserName(newUserName);
        setIsEditing(false);
      } else {
        Alert.alert('Error', 'No user is authenticated');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update user name');
      console.error('Error updating user name: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./../../assets/images/Logo-blue.png')}
        style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
      />
      <View style={styles.UserNameContainer}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={newUserName}
            onChangeText={setNewUserName}
            autoFocus
            onSubmitEditing={updateUserName}
          />
        ) : (
          <ButtonText style={styles.UserName}>{userName}</ButtonText>
        )}
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <EvilIcons name="pencil" style={styles.ModifyUserNameiconButton} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 100,
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'center',
    marginHorizontal: 'auto',
    padding: 15,
  },
  logo: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  UserNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderBottomColor: Colors.grey,
    marginTop: 10,
  },
  UserName: {
    paddingHorizontal: 20,
  },
  ModifyUserNameiconButton: {
    fontSize: 25,
  },
  input: {
    color: Colors.grey,
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    paddingHorizontal: 20,
  },
});
