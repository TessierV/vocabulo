import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '@/constants/Colors';
import { ButtonText } from '@/constants/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  LoginScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export default function SignoutProfile() {
  const navigation = useNavigation<NavigationProp>();

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      Alert.alert('Succès', 'Vous avez été déconnecté avec succès', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('LoginScreen');
          },
        },
      ]);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion');
    }
  };

  const confirmSignOut = () => {
    Alert.alert(
      'Confirmation de Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Se déconnecter',
          onPress: handleSignOut,
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <ButtonText style={styles.textButton}>Se déconnecter</ButtonText>
        <TouchableOpacity onPress={confirmSignOut}>
          <EvilIcons name="close-o" style={styles.iconButton} />
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
    backgroundColor: Colors.grey,
  },
  textButton: {
    textAlign: 'center',
    color: Colors.white,
  },
  iconButton: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 25,
  },
});
