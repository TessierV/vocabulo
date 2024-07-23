import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { HeaderTitle, Title } from '@/constants/StyledText';

const Dashboard = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth().signOut();
            // Reset the navigation stack to 'Login' and remove the OTP-related screens
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        } catch (error) {
            console.error("Error during logout: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <HeaderTitle>Dashboard</HeaderTitle>
                </View>
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Title style={styles.buttonText}>Logout</Title>
            </TouchableOpacity>
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
        marginBottom: 40,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        padding: 15,
        borderRadius: 25,
        backgroundColor: Colors.darkGreen,
        borderWidth: 1,
        borderColor: Colors.darkGreen,
        marginTop: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 18,
    },
});

export default Dashboard;
