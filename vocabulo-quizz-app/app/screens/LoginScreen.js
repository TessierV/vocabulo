import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import { View, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native'; // Import React Native components
import { useNavigation } from '@react-navigation/native'; // Navigation hook for routing
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for storing user data
import { BigTitle, Paragraph } from '@/constants/StyledText'; // Custom text components for styling
import { GradientBackgroundButton } from '@/components/Button'; // Button component with gradient background
import { color, darkTheme, lightTheme } from '@/constants/Colors'; // Color constants for theming
import config from '@/backend/config/config'; // Backend configuration
import InterfaceSvg from '@/SVG/InterfaceSvg'; // SVG component for icons
import { login } from '@/constants/texts'; // Login text constants

// Functional component for the Login Screen
const LoginScreen = ({ darkMode }) => {
    // State variables for managing input values and loading state
    const [pseudo, setPseudo] = useState(''); // State for username input
    const [password, setPassword] = useState(''); // State for password input
    const [loading, setLoading] = useState(false); // State for loading spinner
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const navigation = useNavigation(); // Initialize navigation

    // Effect to check if the user is already logged in
    useEffect(() => {
        checkLoggedIn(); // Call the function to check login status
    }, []);

    // Function to check if user is already logged in
    const checkLoggedIn = async () => {
        const token = await AsyncStorage.getItem('access_token'); // Retrieve token from AsyncStorage
        if (token) {
            navigation.navigate('home'); // Navigate to home if token exists
        }
    };

    // Function to handle login
    const handleLogin = async () => {
        // Validate inputs
        if (pseudo.trim() === '' || password.length < 8) {
            Alert.alert('Error', 'Please enter a valid username and password.'); // Alert for invalid input
            return;
        }

        setLoading(true); // Set loading to true while logging in

        try {
            // Fetch request to login endpoint with username and password
            const response = await fetch(`${config.BASE_URL}:3000/api/authentication?pseudo=${encodeURIComponent(pseudo)}&password=${encodeURIComponent(password)}`, {
                method: 'GET', // Use GET method
            });

            const responseBody = await response.json(); // Parse JSON response

            // Check if response is not ok
            if (!response.ok) {
                throw new Error(responseBody.message || 'Login failed'); // Throw error with message
            }

            // If user details exist in response
            if (responseBody && responseBody.user) {
                const { pseudo, token_id, user_id } = responseBody.user; // Destructure user details

                // Store user details in AsyncStorage
                await AsyncStorage.setItem('username', pseudo);
                await AsyncStorage.setItem('access_token', token_id.toString());
                await AsyncStorage.setItem('user_id', user_id);

                navigation.navigate('home'); // Navigate to home
            } else {
                Alert.alert('Login Failed', 'Invalid credentials'); // Alert for failed login
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', error.message || 'An error occurred. Please try again.'); // Alert for general error
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Icon at the top right corner */}
            <View style={styles.topRightIcon}>
                <InterfaceSvg
                    iconName="default"
                    height={21}
                    width={21}
                    fillColor={darkMode ? color.neutralPlum : lightTheme.darkShade}
                />
            </View>
            <View style={styles.container}>
                {/* Title of the login screen */}
                <BigTitle style={[styles.title, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                    {login.header.title}
                </BigTitle>

                {/* Input field for username */}
                <View style={[styles.inputContainer, { borderColor: darkMode ? darkTheme.lightShade : color.neutral }]}>
                    <InterfaceSvg iconName="profil" height={20} width={20} fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
                    <TextInput
                        placeholder={login.section.textinput}
                        value={pseudo}
                        onChangeText={setPseudo}
                        style={[styles.input, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}
                        placeholderTextColor={darkMode ? darkTheme.neutral : lightTheme.neutral}
                    />
                </View>

                {/* Input field for password */}
                <View style={[styles.inputContainer, { borderColor: darkMode ? darkTheme.lightShade : color.neutral }]}>
                    <InterfaceSvg iconName="lock" height={20} width={20} fillColor={darkMode ? darkTheme.lightShade : lightTheme.darkShade} />
                    <TextInput
                        placeholder={login.section.textinput2}
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

                {/* Button container for actions */}
                <View style={styles.buttonContainer}>
                    <GradientBackgroundButton
                        text={login.footer.button}
                        textColor={darkMode ? 'dark' : 'light'}
                        onPress={handleLogin}
                        disabled={loading}
                    />
                    {/* Navigation to signup screen */}
                    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                        <Paragraph style={[styles.signupText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                            {login.footer.text}
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
