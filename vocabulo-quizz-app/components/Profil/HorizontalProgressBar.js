import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import InterfaceSvg from '@/SVG/InterfaceSvg';

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

// Vertical Progress Bar for categories
const VerticalProgressBar = ({ progress, color, darkMode }) => (
    <View style={styles.verticalBarContainer}>
        <View style={[styles.verticalBar, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }]}>
        <View
                style={[
                    styles.verticalSegment,
                    { height: `${progress}%`, backgroundColor: color[0] }, // Use the first color from the gradient
                ]}
            />
        </View>
    </View>
);

// Linear Progress Bar Component with multiple categories
const HorizontalProgressBar = ({ filteredWords, darkMode }) => {
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
            {/* Individual category progress bars */}
            <View style={[styles.verticalWrapper, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
                <View style={styles.progressContainer}>
                    <VerticalProgressBar progress={perfectProgress} color={[color.neutralYellow, color.neutralYellow, color.neutralYellow]} />
                    <InterfaceSvg iconName="faceSunglasses" height={18} width={18} fillColor={darkMode ? darkTheme.neutral : lightTheme.dark_lightShade} />
                </View>
                <View style={styles.progressContainer}>
                    <VerticalProgressBar progress={goodProgress} color={[color.neutralGreen, color.neutralGreen, color.neutralGreen]} />
                    <InterfaceSvg iconName="faceRelieved" height={18} width={18} fillColor={darkMode ? darkTheme.neutral : lightTheme.dark_lightShade} />
                </View>
                <View style={styles.progressContainer}>
                    <VerticalProgressBar progress={decentProgress} color={[color.neutralBlue, color.neutralBlue, color.neutralBlue]} />
                    <InterfaceSvg iconName="faceMonocle" height={18} width={18} fillColor={darkMode ? darkTheme.neutral : lightTheme.dark_lightShade} />
                </View>
                <View style={styles.progressContainer}>
                    <VerticalProgressBar progress={lowProgress} color={[color.neutralPlum, color.neutralPlum, color.neutralPlum]} />
                    <InterfaceSvg iconName="faceTear" height={18} width={18} fillColor={darkMode ? darkTheme.neutral : lightTheme.dark_lightShade} />
                </View>
                <View style={styles.progressContainer}>
                    <VerticalProgressBar progress={poorProgress} color={[color.neutralCoral, color.neutralCoral, color.neutralCoral]} />
                    <InterfaceSvg iconName="faceExplosion" height={18} width={18} fillColor={darkMode ? darkTheme.neutral : lightTheme.dark_lightShade} />
                </View>
            </View>
        </View>
    );
};

// Legend Item Component
const LegendItem = ({ color, label }) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <Text style={styles.legendText}>{label}</Text>
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
        width: '100%',
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
        gap: 5,
    },
    totalProgressWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    totalProgressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    totalProgressBar: {
        height: 15, // Adjust the height for horizontal progress bar
        width: '60%', // Adjust the width for horizontal progress bar
        borderRadius: 50,
        backgroundColor: lightTheme.light_darkShade,
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

export default HorizontalProgressBar;
