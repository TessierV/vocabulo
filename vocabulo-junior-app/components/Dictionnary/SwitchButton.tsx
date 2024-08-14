// SwitchButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '@/constants/Colors'; // Assurez-vous que le chemin est correct

// Définir les types des props pour TypeScript
interface SwitchButtonProps {
    onPress: () => void;
    style?: ViewStyle; // Style pour le conteneur
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <EvilIcons name="refresh" size={24} color={Colors.white} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default SwitchButton;
