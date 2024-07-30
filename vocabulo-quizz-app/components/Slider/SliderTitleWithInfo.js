// TitleSlider.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AnnonceTitle } from '@/constants/StyledText';
import { darkTheme, lightTheme } from '@/constants/Colors';

const TitleSlider = ({ title, iconName = "info", onPress, darkMode }) => {
    return (
        <View style={styles.header}>
            <AnnonceTitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade }}>{title}</AnnonceTitle>
            <TouchableOpacity onPress={onPress}>
                <Feather name={iconName} size={20} color={darkMode ? darkTheme.lightShade : lightTheme.lightShade} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default TitleSlider;
