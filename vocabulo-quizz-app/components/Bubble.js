import React, { useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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


            <Svg width={adjustedSize} height={adjustedSize} viewBox="0 0 7 7" fill="none">
                <Path
                    d="M3.46429 6.96772C2.5247 7.04192 1.74663 6.7486 1.11323 6.12848C0.552566 5.57989 0.321331 4.87599 0.135735 4.14285C-0.256202 2.5944 1.09718 1.21401 2.18504 0.6109C2.7847 0.2785 3.42723 0.155379 4.07308 0.270788C4.95708 0.429011 5.75617 0.797842 6.27866 1.56263C6.72895 2.22184 7.02491 2.95153 6.99808 3.7336C6.94691 5.21903 6.13704 6.26756 4.67495 6.82732C4.2974 6.97198 3.86508 7.04777 3.46429 6.96772ZM2.01742 3.51076C1.97344 4.63747 3.11938 5.55569 4.28412 4.87786C4.99138 4.46621 5.22151 3.66074 4.78476 2.95047C4.40251 2.32848 3.63136 2.18329 3.01316 2.24525C2.73519 2.27317 2.43701 2.34098 2.28848 2.61993C2.14023 2.89861 1.99695 3.18288 2.01742 3.51076Z"
                    fill={color}
                />
            </Svg>
        </Animated.View>
    );
};

export default Bubble;
