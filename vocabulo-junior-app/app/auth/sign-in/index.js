import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { HeaderTitle, Title } from '@/constants/StyledText';

export default function SignIn() {
  const router = useRouter();
  const navigation = useNavigation();

  const inputSecretCode = Array.from({ length: 5 }, () => useRef(null));
  const inputPhone = Array.from({ length: 10 }, () => useRef(null));

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleChange = (value, index, inputArray) => {
    if (value && index < inputArray.length - 1) {
      inputArray[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <HeaderTitle>Se connecter</HeaderTitle>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.iconTitleContainer}>
          <MaterialIcons name="sms" size={24} color={Colors.neutralPlum} />
          <Title style={styles.title}>Ton numéro de téléphone</Title>
        </View>
        <View style={styles.codeInputContainer}>
          {inputPhone.map((ref, index) => (
            <TextInput
              key={index}
              ref={ref}
              style={styles.inputPhone}
              keyboardType="numeric"
              maxLength={1}
              selectionColor={Colors.neutralPlum}
              onChangeText={(value) => handleChange(value, index, inputPhone)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.iconTitleContainer}>
          <FontAwesome name="eye" size={24} color={Colors.neutralPlum} />
          <Title style={styles.title}>Ton code secret</Title>
        </View>
        <View style={styles.codeInputContainer}>
          {inputSecretCode.map((ref, index) => (
            <TextInput
              key={index}
              ref={ref}
              style={styles.inputSecretCode}
              keyboardType="numeric"
              maxLength={1}
              selectionColor={Colors.neutralPlum}
              onChangeText={(value) => handleChange(value, index, inputSecretCode)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.newCodeButton}>
        <Text>Recevoir un nouveau code</Text>
      </TouchableOpacity>

      <View style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Me connecter</Text>
      </View>

      <TouchableOpacity
        onPress={() => router.replace('auth/sign-up')}
        style={styles.signupButton}
      >
        <Text style={styles.signupButtonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  section: {
    marginTop: 50,
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: 15,
    marginLeft: 10,
    color: Colors.neutralPlum,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSecretCode: {
    padding: 2,
    margin: 2,
    backgroundColor: Colors.lightGrey,
    borderRadius: 20,
    width: '16%',
    height: 80,
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
    fontSize: 25,
  },
  inputPhone: {
    padding: 2,
    margin: 2,
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    width: '8%',
    height: 40,
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
    fontSize: 25,
  },
  newCodeButton: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    padding: 0,
    marginTop: 20,
    width: 140,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  loginButton: {
    padding: 15,
    backgroundColor: Colors.neutralPlum,
    borderRadius: 100,
    marginTop: '20%',
  },
  loginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white,
  },
  signupButton: {
    padding: 15,
    backgroundColor: Colors.white,
    borderColor: Colors.neutralPlum,
    borderWidth: 0.5,
    borderRadius: 100,
    marginTop: '5%',
  },
  signupButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.neutralPlum,
  },
});

