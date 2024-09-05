import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import InfoModal from '@/components/Slider/SlideModal';
import TitleSlider from '@/components/Slider/SliderTitleWithInfo';
import { texts } from '@/constants/texts';

const WeeklyOverview = ({ darkMode }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1;

    const handlePress = () => {
        setModalVisible(true);
    };

    return (
        <View style={[styles.cardContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
            <TitleSlider
                title={texts.homeScreen.slider.weeklyOverview.title}
                iconName="info"
                onPress={handlePress}
                darkMode={darkMode}
            />
            <View style={styles.daysContainer}>
                {days.map((day, index) => {
                    let borderStyle, svgContent, textStyle;

                    if (index === todayIndex) {
                        borderStyle = styles.currentBorder;
                        svgContent = texts.homeScreen.slider.weeklyOverview.icons.today;
                        textStyle = [styles.cardText, styles.todayText];
                    } else if (index < todayIndex) {
                        borderStyle = styles.pastBorder;
                        svgContent = texts.homeScreen.slider.weeklyOverview.icons.past;
                        textStyle = styles.cardText;
                    } else {
                        borderStyle = styles.futureBorder;
                        svgContent = texts.homeScreen.slider.weeklyOverview.icons.futur;
                        textStyle = styles.cardText;
                    }

                    return (
                        <View key={index} style={[styles.card, borderStyle]}>
                            {index === todayIndex && (
                                <SvgXml
                                    xml={`
                                        <svg width=70 height=70 viewBox="0 0 100 100">
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" style="stop-color:${color.lightGreen};stop-opacity:1" />
                                                    <stop offset="50%" style="stop-color:${color.lightBlue};stop-opacity:1" />
                                                    <stop offset="100%" style="stop-color:${color.lightPlum};stop-opacity:1" />
                                                </linearGradient>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#gradient)" />
                                        </svg>
                                    `}
                                    style={styles.svgBackground}
                                />
                            )}
                            <Text style={textStyle}>{day}</Text>
                            {svgContent ? (
                                <SvgXml xml={svgContent} width={20} height={40} />
                            ) : (
                                <Text style={styles.cardText}>...</Text>
                            )}
                        </View>
                    );
                })}
            </View>

            <InfoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={texts.homeScreen.slider.weeklyOverview.popup.title}
                text={texts.homeScreen.slider.weeklyOverview.popup.text}
                button={texts.homeScreen.slider.weeklyOverview.popup.button}
                darkMode={darkMode}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'center',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        height: 70,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    cardText: {
        color: lightTheme.dark_lightShade,
        fontSize: 14,
        fontWeight: 'bold',
        zIndex: 1,
    },
    todayText: {
        color: lightTheme.darkShade,
    },
    futureBorder: {
        borderWidth: 1,
        borderColor: darkTheme.dark_lightShade,
        borderStyle: 'dashed',
    },
    currentBorder: {
        borderWidth: 1,
        borderColor: 'transparent',
    },
    pastBorder: {
        borderWidth: 1,
        borderColor: color.neutral,
        borderStyle: 'solid',
    },
    svgBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 8,
        zIndex: 0,
    },
});

export default WeeklyOverview;
