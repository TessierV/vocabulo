import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { Paragraph } from '@/constants/StyledText';

// Function to determine gradient colors based on views and correctRatio
const getGradientColors = (views, correctRatio,) => {

    if (views > 2) {
        if (correctRatio === 100) {
            return [color.darkYellow, color.neutralYellow, color.lightYellow]; // Perfect score (mot parfait)
        } else if (correctRatio > 85) {
            return [color.darkGreen, color.neutralGreen, color.lightGreen]; // Very good score (mot bon)
        } else if (correctRatio >= 60 && correctRatio <= 85) {
            return [color.darkBlue, color.neutralBlue, color.lightBlue]; // Decent score (mot moyen)
        } else if (correctRatio >= 50 && correctRatio < 60) {
            return [color.darkPlum, color.neutralPlum, color.lightPlum]; // Low score (mot bas)
        } else if (correctRatio < 50) {
            return [color.darkCoral, color.neutralCoral, color.lightCoral]; // Poor score (mot très bas)
        }
    }
    return [color.neutral, color.neutral, color.neutral]; // Neutral color if views <= 2
};


// Linear Progress Bar Component with multiple categories
const LinearProgressBar = ({ filteredWords, darkMode }) => {
    const totalWords = filteredWords.length;

    // If no words exist, show nothing
    if (totalWords === 0) {
        return <></>;
    }

    // Calculate the number of words in each category (for views > 2)
    const perfectWords = filteredWords.filter((word) => word.times_seen > 2 && (word.times_correct / word.times_seen) * 100 === 100);
    const goodWords = filteredWords.filter((word) => word.times_seen > 2 && (word.times_correct / word.times_seen) * 100 > 85);
    const decentWords = filteredWords.filter((word) => word.times_seen > 2 && (word.times_correct / word.times_seen) * 100 >= 60 && (word.times_correct / word.times_seen) * 100 <= 85);
    const lowWords = filteredWords.filter((word) => word.times_seen > 2 && (word.times_correct / word.times_seen) * 100 >= 50 && (word.times_correct / word.times_seen) * 100 < 60);
    const poorWords = filteredWords.filter((word) => word.times_seen > 2 && (word.times_correct / word.times_seen) * 100 < 50);

    // Calculate the progress for each category
    const perfectProgress = (perfectWords.length / totalWords) * 100;
    const goodProgress = (goodWords.length / totalWords) * 100;
    const decentProgress = (decentWords.length / totalWords) * 100;
    const lowProgress = (lowWords.length / totalWords) * 100;
    const poorProgress = (poorWords.length / totalWords) * 100;

    // Total Combined Progress for all categories
    return (
        <View style={styles.progressBarContainer}>
            {/* Horizontal Total Progress */}
            <View style={styles.totalProgressWrapper}>
            <InterfaceSvg iconName="hybrid" height={21} width={21} fillColor={lightTheme.darkShade} />
                <Paragraph style={[styles.totalProgressTitle, {color : darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade}]}>{totalWords} mots</Paragraph>
                <View style={[styles.totalProgressBar, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>
                    <View style={[styles.horizontalSegment, { width: `${poorProgress}%`, backgroundColor: color.neutralCoral }]} />
                    <View style={[styles.horizontalSegment, { width: `${lowProgress}%`, backgroundColor: color.neutralPlum }]} />
                    <View style={[styles.horizontalSegment, { width: `${decentProgress}%`, backgroundColor: color.neutralBlue }]} />
                    <View style={[styles.horizontalSegment, { width: `${goodProgress}%`, backgroundColor: color.neutralGreen }]} />
                    <View style={[styles.horizontalSegment, { width: `${perfectProgress}%`, backgroundColor: color.neutralYellow }]} />
                </View>
            </View>
        </View>
    );
};

// Legend Item Component
const LegendItem = ({ color, label }) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <Paragraph style={styles.legendText}>{label}</Paragraph>
    </View>
);

// Styles
const styles = StyleSheet.create({
    progressBarContainer: {
        alignItems: 'center',
    },
    verticalWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        padding: 10,
        paddingVertical: 15,
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 15,
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: 8,
    },
    progressContainer: {
        alignContent: "center",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalProgressWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    totalProgressTitle: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    totalProgressBar: {
        height: 15, // Adjust the height for horizontal progress bar
        width: '60%', // Adjust the width for horizontal progress bar
        borderRadius: 50,
        backgroundColor: lightTheme.neutral,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    horizontalSegment: {
        height: '100%',
        borderRadius: 10,
    },
    verticalBarContainer: {
        alignItems: 'center',
    },
    verticalBar: {
        height: 150, // Height for individual vertical progress bars
        width: 40, // Adjust the width for visual balance
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5, // Add margin to space the items
    },
    legendColor: {
        width: 15,
        height: 15,
        borderRadius: 50,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
    },
    totalWordsText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default LinearProgressBar;
