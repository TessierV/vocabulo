import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ReusableSvg from '@/SVG/BannerSvg'; // Import the new ReusableSvg component
import { darkTheme, lightTheme } from '@/constants/Colors';
import { AnnonceTitle, ContainerParagraph } from '@/constants/StyledText';
import { GradientBorderButtonMini } from '@/components/Button';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import bgCoverImage from '@/assets/images/fond.png'; // Import the background image

const { height } = Dimensions.get('window');

const BigReusableCard = ({
  title = "Titre",
  description = "Description",
  onPressButton = () => { },
  image = null,
  imageBg = null,
  iconName = "default",
  darkMode = false,
  containerBgColor = lightTheme.darkShade,
  iconBgColor = "red",
  useSvg = false,
  bannerSvgName = null, // New prop for ReusableSvg
}) => {
  return (
    <View style={[styles.mainContainer, { backgroundColor: containerBgColor }]}>
      <Image source={bgCoverImage} style={styles.backgroundImage} />
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <InterfaceSvg iconName={iconName} height={15} width={15} fillColor={lightTheme.dark_lightShade} />
      </View>
      <View style={[styles.container]}>
        <View style={styles.textSection}>
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <ReusableSvg
              bannerSvgName={bannerSvgName}
              height={90}
              width={90}
              fillColor={lightTheme.dark_lightShade}
            />
          </View>
          <View>
            <AnnonceTitle style={[styles.title, { color: darkMode ? lightTheme.lightShade : darkTheme.lightShade }]}>
              {title}
            </AnnonceTitle>
            <ContainerParagraph style={styles.description}>{description}</ContainerParagraph>
          </View>
          <View style={{ alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <GradientBorderButtonMini
                text="en savoir plus"
                background={darkMode ? 'dark' : 'dark'}
                textColor={darkMode ? 'light' : 'light'}
                onPress={onPressButton}
              />
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: 16,
    width: '100%',
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
    borderRadius: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  textSection: {
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    color: lightTheme.lightShade,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    padding: 5,
    borderRadius: 50,
  },
});

export default BigReusableCard;
