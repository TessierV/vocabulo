// This file defines the Login component which handles user authentication via phone number.
// It uses Firebase authentication and Firestore for user data management.

import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { HeaderTitle, Title } from '@/constants/StyledText';


// Constants for phone number and code lengths
const PHONE_NUMBER_LENGTH = 10;
const CODE_LENGTH = 6;

const Login = () => {
  // State variables for phone number, code, and confirmation
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  // Function to send a verification code to the provided phone number
  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+33${phoneNumber}`);
      setConfirm(confirmation); // Store confirmation object for later use
    } catch (error) {
      console.error("Error sending code", error);
    }
  };

  // Function to verify the code and handle user sign-in
  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code); // Confirm the code
      const user = userCredential.user; // Get user information

      // Check if the user document exists in Firestore
      const userDocument = await firestore().collection("users").doc(user.uid).get();

      if (userDocument.exists) {
        // Check if likedCards collection exists, if not, initialize it
        const likedCardsCollection = await firestore().collection('users').doc(user.uid).collection('likedCards').get();
        if (likedCardsCollection.empty) {
          await firestore().collection('users').doc(user.uid).collection('likedCards').doc('placeholder').set({
            placeholder: true
          });
        }

        // Navigate to the HomeScreen if user exists
        navigation.navigate("HomeScreen");
      } else {
        // Handle case where user document does not exist
        Alert.alert(
          "Compte non trouvé",
          "Votre compte n'existe pas. Que souhaitez-vous faire ?",
          [
            {
              text: "Créer un compte",
              onPress: () => navigation.navigate("Signup", { uid: user.uid }),
            },
            {
              text: "Réessayer",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      }
    } catch (error) {
      // Handle case where code is invalid
      Alert.alert(
        "Erreur de code",
        "Le code saisi est incorrect. Que souhaitez-vous faire ?",
        [
          {
            text: "Réessayer",
            onPress: () => setCode(""),
          },
          {
            text: "Créer un compte",
            onPress: () => navigation.navigate("Signup"),
          },
        ]
      );
      console.error("Invalid code.", error);
    }
  };

  // Validation for phone number and code lengths
  const isPhoneNumberValid = phoneNumber.length === PHONE_NUMBER_LENGTH;
  const isCodeValid = code.length === CODE_LENGTH;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <HeaderTitle>Se connecter</HeaderTitle>
        </View>
      </View>
      {!confirm ? (
        <>
          <View style={styles.iconTitleContainer}>
            <MaterialIcons name="sms" size={24} color={Colors.darkGreen} />
            <Title style={styles.title}>Ton numéro de téléphone</Title>
          </View>
          <TextInput
            style={[styles.inputContainer, styles.inputText]}
            placeholder="0612345678"
            value={phoneNumber}
            maxLength={PHONE_NUMBER_LENGTH}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            selectionColor={Colors.darkGreen}
          />
          <TouchableOpacity
            onPress={signInWithPhoneNumber}
            style={[
              styles.button,
              {
                backgroundColor: isPhoneNumberValid ? Colors.darkGreen : Colors.white,
                borderColor: isPhoneNumberValid ? Colors.darkGreen : Colors.darkGreen,
              },
            ]}
          >
            <Title
              style={[
                styles.buttonText,
                { color: isPhoneNumberValid ? Colors.white : Colors.darkGreen }
              ]}
            >
              Recevoir un code
            </Title>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.iconTitleContainer}>
            <FontAwesome name="eye" size={24} color={Colors.darkGreen} />
            <Title style={styles.title}>Ton code secret</Title>
          </View>
          <TextInput
            style={[styles.inputContainer, styles.inputText]}
            placeholder="Entrez le code"
            value={code}
            maxLength={CODE_LENGTH}
            keyboardType="number-pad"
            onChangeText={setCode}
          />
          <TouchableOpacity
            onPress={confirmCode}
            style={[
              styles.button,
              {
                backgroundColor: isCodeValid ? Colors.darkGreen : Colors.white,
                borderColor: isCodeValid ? Colors.darkGreen : Colors.darkGreen,
              },
            ]}
          >
            <Title
              style={[
                styles.buttonText,
                { color: isCodeValid ? Colors.white : Colors.darkGreen }
              ]}
            >
              Confirmer le code
            </Title>
          </TouchableOpacity>
        </>
      )}
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
    color: Colors.darkGreen,
  },
  inputContainer: {
    paddingHorizontal: 20,
    backgroundColor: Colors.lightGrey,
    borderRadius: 100,
    width: '100%',
    height: 50,
    marginBottom: '6%'
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

export default Login;
