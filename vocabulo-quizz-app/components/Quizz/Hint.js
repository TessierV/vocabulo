import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { lightTheme } from '@/constants/Colors';

const Hint = ({ hint }) => {
    if (!hint) return null;

    return <Text style={styles.hintText}>Hint: {hint}</Text>;
};

const styles = StyleSheet.create({
    hintText: {
        fontSize: 16,
        color: lightTheme.light_darkShade,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default Hint;
