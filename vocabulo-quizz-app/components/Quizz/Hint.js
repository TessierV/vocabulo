import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme } from '@/constants/Colors';

const Hint = ({ hint }) => {
    if (!hint) return null;

    return (
        <View>
            <Text style={styles.hintText}>{hint}</Text>
        </View>
    );
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
