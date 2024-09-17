// BackgroundLogin.js
// This file defines the background animation for the login screen,
// including animated elements such as the logo and various graphic elements.

import { View, Image, Animated, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { Colors } from '@/constants/Colors'; // Importing colors defined in constants


export default function BackgroundLogin() {
    // Define animated values for various animations
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const moveAnim = useRef(new Animated.Value(0)).current;
    const move2Anim = useRef(new Animated.Value(0)).current;
    const move3Anim = useRef(new Animated.Value(0)).current;
    const move4Anim = useRef(new Animated.Value(0)).current;
    const move5Anim = useRef(new Animated.Value(0)).current;

    // Animation for scaling the shadow logo
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [scaleAnim]);

    // Animation for moving the main logo up and down
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: -15,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [moveAnim]);

    // Animation for moving various elements in the background
    useEffect(() => {
        Animated.loop(
            Animated.timing(move2Anim, {
                toValue: -2000,
                duration: 6000,
                useNativeDriver: true,
            }),
        ).start();
    }, [move2Anim]);

    useEffect(() => {
        Animated.loop(
            Animated.timing(move3Anim, {
                toValue: 150,
                duration: 6000,
                useNativeDriver: true,
            }),
        ).start();
    }, [move3Anim]);

    useEffect(() => {
        Animated.loop(
            Animated.timing(move4Anim, {
                toValue: 2000,
                delay: 3000,
                duration: 6000,
                useNativeDriver: true,
            }),
        ).start();
    }, [move4Anim]);

    useEffect(() => {
        Animated.loop(
            Animated.timing(move5Anim, {
                toValue: 150,
                delay: 3000,
                duration: 6000,
                useNativeDriver: true,
            }),
        ).start();
    }, [move5Anim]);

    return (
        <View>
            {/* Background color and header */}
            <View style={styles.headerBackground} />

            {/* Animated logo with vertical movement */}
            <Animated.Image
                source={require('./../../assets/images/graphicElements/Logo-plum.png')}
                style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
            />

            {/* Animated shadow logo with scaling effect */}
            <Animated.Image
                source={require('./../../assets/images/graphicElements/Shadow-logo.png')}
                style={[styles.shadowLogo, { transform: [{ scale: scaleAnim }] }]}
            />

            {/* Static graphic elements */}
            <Image
                source={require('./../../assets/images/graphicElements/element4.png')}
                style={styles.element7}
            />

            <Image
                source={require('./../../assets/images/graphicElements/element3.png')}
                style={styles.element3First}
            />

            <Image
                source={require('./../../assets/images/graphicElements/element3.png')}
                style={styles.element3Second}
            />

            <Image
                source={require('./../../assets/images/graphicElements/Algea2.png')}
                style={styles.algea}
            />

            {/* Animated graphic elements with various movements */}
            <Animated.Image
                source={require('./../../assets/images/graphicElements/element2.png')}
                style={[styles.element2, { transform: [{ translateX: move2Anim }, { translateY: move3Anim }] }]}
            />

            <Animated.Image
                source={require('./../../assets/images/graphicElements/element1.png')}
                style={[styles.element1, { transform: [{ translateX: move4Anim }, { translateY: move5Anim }] }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerBackground: {
        width: '100%',
        height: 550,
        backgroundColor: Colors.neutralPlum,
    },
    logo: {
        position: 'absolute',
        width: '42%',
        zIndex: 1,
        alignSelf: 'center',
        top: 0,
        marginTop: 160,
        resizeMode: 'contain'
    },
    shadowLogo: {
        position: 'absolute',
        width: '40%',
        zIndex: 0,
        top: 0,
        marginTop: 390,
        alignSelf: 'center',
        tintColor: Colors.lightPlum,
        resizeMode: 'contain'
    },
    element7: {
        position: 'absolute',
        width: "80%",
        zIndex: 0,
        marginTop: -200,
        left: 0,
        top: 0,
        marginLeft: -150,
        tintColor: Colors.lightPlumTransparent,
        resizeMode: 'contain'
    },
    element3First: {
        position: 'absolute',
        width: "15%",
        zIndex: 1,
        marginTop: -230,
        right: 0,
        top: 0,
        marginRight: 80,
        tintColor: Colors.lightPlumTransparent,
        resizeMode: 'contain'
    },
    element3Second: {
        position: 'absolute',
        width: "22%",
        zIndex: 1,
        marginTop: -200,
        right: 0,
        top: 0,
        tintColor: Colors.lightPlumTransparent,
        resizeMode: 'contain'
    },
    algea: {
        position: 'absolute',
        width: "40%",
        zIndex: 0,
        marginTop: 190,
        left: 0,
        top: 0,
        marginLeft: 10,
        tintColor: Colors.lightPlumTransparent,
        transform: [{ rotateY: '180deg' }],
        resizeMode: 'contain'
    },
    element2: {
        position: 'absolute',
        width: "30%",
        zIndex: 0,
        marginTop: 0,
        right: 0,
        top: 0,
        marginRight: -200,
        tintColor: Colors.lightPlum,
        resizeMode: 'contain'
    },
    element1: {
        position: 'absolute',
        width: "30%",
        zIndex: 0,
        marginTop: 120,
        left: 0,
        top: 0,
        marginLeft: -200,
        tintColor: Colors.lightPlum,
        resizeMode: 'contain'
    },
});
