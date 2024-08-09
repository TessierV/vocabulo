import React from 'react';
import { useNavigation } from 'expo-router';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { HeaderTitle } from '@/constants/StyledText';

export default function TopNavBar({ title = "Accueil", tintColor = Colors.darkPlum, color = Colors.darkPlum }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={[styles.topContainer, { backgroundColor: color }]}></View>
            <Image 
                source={require('./../../assets/images/Header-background.png')}
                style={[styles.headerBackground, { tintColor: tintColor }]}
            />
            <View style={styles.iconTextContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" style={styles.iconBack} />
                </TouchableOpacity>
                <HeaderTitle style={[styles.text, { color: Colors.white }]}>{title}</HeaderTitle>
                <View></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        top: 0,
    },
    topContainer: {
        width: '100%',
        height: '5%',
    },
    headerBackground: {
        position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'flex-start',
        top: 0,
        resizeMode: 'contain',
    },
    iconTextContainer: {
        marginTop: 20,
        flexDirection: 'row',
        position: 'relative',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        marginRight: 30
    },
    iconBack: {
        color: Colors.white,
        fontSize: 24,
    },
});
