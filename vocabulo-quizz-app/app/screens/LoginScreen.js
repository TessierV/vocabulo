import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigTitle, Paragraph } from '@/constants/StyledText';
import { GradientBackgroundButton } from '@/components/Button';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import config from '@/backend/config/config';
import InterfaceSvg from '@/SVG/InterfaceSvg';

const LoginScreen = ({ darkMode }) => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            navigation.navigate('home');
        }
    };

    const handleLogin = async () => {
        if (pseudo.trim() === '' || password.length < 8) {
            Alert.alert('Erreur', 'Veuillez entrer un pseudo et un mot de passe valide.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${config.BASE_URL}:3000/api/authentication?pseudo=${encodeURIComponent(pseudo)}&password=${encodeURIComponent(password)}`, {
                method: 'GET',
            });

            const responseBody = await response.json();

            if (!response.ok) {
                throw new Error(responseBody.message || 'La connexion a échoué');
            }

            if (responseBody && responseBody.user) {
                const { pseudo, token_id, user_id } = responseBody.user;

                await AsyncStorage.setItem('username', pseudo);
                await AsyncStorage.setItem('access_token', token_id.toString());
                await AsyncStorage.setItem('user_id', user_id);

                navigation.navigate('home');
            } else {
                Alert.alert('Échec de la connexion', 'Identifiants invalides');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            Alert.alert('Échec de la connexion', error.message || 'Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <View style={styles.topRightIcon}>
                <InterfaceSvg
                    iconName="default"
                    height={21}
                    width={21}
                    fillColor={darkMode ? color.neutralPlum : lightTheme.darkShade}
                />
            </View>
            <View style={styles.container}>

                <BigTitle style={[styles.title, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>Connexion</BigTitle>
                <View style={[styles.inputContainer, { borderColor: darkMode ? darkTheme.lightShade : color.neutral }]}>
                    <InterfaceSvg iconName="profil" height={20} width={20} fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
                    <TextInput
                        placeholder="Pseudo"
                        value={pseudo}
                        onChangeText={setPseudo}
                        style={[styles.input, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}
                        placeholderTextColor={darkMode ? darkTheme.neutral : lightTheme.neutral}
                    />
                </View>
                <View style={[styles.inputContainer, { borderColor: darkMode ? darkTheme.lightShade : color.neutral }]}>
                    <InterfaceSvg iconName="lock" height={20} width={20} fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
                    <TextInput
                        placeholder="Mot de passe"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={[styles.input, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}
                        placeholderTextColor={darkMode ? darkTheme.neutral : lightTheme.neutral}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <InterfaceSvg
                            iconName={showPassword ? 'eye-off' : 'eye'}
                            height={20}
                            width={20}
                            fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <GradientBackgroundButton
                        text="Se connecter"
                        textColor={darkMode ? 'dark' : 'light'}
                        onPress={handleLogin}
                        disabled={loading}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                        <Paragraph style={[styles.signupText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                            Pas encore inscrit ? Créez votre compte ici !
                        </Paragraph>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        gap: 20,
    },
    topRightIcon: {
        position: 'absolute',
        right: 20,
        top: 30,
    },
    title: {
        fontSize: 35,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: '8%',
    },
    signupText: {
        textDecorationLine: 'underline',
        fontSize: 12,
        marginTop: 10,
    },
});

export default LoginScreen;
