import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { HeaderTitle } from '@/constants/StyledText';
import { router, useNavigation } from 'expo-router';

export default function TopNavBar({ title = "Accueil", tintColor = Colors.black, color = Colors.black }) {
    const navigation = useNavigation();


    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 2300,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animatedValue]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0],
    });

    return (
        <View style={styles.container}>
            <View style={[styles.topContainer, { backgroundColor: color }]}></View>


            <Animated.Image 
                source={require('./../../assets/images/Header-background.png')}
                style={[styles.headerBackground, { tintColor: tintColor, transform: [{ translateY }] }]}
            />

            <View style={styles.iconTextContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" style={styles.iconLeft} />
                </TouchableOpacity>
                <HeaderTitle style={[styles.text, { color: Colors.white }]}>{title}</HeaderTitle>
                <TouchableOpacity onPress={() => router.push('./../screens/HomeScreen')}>
                    <MaterialCommunityIcons name="home" style={styles.iconRight} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '15%',
        justifyContent: 'flex-start',
        top: 0,
        zIndex: 1,
    },
    topContainer: {
        width: '100%',
        height: '30%',
    },
    headerBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        resizeMode: 'contain',
    },
    iconTextContainer: {
        marginTop: '9%',
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        paddingHorizontal: '7%',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: '9%',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    },
    iconLeft: {
        color: Colors.white,
        fontSize: 24,
    },
    iconRight: {
        color: Colors.white,
        marginLeft: -6,
        fontSize: 26,
    },
});
