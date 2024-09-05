import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ButtonText } from '@/constants/StyledText';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const DisplaySettings = () => {
    const [userName, setUserName] = useState('Utilisateur');

    useEffect(() => {
        const fetchUserData = () => {
            const user = auth().currentUser;
            if (user?.displayName) {
                setUserName(user.displayName);
            } else {
                setUserName('Utilisateur');
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.contents}>
                <Image source={require('./../../assets/images/Logo-plum.png')} style={styles.logo} />
                <View style={styles.textContainer}>
                    <ButtonText style={styles.welcomeText}>
                        Bonjour <ButtonText style={styles.userName}>{userName}</ButtonText>
                    </ButtonText>
                </View>
                <TouchableOpacity
                    onPress={() => router.push('./../../screens/SettingsScreen')}
                    style={styles.iconContainer}
                >
                    <MaterialIcons name="settings" style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 60,
        paddingHorizontal: 15,
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 'auto',
        padding: 15,
        backgroundColor: Colors.white,
    },
    textContainer: {
        flex: 1,
    },
    welcomeText: {
        color: Colors.black,
    },
    userName: {
        color: Colors.darkBlue,
    },
    contents: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        fontSize: 30,
        color: Colors.darkBlue,
    },
    logo: {
        width: 37,
        height: 35,
        tintColor: Colors.lightBlue,
        marginRight: 15,
    },
});

export default DisplaySettings;
