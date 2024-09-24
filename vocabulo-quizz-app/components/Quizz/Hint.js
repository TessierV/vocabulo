import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme } from '@/constants/Colors';
import { Paragraph } from '@/constants/StyledText';

const Hint = ({ hint }) => {
    if (!hint) return null;

    return (
        <View>
            <Paragraph style={styles.hintText}>{hint}</Paragraph>
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
