import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const slides = [
  {
    id: '1',
    title: 'Bienvenue à notre App',
    image: require('../assets/images/Onboarding/Onboarding1.png'),
  },
  {
    id: '2',
    title: 'Explorez les fonctionnalités',
    image: require('../assets/images/Onboarding/Onboarding2.png'),
  },
  {
    id: '3',
    title: 'Commencez votre aventure',
    image: require('../assets/images/Onboarding/Onboarding3.png'),
  },
];

const { width, height } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.replace('/home');
    }
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const Slide = ({ item }) => (
    <ImageBackground source={item.image} style={styles.slide} imageStyle={{ resizeMode: 'cover' }}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
          <Text style={styles.buttonText}>{currentSlideIndex === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
        <Pagination />
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
            currentSlideIndex === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF7F50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    backgroundColor: '#FF7F50',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FFF',
  },
});

export default Onboarding;
