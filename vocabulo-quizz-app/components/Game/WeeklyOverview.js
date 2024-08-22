import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import InfoModal from '@/components/Slider/SlideModal';
import TitleSlider from '@/components/Slider/SliderTitleWithInfo';
import { texts } from '@/constants/texts';
import { AnnonceParagraph } from '@/constants/StyledText';

const WeeklyOverview = ({ darkMode }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = () => {
        setModalVisible(true);
    };

    return (
        <View style={[styles.cardContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : color.darkBlue }]}>
            <TitleSlider
                title={texts.homeScreen.slider.weeklyOverview.title}
                iconName="info"
                onPress={handlePress}
                darkMode={darkMode}
            />
            <AnnonceParagraph>Blablekdflsdkfsldkfsldfksldkfsmdlfksdk</AnnonceParagraph>


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
        color: '#fff',
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
        borderColor: color.darkGreen,
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
