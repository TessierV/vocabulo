import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Animated, GestureResponderEvent } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '@/constants/Colors'; // Assurez-vous que le chemin est correct

// Définir les types de props
interface SwitchButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ onPress, style }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handlePress = (event: GestureResponderEvent) => {
        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 0, // Pas de temps pour revenir à la position de départ
                useNativeDriver: true,
            })
        ]).start();

        onPress(event); // Appel du gestionnaire de pression
    };

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
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SwitchButton;
