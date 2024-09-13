import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import SvgIcon from '@/components/Quizz/SvgIcon'; // Importer le composant SvgIcon
import { darkTheme, lightTheme } from '@/constants/Colors';
import { AnnonceTitle, ContainerParagraph } from '@/constants/StyledText';
import { GradientBorderButtonMini } from '@/components/Button';
import { SvgXml } from 'react-native-svg';
import InterfaceSvg from '@/SVG/InterfaceSvg';
// Import de l'image locale
import bgImage from '@/assets/images/seatree.png';
import imgBanner from '@/assets/images/icon_transparent.png';
import bgCoverImage from '@/assets/images/fond.png'; // Import the background image

const svgBanner = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z" fill="#292D32" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5.48999V20.49" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.75 8.48999H5.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 11.49H5.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const { height } = Dimensions.get('window');

const ReusableCard = ({
  title = "Titre",
  description = "Description",
  onPressButton = () => { },
  image = imgBanner,
  imageBg = bgImage,
  iconName = "random",
  darkMode = false,
  containerBgColor = lightTheme.darkShade,
  iconBgColor = "red",
  useSvg = false,
  customSvg = null,
}) => {
  return (
    <View style={[styles.mainContainer, { backgroundColor: containerBgColor }]}>
      <Image source={bgCoverImage} style={styles.backgroundImage} />
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <InterfaceSvg iconName="key_delete" height={21} width={21} fillColor={lightTheme.dark_lightShade} />
      </View>
      <View style={[styles.container,]}>
        <View style={styles.textSection}>
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <SvgXml xml={customSvg ? customSvg : svgBanner} width="80" height="80" />
          </View>
          <View >
            <AnnonceTitle style={[styles.title, { color: darkMode ? lightTheme.lightShade : darkTheme.lightShade }]}>
              {title}
            </AnnonceTitle>
            <ContainerParagraph style={styles.description}>{description}</ContainerParagraph>
            <View style={{alignContent : 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center',}}>

            <GradientBorderButtonMini
            text="en savoir plus"
            background={darkMode ? 'light' : 'dark'}
            textColor={darkMode ? 'dark' : 'light'}
            onPress={onPressButton}
          />
          </View>
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
    justifyContent: 'center',
    position: 'relative', // Important for background image layering
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
    opacity: 0.3, // Ensure it sits behind other content
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
    marginBottom: 20,
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
  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
});

export default ReusableCard;
