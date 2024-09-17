// This file defines the DeleteProfile component, to delete the user account

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '@/constants/Colors';
import { ButtonText } from '@/constants/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


type RootStackParamList = {
  LoginScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export default function DeleteProfile() {
  // State to hold the confirmation result for phone number re-authentication
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  // State to hold the verification code input by the user
  const [code, setCode] = useState('');
  // Navigation hook to navigate between screens
  const navigation = useNavigation<NavigationProp>();

  // Function to handle re-authentication by sending a verification code to the user's phone number
  const handleReauthenticate = async () => {
    const user = auth().currentUser;
    if (!user || !user.phoneNumber) {
      Alert.alert('Error', 'No user is logged in or phone number is missing.');
      return;
    }

    try {
      // Send a verification code to the user's phone number
      const confirmation = await auth().signInWithPhoneNumber(user.phoneNumber);
      setConfirm(confirmation); // Save the confirmation object to verify the code later
      Alert.alert('Code Sent', 'A verification code has been sent to your phone number.');
    } catch (error) {
      console.error('Error sending verification code:', error);
      Alert.alert('Error', 'Failed to send verification code. Please try again.');
    }
  };

  // Function to confirm the verification code entered by the user
  const confirmCode = async () => {
    try {
      if (confirm) {
        await confirm.confirm(code); // Confirm the verification code
        await handleDeleteProfile(); // Proceed to delete the profile
      } else {
        Alert.alert('Error', 'Please send a verification code first.');
      }
    } catch (error) {
      console.error('Error confirming code:', error);
      Alert.alert('Error', 'The verification code is incorrect.');
    }
  };

  // Function to handle the deletion of the user profile
  const handleDeleteProfile = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'No user is logged in.');
        return;
      }

      // Delete user data from Firestore
      await firestore().collection('users').doc(user.uid).delete();
      // Delete the user account from Firebase Authentication
      await user.delete();

      Alert.alert('Success', 'Your account has been successfully deleted', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('LoginScreen'); // Redirect to LoginScreen on successful deletion
          },
        },
      ]);
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'Failed to delete the account. Please try again.');
    }
  };

  // Function to show a confirmation dialog before deleting the profile
  const confirmDelete = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: handleReauthenticate,
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <ButtonText style={styles.textButton}>Delete Account</ButtonText>
        <TouchableOpacity onPress={confirmDelete}>
          <EvilIcons name="trash" style={styles.iconButton} />
        </TouchableOpacity>
      </View>

      {/* Input for the verification code */}
      {confirm && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={confirmCode} style={styles.confirmButton}>
            <ButtonText style={styles.confirmButtonText}>Confirm Code</ButtonText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 15,
    marginHorizontal: 'auto',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  textButton: {
    textAlign: 'center',
    color: Colors.black,
  },
  iconButton: {
    textAlign: 'center',
    color: Colors.grey,
    fontSize: 25,
  },
  input: {
    padding: 15,
    borderColor: Colors.darkBlue,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: Colors.darkBlue,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: Colors.white
  },
});
