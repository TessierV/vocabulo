import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Colors } from '@/constants/Colors';
import { HeaderTitle, Title } from '@/constants/StyledText';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from "./Dashboard";

const NAME_LENGTH = 1;
const DATE_LENGTH = 10;

const Detail = ({ route, navigation }) => {
  const { uid } = route.params;
  const [name, setname] = useState('');
  const [dob, setDob] = useState('');

  const saveDetails = async () => {
    try {
      await firestore().collection('users').doc(uid).update({
        name,
        dob,
      }, { merge: true });

      navigation.navigate('auth/Signup/Dashboard');
    } catch (error) {
      console.error('Error saving details: ', error);
    }
  };

  const isNameValid = name.length > NAME_LENGTH;
  const isDateValid = dob.length === DATE_LENGTH;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <HeaderTitle>Créer un compte</HeaderTitle>
        </View>
      </View>
      <View style={styles.iconTitleContainer}>
        <Ionicons name="person" size={24} color="black" />
        <Title style={styles.title}>Qui es-tu ?</Title>
      </View>
      <TextInput
        style={[styles.inputContainer, styles.inputText]}
        placeholder="Prénom"
        value={name}
        maxLength={30}
        onChangeText={setname}
        selectionColor={Colors.darkGreen}
      />
      <TextInput
        style={[styles.inputContainer, styles.inputText]}
        placeholder="Date de naissance (JJ/MM/AAAA)"
        value={dob}
        onChangeText={setDob}
        selectionColor={Colors.darkGreen}
      />
      <TouchableOpacity
        onPress={saveDetails}
        style={[
          styles.button,
          {
            backgroundColor: isNameValid && isDateValid ? Colors.darkCoral : Colors.white,
            borderColor: Colors.darkCoral,
          },
        ]}
        disabled={!isNameValid || !isDateValid}
      >
        <Title
          style={[
            styles.buttonText,
            {
              color: isNameValid && isDateValid ? Colors.white : Colors.darkCoral,
            },
          ]}
        >
          Enregistrer son profil
        </Title>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 60,
    backgroundColor: Colors.white,
    height: '100%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    marginLeft: 10,
    color: Colors.darkCoral,
  },
  inputContainer: {
    paddingHorizontal: 20,
    backgroundColor: Colors.lightGrey,
    borderRadius: 100,
    width: '100%',
    height: 50,
    marginBottom: '6%',
  },
  inputText: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
  },
  button: {
    padding: 15,
    borderRadius: 100,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Detail;
