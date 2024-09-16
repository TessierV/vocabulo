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
  // Use correct type for confirmation result
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null); 
  const [code, setCode] = useState(''); 
  const navigation = useNavigation<NavigationProp>();

  const handleReauthenticate = async () => {
    const user = auth().currentUser;
    if (!user || !user.phoneNumber) {
      Alert.alert('Erreur', 'Aucun utilisateur connecté ou le numéro de téléphone est manquant.');
      return;
    }

    try {
      // Send a new verification code to the user's phone number
      const confirmation = await auth().signInWithPhoneNumber(user.phoneNumber);
      setConfirm(confirmation); // Save confirmation object to verify code later
      Alert.alert('Code envoyé', 'Un code de vérification a été envoyé à votre numéro de téléphone.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du code de vérification:', error);
      Alert.alert('Erreur', 'Échec de l\'envoi du code de vérification. Veuillez réessayer.');
    }
  };

  const confirmCode = async () => {
    try {
      if (confirm) {
        await confirm.confirm(code); // Re-authenticate the user by confirming the code
        await handleDeleteProfile(); // Proceed to delete the account
      } else {
        Alert.alert('Erreur', 'Veuillez d\'abord envoyer un code de vérification.');
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation du code:', error);
      Alert.alert('Erreur', 'Le code de vérification est incorrect.');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Erreur', 'Aucun utilisateur connecté');
        return;
      }

      await firestore().collection('users').doc(user.uid).delete(); // Delete user data from Firestore
      await user.delete(); // Delete Firebase Authentication user

      Alert.alert('Succès', 'Votre compte a été supprimé avec succès', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('LoginScreen'); // Redirect to LoginScreen on successful deletion
          },
        },
      ]);
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      Alert.alert('Erreur', 'Échec de la suppression du compte. Veuillez réessayer.');
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmation de Suppression',
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: handleReauthenticate,
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <ButtonText style={styles.textButton}>Supprimer le compte</ButtonText>
        <TouchableOpacity onPress={confirmDelete}>
          <EvilIcons name="trash" style={styles.iconButton} />
        </TouchableOpacity>
      </View>

      {/* Input for verification code */}
      {confirm && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Entrez le code de vérification"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={confirmCode} style={styles.confirmButton}>
            <ButtonText>Confirmer le code</ButtonText>
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
    borderColor: Colors.darkGreen,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: Colors.darkGreen,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
  },
});
