// This file defines the `DisplaySettings` component which displays user-specific settings and a greeting message.
// It fetches the user's name from Firebase Auth or Firestore and provides navigation to the settings screen.

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { ButtonText } from '@/constants/StyledText';


const DisplaySettings = () => {
    // State to hold the user's name
    const [userName, setUserName] = useState<string>('Utilisateur');

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = async () => {
            const user = auth().currentUser;
            if (user) {
                // Check if displayName is available from Firebase Auth
                if (user.displayName) {
                    setUserName(user.displayName);
                } else {
                    // Fetch user name from Firestore if displayName is not set
                    try {
                        const userDoc = await firestore().collection('users').doc(user.uid).get();
                        if (userDoc.exists && userDoc.data()?.name) {
                            setUserName(userDoc.data()?.name);
                        }
                    } catch (error) {
                        console.error('Error fetching user data from Firestore: ', error);
                    }
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.contents}>
                {/* Display logo image */}
                <Image source={require('./../../assets/images/graphicElements/Logo-plum.png')} style={styles.logo} />

                {/* Display greeting text with the user's name */}
                <View style={styles.textContainer}>
                    <ButtonText style={styles.welcomeText}>
                        Bonjour <ButtonText style={styles.userName}>{userName}</ButtonText>
                    </ButtonText>
                </View>

                {/* Navigation to settings screen */}
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