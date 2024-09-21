import React from 'react';
import { View, StyleSheet } from 'react-native';
import { lightTheme, color, darkTheme } from '@/constants/Colors';

const PaginationDot = ({ isActive }) => {
    return (
        <View
            style={[
                styles.paginationDot,
                {
                    backgroundColor: isActive ? color.darkBlue : color.neutral,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    paginationDot: {
        height: '100%',
        borderRadius: 5,
        flex: 1,
    },
});

export default PaginationDot;
