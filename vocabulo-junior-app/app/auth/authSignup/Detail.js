import React, { useState, useCallback } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Colors } from '@/constants/Colors';
import { HeaderTitle, Title } from '@/constants/StyledText';
import { Ionicons } from '@expo/vector-icons';

const NAME_LENGTH = 1;
const DATE_LENGTH = 10;

const Detail = ({ route, navigation }) => {
  const { uid } = route.params;
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const saveDetails = useCallback(async () => {
    try {
      await firestore().collection('users').doc(uid).set({ name, dob }, { merge: true });
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error saving details: ', error);
    }
  }, [uid, name, dob, navigation]);

  const formatDate = useCallback((text) => {
    const cleanedText = text.replace(/\D/g, '');
    const day = cleanedText.slice(0, 2);
    const month = cleanedText.slice(2, 4);
    const year = cleanedText.slice(4, 8);
    return `${day}${month ? '/' + month : ''}${year ? '/' + year : ''}`;
  }, []);

  const handleChangeText = useCallback((text) => {
    setDob(formatDate(text));
  }, [formatDate]);

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
        onChangeText={setName}
        selectionColor={Colors.darkGreen}
      />
      <TextInput
        style={[styles.inputContainer, styles.inputText]}
        placeholder="Date de naissance (JJ/MM/AAAA)"
        value={dob}
        maxLength={DATE_LENGTH}
        onChangeText={handleChangeText}
        keyboardType="numeric"
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
