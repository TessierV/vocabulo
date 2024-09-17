// LoginScreen.js
// This file defines the login screen in the application,
// displaying a background image, welcome text, pictograms, and login/signup buttons.

import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // Importing the router for navigation

import { ButtonText, BigTitle } from '@/constants/StyledText'; // Importing styled text defined in constants
import { Colors } from '@/constants/Colors'; // Importing colors defined in constants

import BackgroundLogin from '../../components/Authentication/backgroundLogin'; // Importing the BackgroundLogin component


export default function LoginScreen() {
    const router = useRouter(); // Hook for navigation

    return (
        <View>
            {/* BackgroundLogin component taking up 60% of the screen height */}
            <View style={styles.backgroundContainer}>
                <BackgroundLogin />
            </View>
            <View style={styles.container}>
                {/* Displaying the welcome text */}
                <BigTitle style={styles.welcomeText}>Bienvenue</BigTitle>
                {/* Container for pictograms arranged in a row */}
                <View style={styles.pictoLSFContainer}>
                    <Image source={require('./../../assets/images/pictoLSF/B.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/I.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/E.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/N.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/V.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/E.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/N.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/U.png')} style={styles.pictoLSF} />
                    <Image source={require('./../../assets/images/pictoLSF/E.png')} style={styles.pictoLSF} />
                </View>
                {/* Container for the login and signup buttons */}
                <View style={styles.buttonContainer}>
                    {/* Login button with navigation to login screen */}
                    <TouchableOpacity style={styles.button} onPress={() => router.push('./../auth/authLogin/Login')}>
                        <ButtonText style={styles.buttonText}>Se connecter</ButtonText>
                    </TouchableOpacity>
                    {/* Signup button with navigation to signup screen */}
                    <TouchableOpacity style={styles.button} onPress={() => router.push('./../auth/authSignup/Signup')}>
                        <ButtonText style={styles.buttonText}>Créer un compte</ButtonText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        height: '60%',
    },
    container: {
        backgroundColor: Colors.white,
        height: '40%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 30,
    },
    welcomeText: {
        textAlign: 'center',
        marginTop: 30
    },
    pictoLSFContainer: {
        flexDirection: 'row',
        marginTop: 0,
        height: 20,
        width: 175,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    pictoLSF: {
        width: '9%',
        resizeMode: 'contain',
        height: 'auto'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 50,
    },
    button: {
        padding: 15,
        borderRadius: 100,
        marginTop: 15,
        backgroundColor: Colors.neutralPlum
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.white
    },
});
