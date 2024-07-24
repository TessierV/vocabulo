import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Colors } from '@/constants/Colors';
import { HeaderTitle, Title } from '@/constants/StyledText';
import { Ionicons } from '@expo/vector-icons';
import HeaderHide from './../../../components/HeaderHide'


const Detail = ({ route, navigation }) => {
  const { uid } = route.params;
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const saveDetails = async () => {
    try {
      await firestore().collection('users').doc(uid).update({
        name,
        dob,
      });

      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error saving details: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderHide />
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
        placeholder="Nom"
        value={name}
        maxLength={30}
        onChangeText={setName}
        selectionColor={Colors.darkGreen}
      />
      <TextInput
        style={[styles.inputContainer, styles.inputText]}
        placeholder="Date de naissance (JJ/MM/AAAA)"
        value={dob}
        onChangeText={setDob}
        selectionColor={Colors.darkGreen}
      />
      <TouchableOpacity onPress={saveDetails} style={styles.button}>
        <Title style={styles.buttonText}>S'inscrire</Title>
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
    marginBottom: 40,
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
    color: Colors.darkGreen,
  },
  inputContainer: {
    paddingHorizontal: 20,
    backgroundColor: Colors.lightGrey,
    borderRadius: 25,
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  inputText: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: Colors.darkGreen,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 18,
  },
});

export default Detail;
