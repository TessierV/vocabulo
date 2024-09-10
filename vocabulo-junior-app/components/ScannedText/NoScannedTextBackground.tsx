import { View, Animated, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';

interface NoScannedTextBackgroundProps {
  style?: ViewStyle;
}

export default function NoScannedTextBackground({ style }: NoScannedTextBackgroundProps) {
    const moveAnim = useRef(new Animated.Value(0)).current;
    const move2Anim = useRef(new Animated.Value(0)).current;
    const move3Anim = useRef(new Animated.Value(0)).current;
    const move4Anim = useRef(new Animated.Value(0)).current;
    const move5Anim = useRef(new Animated.Value(0)).current;

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
        <View style={[styles.container, style]}>
            <View style={styles.headerBackground} />
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
    container: {
        flex: 1, // Ensures the container takes up the full space available
    } as ViewStyle,
    headerBackground: {
        width: '100%',
        height: 550,
    },
    element2: {
        position: 'absolute',
        width: '30%',
        zIndex: 0,
        marginTop: 0,
        right: 0,
        top: 0,
        marginRight: -200,
        tintColor: Colors.lightGreen,
        resizeMode: 'contain',
    },
    element1: {
        position: 'absolute',
        width: '30%',
        zIndex: 0,
        marginTop: 200,
        left: 0,
        top: 0,
        marginLeft: -200,
        tintColor: Colors.lightGreen,
        resizeMode: 'contain',
    },
});
