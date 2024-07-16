import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BannerImage from '@/assets/images/Parameter.png';
import { darkTheme, lightTheme } from '@/constants/Colors';


const BannerContainer = ({ title, text, darkMode }) => {

    return (
        <View style={styles.bannerSection}>
            <ImageBackground source={BannerImage} imageStyle={styles.bannerBackground}>
                <View style={styles.bannerContainer}>

                    <View style={styles.bannerTextContainer}>
                        <Text style={[styles.bannerTitle, { color: darkMode ? darkTheme.lightShade : lightTheme.lightShade } ]}>{title}</Text>
                        <Text style={[styles.bannerText, { color: darkMode ? darkTheme.lightShade : lightTheme.lightShade } ]}>{text}</Text>
                    </View>
                    <Feather name="help-circle" size={20} color={darkMode ? darkTheme.lightShade : lightTheme.lightShade} />

                </View>
            </ImageBackground>

        </View>
    );
};

const styles = StyleSheet.create({
    bannerSection: {
        width: '90%',
        alignSelf: 'center',
    },


    bannerBackground: {
        width: '100%',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,

    },
    bannerContainer: {
        width: '100%',
        minHeight: 100,
        alignSelf: 'center',
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },

    bannerTextContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
        Width: '90%',
    },
    bannerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    bannerText: {
        textAlign: 'justify',

    },
});

export default BannerContainer;
