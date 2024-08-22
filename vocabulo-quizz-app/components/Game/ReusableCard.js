import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import SvgIcon from './SvgIcon'; // Importer le composant SvgIcon
import { darkTheme, lightTheme } from '@/constants/Colors';
import { AnnonceTitle, ContainerParagraph } from '@/constants/StyledText';
import { GradientBorderButtonMini } from '@/components/Button';

// Import de l'image locale
import bgImage from '@/assets/images/seatree.png';
import imgSection from '@/assets/images/oyster.png'; // Import d'une autre image locale

const { height } = Dimensions.get('window');

const ReusableCard = ({
  title = "Titre",
  description = "Description",
  buttonText = "Commencer",
  onPressButton = () => {},
  image = imgSection,
  imageBg = bgImage,
  iconName = "random", // Utiliser "random" comme exemple
  darkMode = false,
  containerBgColor = lightTheme.darkShade, // Prop pour changer la couleur du conteneur principal
  iconBgColor = "red", // Prop pour changer la couleur de fond de l'icône
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
          <Image
            source={image}
            style={styles.image}
            resizeMode="cover"
          />
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
  },
});

export default ReusableCard;
