import React, { useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Bubble = ({ size, color, duration, delay }) => {
    // Adjust the size to ensure it stays within a reasonable range
    const adjustedSize = Math.min(Math.max(size, 10), 40);

    // Ensure translateX keeps the bubble within screen boundaries
    const initialTranslateX = Math.random() * (width - adjustedSize);
    const [translateY] = useState(new Animated.Value(height));
    const [translateX] = useState(new Animated.Value(initialTranslateX));
    const [opacity] = useState(new Animated.Value(1));

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: -adjustedSize,
                        duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(translateY, {
                    toValue: height,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, [translateY, opacity, duration, delay, adjustedSize]);

    return (
        <Animated.View style={{
            position: 'absolute',
            transform: [
                { translateX },
                { translateY }
            ],
            opacity,
            bottom: '0%',
        }}>
            <Svg height={adjustedSize} width={adjustedSize}>
                <Circle cx={adjustedSize / 2} cy={adjustedSize / 2} r={adjustedSize / 2} fill={color} />
            </Svg>
        </Animated.View>
    );
};

export default Bubble;
