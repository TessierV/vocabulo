import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { AnnonceTitle, ContainerParagraph } from '@/constants/StyledText';
import { GradientBorderButtonMini } from '@/components/Button';
import { SvgXml } from 'react-native-svg';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import ReusableSvg from '@/SVG/BannerSvg';


// Import de l'image locale
import bgImage from '@/assets/images/seatree.png';
import imgBanner from '@/assets/images/icon_transparent.png';
import bgCoverImage from '@/assets/images/fond.png'; // Import the background image


const { height } = Dimensions.get('window');

const ReusableCard = ({
    title = "Titre",
    description = "Description",
    buttonText = "Commencer",
    onPressButton = () => { },
    image = imgBanner,
    imageBg = bgImage,
    iconName = "random",
    bannerSvgName = "default",
    darkMode = false,
    containerBgColor = lightTheme.darkShade,
    iconBgColor = "red",
    useSvg = false,
    customImage = null, // Prop pour passer une image personnalisée
    customSvg = null, // Prop pour passer un SVG personnalisé
    showButton = true, // New prop to control button visibility
}) => {
    return (
        <View style={[styles.mainContainer, { backgroundColor: containerBgColor }]}>
            <Image source={bgCoverImage} style={styles.backgroundImage} />

            <View style={styles.container}>
                <View style={styles.textSection}>
                    <AnnonceTitle style={[styles.title, { color: darkMode ? lightTheme.lightShade : darkTheme.lightShade }]}>
                        {title}
                    </AnnonceTitle>
                    <ContainerParagraph style={styles.description}>{description}</ContainerParagraph>
                    {showButton && (
                        <GradientBorderButtonMini
                            text={buttonText}
                            background={darkMode ? 'light' : 'dark'}
                            textColor={darkMode ? 'dark' : 'light'}
                            onPress={onPressButton}
                        />
                    )}
                </View>

                <View style={styles.imageSection}>
                    <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                        <InterfaceSvg iconName={iconName} height={15} width={15} fillColor={lightTheme.dark_lightShade} />
                    </View>

                    {useSvg ? (
                        <View style={{ alignSelf: 'center', position: 'absolute', zIndex: 1, justifyContent: 'center' }}>
                            <ReusableSvg bannerSvgName={bannerSvgName} height={80} width={80} fillColor={lightTheme.dark_lightShade} />
                        </View>
                    ) : (
                        <Image
                            source={customImage ? customImage : image}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )}

                    <Image
                        source={imageBg}
                        style={styles.imageBackground}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.3,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    textSection: {
        width: '55%',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
    },
    description: {
        marginBottom: 20,
        fontSize: 10,
        color: lightTheme.lightShade,
    },
    imageSection: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 0,
        zIndex: 2,
        padding: 5,
        borderRadius: 50,
    },
    image: {
        position: 'absolute',
        zIndex: 1,
        height: 80,
        width: 80,
    },
    imageBackground: {
        width: '100%',
        height: '90%',
        opacity: 0.7,
    },
});

export default ReusableCard;
