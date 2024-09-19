// This file defines the `SwitchButton` component, which features a rotating refresh icon.
// When pressed, the button triggers a 360-degree rotation animation of the icon.

import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Animated, GestureResponderEvent } from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '@/constants/Colors';


// Props interface for the SwitchButton component
interface SwitchButtonProps {
    onPress: (event: GestureResponderEvent) => void; // Function to call on button press
    style?: ViewStyle; // Optional style for the button
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ onPress, style }) => {
    // Reference for the animated value
    const rotateAnim = useRef(new Animated.Value(0)).current;

    // Handle button press with rotation animation
    const handlePress = (event: GestureResponderEvent) => {
        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 1, // Rotate to 360 degrees
                duration: 500, // Duration of the rotation
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0, // Return to original position
                duration: 0, // Instant return
                useNativeDriver: true,
            })
        ]).start();

        onPress(event); // Invoke the provided onPress handler
    };

    // Interpolation for rotation effect
    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.button, style]}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                <EvilIcons name="refresh" size={24} color={Colors.white} />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SwitchButton;