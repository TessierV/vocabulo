// WeeklyOverview.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AnnonceTitle } from '@/constants/StyledText';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
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
                    let backgroundColor = 'transparent';
                    let borderStyle = styles.futureBorder;
                    let iconName = 'moon';

                    if (index === todayIndex) {
                        backgroundColor = color.darkGreen;
                        borderStyle = styles.currentBorder;
                        iconName = 'sun';
                    } else if (index < todayIndex) {
                        backgroundColor = 'transparent';
                        borderStyle = styles.pastBorder;
                        iconName = 'heart';
                    }

                    return (
                        <View key={index} style={[styles.card, { backgroundColor }, borderStyle]}>
                            <Text style={styles.cardText}>{day}</Text>
                            <Feather name={iconName} size={18} color="#fff" style={styles.icon} />
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
    },
    cardText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    icon: {
        marginTop: 10,
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
        borderColor: color.darkGreen,
        borderStyle: 'solid',
    },
});

export default WeeklyOverview;
