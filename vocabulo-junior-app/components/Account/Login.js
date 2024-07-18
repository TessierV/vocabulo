import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import BackgroundLogin from './backgroundLogin'

export default function Login() {
    const router = useRouter();

    return (
        <View>
          <BackgroundLogin />
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Bienvenue</Text>
                <Text style={styles.loremText}>lorem ipsum</Text>
                <TouchableOpacity style={styles.buttonSignIn} onPress={() => router.push('auth/sign-in')}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUp} onPress={() => router.push('auth/sign-up')}>
                    <Text style={styles.buttonText}>Créer un compte</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginTop: -40,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
    },
    welcomeText: {
        fontSize: 50,
        textAlign: 'center',
        color: Colors.black,
        marginTop: 10,
    },
    loremText: {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.black,
        marginTop: 0,
    },
    buttonSignIn: {
        padding: 15,
        backgroundColor: '#F3F3F3',
        borderRadius: 100,
        marginTop: '20%',
    },
    buttonSignUp: {
        padding: 15,
        backgroundColor: '#F3F3F3',
        borderRadius: 100,
        marginTop: '5%',
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.black,
    },
});
