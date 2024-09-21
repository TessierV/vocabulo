import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import ReusableSvg from '@/SVG/BannerSvg'; // Import the ReusableSvg component
import { darkTheme, lightTheme } from '@/constants/Colors';
import { AnnonceTitle, ContainerParagraph } from '@/constants/StyledText';
import { GradientBorderButtonMini } from '@/components/Button';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import bgCoverImage from '@/assets/images/fond.png'; // Import the default background image

const { height } = Dimensions.get('window');

// ReusableCard component definition
const ReusableCard = ({
  title = "Titre",  // The title of the card, with a default value "Titre"
  description = "Description",   // The description of the card, with a default value "Description"
  useSvg = false,   // Boolean to determine if SVG will be used instead of an image, default is false
  image = null, // Image to be displayed if `useSvg` is false, default is null
  onPressButton = () => { },   // Callback function that will be triggered when the button is pressed, default is an empty function
  imageBg = null,   // Background image, can be changed if provided, otherwise the default background will be used
  darkMode = false,   // Boolean to toggle dark mode, default is false (light mode)
  containerBgColor = lightTheme.darkShade,   // Background color of the card container, default is the dark shade of the light theme
  iconBgColor = "red",   // Background color of the icon container, default is red
  iconName = "default",   // Icon name to be displayed in the card, default is "default"
  bannerSvgName = null,   // Name of the reusable SVG to be displayed if `useSvg` is true, default is null
  textButton = "Commencer",
}) => {
  return (
    <View style={[styles.mainContainer, { backgroundColor: containerBgColor }]}>
      {/* Background image (use imageBg if provided, otherwise default to bgCoverImage) */}
      <Image source={imageBg ? imageBg : bgCoverImage} style={styles.backgroundImage} />

      {/* Icon container */}
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <InterfaceSvg iconName={iconName} height={15} width={15} fillColor={lightTheme.dark_lightShade} />
      </View>

      {/* Main content container */}
      <View style={[styles.container]}>
        <View style={styles.textSection}>
          {/* Conditionally render ReusableSvg or Image */}
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            {useSvg ? (
              <ReusableSvg
                bannerSvgName={bannerSvgName}
                height={90}
                width={90}
                fillColor={lightTheme.dark_lightShade}
              />
            ) : (
              <Image
                source={image} // Use the image prop when useSvg is false
                style={styles.image} // Style for the image
                resizeMode="contain"
              />
            )}
          </View>

          {/* Title and description */}
          <View>
            <AnnonceTitle style={[styles.title, { color: darkMode ? lightTheme.lightShade : darkTheme.lightShade }]}>
              {title}
            </AnnonceTitle>
            <ContainerParagraph style={styles.description}>{description}</ContainerParagraph>
          </View>

          {/* Button container */}
          <View style={{ alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <GradientBorderButtonMini
              text={textButton}
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

// Styles definition
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.6,
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
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
});

export default ReusableCard;
