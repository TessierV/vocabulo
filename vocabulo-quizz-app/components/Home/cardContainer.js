import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BannerImage from '@/assets/images/Parameter.png';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { AnnonceTitle, AnnonceParagraph } from '@/constants/StyledText';

const cardContainer = ({ title, text, popuptitle, popuptext, popupbutton, darkMode }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.bannerSection}>
            <ImageBackground source={BannerImage} imageStyle={styles.bannerBackground}>
                <View style={styles.bannerContainer}>
                    <View style={styles.bannerTextContainer}>
                        <AnnonceTitle style={[styles.bannerTitle, { color: darkMode ? darkTheme.lightShade : lightTheme.lightShade }]}>{title}</AnnonceTitle>
                        <TouchableOpacity onPress={handlePress}>
                            <Feather style={styles.bannerInfo} name="help-circle" size={20} color={darkMode ? darkTheme.lightShade : lightTheme.lightShade} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bannerTextContainer}>
                        <AnnonceParagraph style={[styles.bannerText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.dark_lightShade }]}>{text}</AnnonceParagraph>
                    </View>
                </View>
            </ImageBackground>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.lightShade }]}>
                        <Text style={[styles.modalTitle, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{popuptitle}</Text>
                        <Text style={[styles.modalText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{popuptext}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={[styles.closeButton, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{popupbutton}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    bannerSection: {
        alignSelf: 'center',

    },
    bannerBackground: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,

    },
    bannerContainer: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 7,
        padding: 10,
    },
    bannerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bannerInfo: {
        padding: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        fontSize: 16,
    },
});

export default cardContainer;
