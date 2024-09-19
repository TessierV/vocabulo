import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImage from '@/assets/images/Logo_transparent.png';
import useCustomFonts from '../constants/useCustomFonts';
import { AnnonceTitle, BigTitle, Paragraph, Title, } from '@/constants/StyledText';
import { color, lightTheme } from '@/constants/Colors';
import logotext from '@/assets/images/Logo_vocabuloText.png';
import { GradientBackgroundButton, GradientBorderButton } from './Button';

const slides = [
  {
    id: '1',
    title: 'La première application de quizz pour personnes malentendantes',
    text: 'conçue pour enrichir votre vocabulaire avec 1991 questions uniques.',
    backgroundImage: require('@/assets/images/Onboarding/11.png'),
  },
  {
    id: '2',
    title: 'Dictionnaire LSF',
    text: 'comprend  également un',
    text2: '34 000 définitions traduites en LSF',
    text3: '27 076 signes',
    backgroundImage: require('../assets/images/Onboarding/12.png'),
  },
  {
    id: '3',
    title: 'Un quiz qui s\'adapte à votre rythme grâce à l\'IA.',
    text: 'Quizz hybride Personnalisé',
    backgroundImage: require('../assets/images/Onboarding/13.png'),
  },
];

const { width, height } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: currentSlideIndex * width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentSlideIndex]);

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.navigate('home');
    }
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const Slide = ({ item }) => (
    <View style={styles.slideContainer}>
      <ImageBackground
        source={item.backgroundImage}
        style={styles.imageBackground}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.header}>
          <Image source={logoImage} style={styles.logo} tintColor={lightTheme.darkShade} />
        </View>
        <View style={styles.content}>
          {/* Gestion de l'affichage basé sur l'ID de la slide */}
          {item.id === '1' && (
            <>
                    <Image source={logotext} style={styles.logotext} />

              <AnnonceTitle style={styles.title}>{item.title}</AnnonceTitle>
              <Paragraph style={styles.text}>{item.text}</Paragraph>
            </>
          )}
          {item.id === '2' && (
            <>
              <Paragraph style={styles.text}>{item.text}</Paragraph>
              <AnnonceTitle style={styles.title}>{item.title}</AnnonceTitle>
              <View style={styles.blackView}>
                <Title style={{fontSize: 15, color: color.neutral, textAlign: 'center'}}>{item.text2}</Title>
              </View>
              <View style={styles.blackView}>
                <Title style={{fontSize: 15, color: color.neutral, textAlign: 'center'}}>{item.text3}</Title>
              </View>
            </>
          )}
          {item.id === '3' && (
            <>
              <Paragraph style={styles.text}>{item.text}</Paragraph>
              <AnnonceTitle style={styles.title}>{item.title}</AnnonceTitle>
            </>
          )}
        </View>
        <View style={styles.footer}>
        <GradientBorderButton
          text={currentSlideIndex === slides.length - 1 ? 'Commencez' : 'Suivant'}
          textColor={'light'}
          onPress={goToNextSlide}
        />

          <Pagination />
        </View>
      </ImageBackground>
    </View>
  );

  const Pagination = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[styles.paginationDot, currentSlideIndex === index && styles.paginationDotActive]}
        />
      ))}
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FlatList
      ref={flatListRef}
      onMomentumScrollEnd={updateCurrentSlideIndex}
      data={slides}
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      renderItem={({ item }) => <Slide item={item} />}
      keyExtractor={(item) => item.id}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,

    width: width,
    height: height,

  },
  slideContainer: {
    width: width,
    height: height,
  },
  imageBackground: {
    width,
    height,
    justifyContent: 'space-around', // Distribute content equally (header, content, footer)
  },
  header: {
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    gap: 20,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logotext: {
    width: 105,
    height: 25,
  },
  title: {
    color: lightTheme.darkShade,
    textAlign: 'center',
    fontSize: 36,
    lineHeight: 50,
  },
  text: {
    color: lightTheme.dark_lightShade,
    textAlign: 'center',
  },
  blackView: {
    backgroundColor: 'black',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    minHeight: 40,
    minWidth: 180,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    height: 10,
    width: 10,
    backgroundColor: color.neutral,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: lightTheme.darkShade,
  },
});

export default Onboarding;
