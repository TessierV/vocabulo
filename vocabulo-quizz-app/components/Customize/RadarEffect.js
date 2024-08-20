import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Image, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import logoImage from '@/assets/images/icon_transparent';
import { color } from '@/constants/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RadarEffect = ({ color, minRadius = 10, maxRadius = 20, index }) => {
    const [radius] = useState(new Animated.Value(minRadius));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(radius, {
                    toValue: maxRadius,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(radius, {
                    toValue: minRadius,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ]),
        ).start();
    }, [radius, minRadius, maxRadius]);

    // Calculer l'opacité basée sur l'index
    const opacity = [0.8, 0.6, 0.4, 0.2][index] || 0.2;

    return (
        <View style={styles.container}>
            <Svg height="150" width="150" style={styles.radarEffect}>
                <AnimatedCircle
                    cx="75"
                    cy="75"
                    r={radius.interpolate({
                        inputRange: [minRadius, maxRadius],
                        outputRange: [minRadius + index * 1, maxRadius + index * 1],
                    })}
                    stroke={color}
                    strokeWidth="2"
                    fill={color}
                    opacity={opacity}
                />
            </Svg>
            <Image source={logoImage} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    radarEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    logo: {
        position: 'absolute',
        width: 90,
        height: 90,
        zIndex: 2,
    },
});

export default RadarEffect;
