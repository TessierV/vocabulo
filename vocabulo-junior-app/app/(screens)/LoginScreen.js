import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import BackgroundLogin from '../../components/auth/backgroundLogin'
import { HeaderTitle, Title, BigTitle } from '@/constants/StyledText';
import HeaderHide from '../../components/HeaderHide'


export default function LoginScreen() {
    const router = useRouter();

    return (
        <View>
            <HeaderHide />
            <View style={{ height: '60%' }}>
                <BackgroundLogin />
            </View>
            <View style={styles.container}>
                <BigTitle>Bienvenue</BigTitle>
                <Text style={styles.loremText}>lorem ipsum</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push('auth/sign-in')}>
                    <Title style={styles.buttonText}>Se connecter</Title>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('auth/sign-up')}>
                    <Title style={styles.buttonText}>Créer un compte</Title>
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
