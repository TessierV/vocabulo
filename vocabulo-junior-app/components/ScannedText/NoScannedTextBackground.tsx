// This file defines the NoScannedTextBackground component, which includes animated background elements.

import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { Colors } from '@/constants/Colors';

interface NoScannedTextBackgroundProps {
  style?: ViewStyle;
}

export default function NoScannedTextBackground({ style }: NoScannedTextBackgroundProps) {
    // Create animated values for each animated element
    const moveAnim = useRef(new Animated.Value(0)).current;
    const move2Anim = useRef(new Animated.Value(0)).current;
    const move3Anim = useRef(new Animated.Value(0)).current;
    const move4Anim = useRef(new Animated.Value(0)).current;
    const move5Anim = useRef(new Animated.Value(0)).current;

    // Animate moveAnim to create a vertical bounce effect
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

    // Animate move2Anim to create a horizontal movement effect
    useEffect(() => {
        Animated.loop(
            Animated.timing(move2Anim, {
                toValue: -2000,
                duration: 6000,
                useNativeDriver: true,
            }),
        ).start();
    }, [move2Anim]);

    // Animate move3Anim to create a vertical movement effect
    useEffect(() => {
        Animated.loop(
            Animated.timing(move3Anim, {
                toValue: 150,
                duration: 6000,
                useNativeDriver: true,
            }),
        ).start();
    }, [move3Anim]);

    // Animate move4Anim to create a delayed horizontal movement effect
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

    // Animate move5Anim to create a delayed vertical movement effect
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
            {/* Background view */}
            <View style={styles.headerBackground} />
            {/* Animated element2 */}
            <Animated.Image
                source={require('./../../assets/images/graphicElements/element2.png')}
                style={[styles.element2, { transform: [{ translateX: move2Anim }, { translateY: move3Anim }] }]}
            />

            {/* Animated element1 */}
            <Animated.Image
                source={require('./../../assets/images/graphicElements/element1.png')}
                style={[styles.element1, { transform: [{ translateX: move4Anim }, { translateY: move5Anim }] }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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