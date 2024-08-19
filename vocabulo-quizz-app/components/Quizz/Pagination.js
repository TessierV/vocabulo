import React from 'react';
import { View, StyleSheet } from 'react-native';
import PaginationDot from './PaginationDot';
import { darkTheme, lightTheme, color } from '@/constants/Colors';

const Pagination = ({ currentIndex, totalQuestions }) => {
    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: totalQuestions }).map((_, index) => (
                <PaginationDot key={index} isActive={index <= currentIndex} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 10,
        borderRadius: 5,
        backgroundColor: lightTheme.darkShade,
        marginVertical: 20,
        gap: 5,
        overflow: 'hidden',
    },
});

export default Pagination;
