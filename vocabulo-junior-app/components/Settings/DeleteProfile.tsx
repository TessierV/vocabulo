import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ButtonText } from '@/constants/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function DeleteProfile() {
  const handleDeleteProfile = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Erreur', 'Aucun utilisateur connecté');
        return;
      }

      await firestore().collection('users').doc(user.uid).delete();

      await user.delete();

      Alert.alert('Succès', 'Votre compte a été supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression du compte');
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
          onPress: handleDeleteProfile,
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
    borderWidth: 1
  },
  textButton: {
    textAlign: 'center',
    color: Colors.grey,
  },
  iconButton: {
    textAlign: 'center',
    color: Colors.grey,
    fontSize: 25,
  },
});
