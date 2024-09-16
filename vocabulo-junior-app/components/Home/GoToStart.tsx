import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const GoToStart = () => {
    const moveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: -15,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [moveAnim]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('./../../assets/images/Logo-blue.png')}
                style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
            />
            <View style={styles.middleContainer}>
                <View style={styles.contents}>
                    <View>
                        <ButtonText style={styles.bigText}>Découvre de nouveaux mots !</ButtonText>
                        <InformationText style={styles.littleText}>
                        Prends une photo du texte dans ton livre !
                        </InformationText>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('./../../(tabs)/TakePhoto')}
                        style={styles.iconContainer}
                    >
                        <AntDesign name="rightcircle" style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 160,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'flex-end',
        padding: 15,
        marginHorizontal: 'auto',
        borderRadius: 20,
        top: 50,
    },
    middleContainer: {
        width: '100%',
        height: 70,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
        borderRadius: 15,
        justifyContent: 'center',
    },
    bigText: {
        textAlign: 'left',
    },
    littleText: {
        textAlign: 'left',
    },
    contents: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        fontSize: 40,
        color: Colors.darkBlue,
    },
    logo: {
        width: 180,
        height: 171,
        alignSelf: 'center',
        marginBottom: 10,
    },
});

export default GoToStart;
