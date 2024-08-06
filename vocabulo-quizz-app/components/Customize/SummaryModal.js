import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { GradientBorderButton } from '@/components/Button';
import logoImage from '@/assets/images/logobuble';
import { BigTitle, ContainerParagraph } from '@/constants/StyledText';

const SummaryModal = ({ visible, categories, darkMode, onClose }) => {
    if (!visible) return null;

    return (
        <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.dark_lightShade }]}>
                <TouchableOpacity style={styles.removeButton} onPress={onClose}>
                    <Feather name="x" size={24} color="#333" />
                </TouchableOpacity>
                <Image source={logoImage} style={styles.logo} />
                <BigTitle>Récapitulatif</BigTitle>
                <ContainerParagraph style={{ color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }}>
                    {`Vous allez commencez vos ${categories.length} thèmes:`}
                </ContainerParagraph>
                <View>
                    {categories.map((category, index) => (
                        category ? (
                            <View key={index} style={styles.categoryRow}>
                                <View style={styles.categoryRowIcon}>
                                    <SvgXml xml={category.icon} width={30} height={30} />
                                    <Text style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade, marginLeft: 10 }}>
                                        {category.textLabel}
                                    </Text>
                                </View>
                                <Text style={{ color: darkMode ? darkTheme.lightShade : lightTheme.lightShade, marginLeft: 10 }}>
                                    {`${category.difficulty}`}
                                </Text>
                            </View>
                        ) : null
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <GradientBorderButton
                        text="Commencer"
                        background={darkMode ? 'dark' : 'light'}
                        onPress={onClose}
                        textColor={darkMode ? 'light' : 'dark'}
                    />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '100%',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '80%',
    },
    removeButton: {
        alignSelf: 'flex-end',
    },
    logo: {
        width: 150,
        height: 150,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: darkTheme.darkShade,
        gap: 10,
        justifyContent: 'space-between',
        width: '90%',
        padding: 10,
        borderRadius: 8,
    },
    categoryRowIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default SummaryModal;
