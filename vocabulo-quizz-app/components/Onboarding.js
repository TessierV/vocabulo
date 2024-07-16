import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImage from '../assets/images/Logo_transparent.png';
import color from '../constants/Colors';

const slides = [
  {
    id: '1',
    title: 'Bienvenue à notre App',
    image: require('../assets/images/Onboarding/Onboarding1.png'),
    backgroundColor: "#99CDBD",
  },
  {
    id: '2',
    title: 'Mémorisez les Signes',
    image: require('../assets/images/Onboarding/Onboarding2.png'),
    backgroundColor: "#7DAED6",
  },
  {
    id: '3',
    title: 'Jouez et Apprenez',
    image: require('../assets/images/Onboarding/Onboarding3.png'),
    backgroundColor: "#AC83C8",
  },
];

const { width, height } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

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
          <Image source={logoImage} style={styles.logo} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
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
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
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
    backgroundColor: "#FACDBC",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FF7F50',
  },
});

export default Onboarding;
