import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import logoImage from '@/assets/images/icon_transparent'; // Make sure this path is correct
import { lightTheme } from '@/constants/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RadarEffect = ({ color, minRadius = 10, maxRadius = 20 }) => {
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

    return (
        <Animated.View style={styles.container}>
            <Svg height="150" width="150" style={styles.radarEffect}>
                <AnimatedCircle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke={color}
                    strokeWidth="2"
                    fill={color}
                    opacity={0.5}
                />
            </Svg>
            <Svg style={styles.backgroundLogo} />

            <Image source={logoImage} style={styles.logo} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
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
    backgroundLogo: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: lightTheme.darkShade,
        borderRadius: 150,
        zIndex:1 ,
    }
});

export default RadarEffect;
