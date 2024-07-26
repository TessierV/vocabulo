import { View, Image, Animated, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import useCustomFonts from '../../constants/useCustomFonts';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import HeaderHide from '../HeaderHide'

<HeaderHide />

export default function BackgroundLogin() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const moveAnim = useRef(new Animated.Value(0)).current;
    const move2Anim = useRef(new Animated.Value(0)).current;
    const move3Anim = useRef(new Animated.Value(0)).current;
    const move4Anim = useRef(new Animated.Value(0)).current;
    const move5Anim = useRef(new Animated.Value(0)).current;

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
            <View style={styles.headerBackground} />

            <Animated.Image
                source={require('./../../assets/images/Logo-plum.png')}
                style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
            />

            <Animated.Image
                source={require('./../../assets/images/graphicElements/Shadow-logo.png')}
                style={[styles.shadowLogo, { transform: [{ scale: scaleAnim }] }]}
            />

            <Image
                source={require('./../../assets/images/graphicElements/element7.png')}
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
        width: 180,
        height: 171,
        zIndex: 1,
        marginTop: 260,
        top: 0,
        alignSelf: 'center',
    },
    shadowLogo: {
        position: 'absolute',
        width: 150,
        height: 17,
        zIndex: 0,
        marginTop: 460,
        top: 0,
        alignSelf: 'center',
        tintColor: Colors.lightPlum,
    },
    element7: {
        position: 'absolute',
        width: 300,
        height: 300,
        zIndex: 0,
        marginTop: -150,
        left: 0,
        top: 0,
        marginLeft: -150,
        tintColor: Colors.lightPlumTransparent,
    },
    element3First: {
        position: 'absolute',
        width: 60,
        height: 100,
        zIndex: 1,
        marginTop: -20,
        right: 0,
        top: 0,
        marginRight: 80,
        tintColor: Colors.lightPlumTransparent,
    },
    element3Second: {
        position: 'absolute',
        width: 80,
        height: 150,
        zIndex: 1,
        marginTop: -20,
        right: 0,
        top: 0,
        tintColor: Colors.lightPlumTransparent,
    },
    algea: {
        position: 'absolute',
        width: 145,
        height: 200,
        zIndex: 0,
        marginTop: 250,
        left: 0,
        top: 0,
        marginLeft: 10,
        tintColor: Colors.lightPlumTransparent,
        transform: [{ rotateY: '180deg' }],
    },
    element2: {
        position: 'absolute',
        width: 140,
        height: 123,
        zIndex: 0,
        marginTop: 100,
        right: 0,
        top: 0,
        marginRight: -200,
        tintColor: Colors.lightPlum,
    },
    element1: {
        position: 'absolute',
        width: 140,
        height: 123,
        zIndex: 0,
        marginTop: 240,
        left: 0,
        top: 0,
        marginLeft: -200,
        tintColor: Colors.lightPlum,
    },
});
