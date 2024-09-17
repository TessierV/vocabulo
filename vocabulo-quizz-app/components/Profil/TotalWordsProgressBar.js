import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // Import Feather icons
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { Paragraph } from '@/constants/StyledText';
import { profil } from '@/constants/texts'; // Importing text constants for the home section

// Linear Progress Bar Component with multiple categories
const TotalWordsProgressBar = ({ filteredWords, darkMode }) => {
    const totalWords = filteredWords.length;
    const [showLegend, setShowLegend] = useState(false); // State to toggle legend visibility

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

    // Count of words not repertoried (views <= 2)
    const nonRepertoriedWords = filteredWords.filter((word) => word.times_seen <= 2);

    // Calculate the progress for each category
    const perfectProgress = (perfectWords.length / totalWords) * 100;
    const goodProgress = (goodWords.length / totalWords) * 100;
    const decentProgress = (decentWords.length / totalWords) * 100;
    const lowProgress = (lowWords.length / totalWords) * 100;
    const poorProgress = (poorWords.length / totalWords) * 100;

    // Total words with views > 2
    const totalProgressWords = perfectWords.length + goodWords.length + decentWords.length + lowWords.length + poorWords.length;

    return (
        <View style={styles.progressBarContainer}>
            <View style={[styles.totalProgressWrapper, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade, paddingVertical: 10, borderRadius: 8 }]}>
                <Paragraph style={{fontSize: 12, color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade}}>{profil.section.content.title}</Paragraph>
                <View style={styles.statsContainer}>
                    <View style={styles.totalWordsWrapper}>
                        <View style={styles.totalWordsCount}>
                            <Paragraph style={[styles.totalWordsNumber, { color: darkMode ? color.darkPlum : lightTheme.darkShade }]}>{totalProgressWords}</Paragraph>
                            <Paragraph style={[styles.totalWordsTotal, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.neutral }]}>/ {totalWords}</Paragraph>
                        </View>
                    </View>
                    <View style={styles.nonRepertoriedWrapper}>
                        <Paragraph style={{fontSize: 10, color: darkMode ? darkTheme.dark_lightShade : lightTheme.neutral, textAlign: 'right'}}>{profil.section.content.suboption}</Paragraph>
                        <Paragraph style={{fontSize: 12, color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade, textAlign: 'right'}}>{nonRepertoriedWords.length}{profil.section.content.subword}</Paragraph>
                    </View>
                </View>

                <View style={{ gap: 10,}}>
                    <View style={[styles.totalProgressBar, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade, }]}>
                        <View style={[styles.horizontalSegment, { width: `${poorProgress}%`, backgroundColor: color.neutralCoral }]} />
                        <View style={[styles.horizontalSegment, { width: `${lowProgress}%`, backgroundColor: color.neutralPlum }]} />
                        <View style={[styles.horizontalSegment, { width: `${decentProgress}%`, backgroundColor: color.neutralBlue }]} />
                        <View style={[styles.horizontalSegment, { width: `${goodProgress}%`, backgroundColor: color.neutralGreen }]} />
                        <View style={[styles.horizontalSegment, { width: `${perfectProgress}%`, backgroundColor: color.neutralYellow }]} />
                    </View>
                    <Paragraph style={{ textAlign: 'left', color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade, fontSize: 12 }}>{profil.section.content.description}</Paragraph>
                </View>

                <TouchableOpacity onPress={() => setShowLegend(!showLegend)} style={styles.legendButton}>
                    {showLegend ? (
                        <Feather name="x" size={20} color={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade} />
                    ) : (
                        <Paragraph style={[{fontSize: 12, color: darkMode ? darkTheme.dark_lightShade :  lightTheme.darkShade, },styles.legendButtonText]}>{profil.section.content.button}</Paragraph>
                    )}
                </TouchableOpacity>

                {/* Legend display */}
                {showLegend && (
                    <View style={styles.legend}>
                        <LegendItem color={color.neutralYellow} label={profil.section.content.row1} />
                        <LegendItem color={color.neutralGreen} label={profil.section.content.row2} />
                        <LegendItem color={color.neutralBlue} label={profil.section.content.row3} />
                        <LegendItem color={color.neutralPlum} label={profil.section.content.row4} />
                        <LegendItem color={color.neutralCoral} label={profil.section.content.row5} />
                    </View>
                )}
            </View>
        </View>
    );
};

// Legend Item Component
const LegendItem = ({ color, label, darkMode }) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <Paragraph style={[styles.legendText, {color: darkMode ? darkTheme.lightShade : lightTheme.darkShade}]}>{label}</Paragraph>
    </View>
);

// Styles
const styles = StyleSheet.create({
    progressBarContainer: {
        alignItems: 'center',
    },
    totalProgressWrapper: {
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
    },
    totalWordsWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        width: '50%',
    },
    totalWordsCount: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        gap: 5,
    },
    totalWordsNumber: {
        fontSize: 42,
    },
    totalWordsTotal: {
        color: color.neutral,
        fontSize: 18,
        bottom: 8,
    },
    nonRepertoriedWrapper: {
        alignItems: 'flex-end',
        width: '50%',
    },
    nonRepertoriedLabel: {
        textAlign: 'right',
    },
    nonRepertoriedCount: {
        textAlign: 'right',
    },
    totalProgressBar: {
        height: 10,
        width: '60%',
        borderRadius: 50,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    horizontalSegment: {
        height: '100%',
        borderRadius: 10,
    },
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        marginTop: 10,

    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'space-around',
    },
    legendColor: {
        width: 15,
        height: 15,
        borderRadius: 50,
    },
    legendText: {
        fontSize: 12,
    },
    legendButton: {
        marginTop: 15,
        alignSelf: 'flex-end',
    },
    legendButtonText: {

        textDecorationLine: 'underline',
    },
});

export default TotalWordsProgressBar;
