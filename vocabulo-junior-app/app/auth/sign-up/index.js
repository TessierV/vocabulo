import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { HeaderTitle, Title } from '@/constants/StyledText';

const PHONE_NUMBER_LENGTH = 10;

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const handlePhoneNumberChange = (text) => setPhoneNumber(text);
  const handleCodeChange = (text) => setCode(text);

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+33${phoneNumber}`);
      setConfirm(confirmation);
    } catch (error) {
      console.error("Error sending code", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      const userDocument = await firestore().collection("users").doc(user.uid).get();

      if (userDocument.exists) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Detail", { uid: user.uid });
      }
    } catch (error) {
      console.error("Invalid code.", error);
    }
  };

  const isPhoneNumberValid = phoneNumber.length === PHONE_NUMBER_LENGTH;

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
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            selectionColor={Colors.darkGreen}
          />
          <TouchableOpacity
            onPress={isPhoneNumberValid ? signInWithPhoneNumber : null}
            style={[
              styles.button,
              {
                backgroundColor: isPhoneNumberValid ? Colors.darkGreen : Colors.white,
                borderColor: isPhoneNumberValid ? Colors.darkGreen : Colors.darkGreen,
              },
            ]}
            disabled={!isPhoneNumberValid}
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
            <FontAwesome name="eye" size={24} color={Colors.neutralPlum} />
            <Title style={styles.title}>Ton code secret</Title>
          </View>
          <TextInput
            style={styles.inputContainer}
            placeholder="Entrez le code"
            value={code}
            keyboardType="number-pad"
            onChangeText={handleCodeChange}
          />
          <TouchableOpacity
            onPress={confirmCode}
            style={styles.button}
          >
            <Title style={styles.buttonText}>
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
    paddingTop: 40,
    marginTop: 20,
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
  },
  inputText: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
  },
  button: {
    padding: 15,
    borderRadius: 100,
    marginTop: '6%',
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Signup;
