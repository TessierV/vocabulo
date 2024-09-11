import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import SvgIcon from './SvgIcon'; // Importer le composant SvgIcon
import { darkTheme, lightTheme } from '@/constants/Colors';
import { AnnonceTitle, ContainerParagraph } from '@/constants/StyledText';
import { GradientBorderButtonMini } from '@/components/Button';
import { SvgXml } from 'react-native-svg';

// Import de l'image locale
import bgImage from '@/assets/images/seatree.png';
import imgBanner from '@/assets/images/icon_transparent.png';
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
  buttonText = "Commencer",
  onPressButton = () => {},
  image = imgBanner,
  imageBg = bgImage,
  iconName = "random",
  darkMode = false,
  containerBgColor = lightTheme.darkShade,
  iconBgColor = "red",
  useSvg = false,
  customImage = null, // Prop pour passer une image personnalisée
  customSvg = null, // Prop pour passer un SVG personnalisé
}) => {
  return (
    <View style={[styles.mainContainer, { backgroundColor: containerBgColor }]}>
      <View style={styles.container}>
        <View style={styles.textSection}>
          <AnnonceTitle style={[styles.title, { color: darkMode ? lightTheme.lightShade : darkTheme.lightShade }]}>
            {title}
          </AnnonceTitle>
          <ContainerParagraph style={styles.description}>{description}</ContainerParagraph>
          <GradientBorderButtonMini
            text={buttonText}
            background={darkMode ? 'light' : 'dark'}
            textColor={darkMode ? 'dark' : 'light'}
            onPress={onPressButton}
          />
        </View>
        <View style={styles.imageSection}>
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            <SvgIcon icon={iconName} fillColor='white' />
          </View>

          {useSvg ? (
            <View style={{ alignSelf: 'center', position: 'absolute', zIndex: 1, justifyContent: 'center' }}>
              <SvgXml xml={customSvg ? customSvg : svgBanner} width="80" height="80" />
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
