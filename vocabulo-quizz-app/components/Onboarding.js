import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImage from '../assets/images/Logo_transparent.png';
import useCustomFonts from '../constants/useCustomFonts';

const slides = [
  {
    id: '1',
    title: 'Bienvenue',
    text: '1ère application pour aidez la communauté sourde.',

    image: require('../assets/images/Onboarding/Onboarding1.png'),
    backgroundColor: "#7DAED6",
  },
  {
    id: '2',
    title: 'Jouez et Mémorisez',
    text: 'Testez et améliorez vos connaissances avec des quizz',

    image: require('../assets/images/Onboarding/Onboarding2.png'),
    backgroundColor: "#AC83C8",
  },
  {
    id: '3',
    title: 'Vos Données',
    text: 'Testez vos connaissances et suivez votre progression.',
    image: require('../assets/images/Onboarding/Onboarding3.png'),
    backgroundColor: '#99CDBD',
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

  const backgroundColor = scrollX.interpolate({
    inputRange: slides.map((_, index) => index * width),
    outputRange: slides.map(slide => slide.backgroundColor),
  });

  const Slide = ({ item }) => (
    <View style={styles.slideContainer}>
      <ImageBackground source={item.image} style={styles.slide} imageStyle={styles.image}>
        <View style={styles.header}>
          <Image source={logoImage} style={styles.logo} tintColor={'#FFF'} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>

        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
            <Text style={styles.buttonText}>{currentSlideIndex === slides.length - 1 ? 'Commencez' : 'Suivant'}</Text>
          </TouchableOpacity>
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
          style={[
            styles.paginationDot,
            currentSlideIndex === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    width,
    height,
  },
  slide: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 56,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'font-h1-bold',
    lineHeight: 75,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'font-base-bold',
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7F50',
    borderRadius: 8,
    paddingVertical: 10,
    minHeight: 50,
    width: 170,
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    height: 10,
    width: 10,
    backgroundColor: "#DAE0E4",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FFF',
  },
});

export default Onboarding;
