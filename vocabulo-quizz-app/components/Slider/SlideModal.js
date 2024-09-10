import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Bubble from '../Effect/Bubble';
import { Video } from 'expo-av';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { GradientBorderButton } from '../Button';

const { width, height } = Dimensions.get('window');

const InfoModal = ({ visible, onClose, title, text, button, darkMode }) => {
    const videoUrl = [
        {
            id: '1',
            url: 'https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/semainier_nm_1.mp4',
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.videoContainer}>
            <Video
                source={{ uri: item.url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                useNativeControls
                style={styles.video}
            />
        </View>
    );

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFillObject}>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <Bubble
                            key={index}
                            size={Math.random() * 30 + 20}
                            color={
                                index % 3 === 0
                                    ? color.darkBlue
                                    : index % 3 === 1
                                        ? color.neutralBlue
                                        : color.lightBlue
                            }
                            duration={15000}
                            delay={Math.random() * 10000}
                            opacity={0.5}
                        />
                    ))}
                </View>

                <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.lightShade }]}>
                    <FlatList
                        data={videoUrl}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.videoList}
                    />

                    <Text style={[styles.modalTitle, { color: darkMode ? darkTheme.lightShade : darkTheme.darkShade }]}>
                        {title}
                    </Text>
                    <Text style={[styles.modalText, { color: darkMode ? darkTheme.lightShade : lightTheme.light_darkShade }]}>
                        {text}
                    </Text>

                    <GradientBorderButton
                        text={button}
                        background={darkMode ? 'dark' : 'light'}
                        onPress={onClose}
                        textColor={darkMode ? 'light' : 'dark'}
                    />
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(13, 19, 32, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    videoContainer: {
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 8,

    },
    videoList: {
        width: '100%',
        marginBottom: 10,

    },
});

export default InfoModal;
