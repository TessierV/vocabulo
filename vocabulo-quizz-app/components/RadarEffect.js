import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RadarEffect = ({ colors, minRadius = 10, maxRadius = 30, svgIcon }) => {
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
        <View style={styles.container}>
            <Svg height="150" width="150" style={styles.radarEffect}>
                <AnimatedCircle
                    cx="75"
                    cy="75"
                    r={radius.interpolate({
                        inputRange: [minRadius, maxRadius],
                        outputRange: [minRadius * 1, maxRadius * 1]
                    })}
                    stroke={colors[0]}
                    strokeWidth="2"
                    fill={colors[0]}
                    opacity={0.8}
                />
                <AnimatedCircle
                    cx="75"
                    cy="75"
                    r={radius.interpolate({
                        inputRange: [minRadius, maxRadius],
                        outputRange: [minRadius * 1.25, maxRadius * 1.25]
                    })}
                    stroke={colors[1]}
                    strokeWidth="2"
                    fill={colors[1]}
                    opacity={0.4}
                />
                <AnimatedCircle
                    cx="75"
                    cy="75"
                    r={radius.interpolate({
                        inputRange: [minRadius, maxRadius],
                        outputRange: [minRadius * 1.5, maxRadius * 1.5]
                    })}
                    stroke={colors[2]}
                    strokeWidth="2"
                    fill={colors[2]}
                    opacity={0.2}
                />
            </Svg>
            {svgIcon && (
                <SvgXml xml={svgIcon} style={styles.backgroundLogo} width="80" height="80" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
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
    backgroundLogo: {
        position: 'absolute',
        width: 100,
        height: 100,
        zIndex: 1,
    },
});

export default RadarEffect;
