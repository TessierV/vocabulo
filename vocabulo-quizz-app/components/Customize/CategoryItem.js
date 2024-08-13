// CategoryItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { darkTheme, lightTheme } from '@/constants/Colors';

const CategoryItem = ({ category, darkMode }) => {
    if (!category) return null;

    return (
        <View style={[styles.categoryRow, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]}>
            <View style={styles.categoryRowIcon}>
                <SvgXml xml={category.icon} width={30} height={30} />
                <Text style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade, marginLeft: 10 }}>
                    {category.textLabel}
                </Text>
            </View>
            <Text style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade, marginLeft: 10 }}>
                {category.difficulty}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        borderRadius: 8,
        width: '90%',
        justifyContent: 'space-between',
    },
    categoryRowIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CategoryItem;
