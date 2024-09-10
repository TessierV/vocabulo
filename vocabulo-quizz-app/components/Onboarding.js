import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImage from '@/assets/images/Logo_transparent.png';
import logoText from '../assets/images/Logo_vocabuloText.png';
import useCustomFonts from '../constants/useCustomFonts';

const slides = [
  {
    id: '1',
    title: 'Bienvenue',
    text: 'La première application de quizz pour personnes malentendantes',
    image: require('../assets/images/Onboarding/1.png'),
    backgroundImage: require('@/assets/images/Onboarding/2.png'),
    backgroundColor: "#99CDBD",
  },
  {
    id: '2',
    title: 'Jouez et Mémorisez',
    text: 'Testez et améliorez vos connaissances avec des quizz',
    image: require('../assets/images/Onboarding/2.png'),
    backgroundImage: require('../assets/images/Onboarding/1.png'),
    backgroundColor: "#7DAED6",
  },
  {
    id: '3',
    title: 'Vos Données',
    text: 'Testez vos connaissances et suivez votre progression.',
    image: require('../assets/images/Onboarding/3.png'),
    backgroundImage: require('../assets/images/Onboarding/3.png'),
    backgroundColor: '#AF7DD6',
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
      // Navigate to login screen after onboarding
      navigation.navigate('login');
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
    <ImageBackground source={item.backgroundImage} style={styles.slideContainer} imageStyle={{ resizeMode: 'cover' }}>
      <View style={styles.header}>
        <Image source={logoImage} style={styles.logo}  tintColor={'#313941'}/>
      </View>
      <View style={{margin:20, bottom: 0, flex: 1, height: '40%',}}>
        <View style={styles.content}>
          <Image source={logoText} style={styles.logotext}  />
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
            <Text style={styles.buttonText}>{currentSlideIndex === slides.length - 1 ? 'Commencez' : 'Suivant'}</Text>
          </TouchableOpacity>
          <Pagination />
        </View>
      </View>
    </ImageBackground>
  );

  const Pagination = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentSlideIndex === index && styles.paginationDotActive
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
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    height: '60%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  logotext: {
    width: 206,
    height: 50,
  },
  text: {
    color: '#313941',
    textAlign: 'center',
    fontFamily: 'font-base',
    padding: 20,
    fontSize: 18,
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
    borderRadius: 8,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FFF',
  },
});

export default Onboarding;
