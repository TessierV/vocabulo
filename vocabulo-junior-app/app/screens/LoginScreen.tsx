import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import BackgroundLogin from '../../components/auth/backgroundLogin'
import { ButtonText, BigTitle } from '@/constants/StyledText';


export default function LoginScreen() {
    const router = useRouter();

    return (
        <View>
            <View style={{ height: '60%' }}>
                <BackgroundLogin />
            </View>
            <View style={styles.container}>
                <BigTitle>Bienvenue</BigTitle>
                <Text style={styles.loremText}>lorem ipsum</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push('./../auth/authLogin/Login')}>
                    <ButtonText style={styles.buttonText}>Se connecter</ButtonText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('./../auth/authSignup/Signup')}>
                    <ButtonText style={styles.buttonText}>Créer un compte</ButtonText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: '40%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
    },
    welcomeText: {
        fontSize: 50,
        textAlign: 'center',
        color: Colors.black,
    },
    loremText: {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.black,
        marginTop: 0,
        marginBottom: 30,
    },
    button: {
        padding: 15,
        borderRadius: 100,
        marginTop: '6%',
        backgroundColor: Colors.neutralPlum
      },
      buttonText: {
        textAlign: 'center',
        color: Colors.white
      },
});
