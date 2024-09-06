import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
                <BigTitle style={styles.welcomeText}>Bienvenue</BigTitle>
                <View style={styles.pictoLSFContainer}>
                    <Image source={require('./../../assets/images/pictoLSF/B.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/I.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/E.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/N.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/V.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/E.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/N.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/U.png')} style={styles.pictoLSF}/>
                    <Image source={require('./../../assets/images/pictoLSF/E.png')} style={styles.pictoLSF}/>
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('./../auth/authLogin/Login')}>
                    <ButtonText style={styles.buttonText}>Se connecter</ButtonText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('./../auth/authSignup/Signup')}>
                    <ButtonText style={styles.buttonText}>Créer un compte</ButtonText>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
