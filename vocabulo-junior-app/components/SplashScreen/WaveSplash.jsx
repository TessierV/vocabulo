import React, { useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {  mix } from 'react-native-redash';
import { Colors } from '@/constants/Colors';


// Taille de l'animation, calculée en fonction de la largeur de la fenêtre

const SIZEheight = Dimensions.get('window').height;

// Création d'un composant animé pour le Path SVG
const AnimatedPath = Animated.createAnimatedComponent(Path);

const WaveSplash = () => {
  // Valeur partagée pour contrôler l'animation
  const progress = useSharedValue(0);

  // Utilisation d'un effet pour démarrer l'animation au chargement du composant
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1, // Répéter indéfiniment
      true // Revenir à la valeur initiale après chaque cycle
    );
  }, [progress]);

  // Calcul des données de la première vague en fonction de la progression de l'animation
  const data1 = useDerivedValue(() => {
    const m = mix.bind(null, progress.value);
    return {
      from: {
        x: m(-0.1, -1),
        y: m(0.2, 0.5),
      },
      c1: { x: m(0, 0.5), y: m(0.7, 1) },
      c2: { x: m(1, 0.5), y: m(0.3, 0) },
      to: { x: m(1.1, 2), y: m(0.8, 0.5) },
    };
  });

  // Calcul des données de la deuxième vague, inversée par rapport à la première
  const data2 = useDerivedValue(() => {
    const m = mix.bind(null, 1 - progress.value);
    return {
      from: {
        x: m(-0.1, -1),
        y: m(0.2, 0.5),
      },
      c1: { x: m(0, 0.5), y: m(0.7, 1) },
      c2: { x: m(1, 0.5), y: m(0.3, 0) },
      to: { x: m(1.1, 2), y: m(0.8, 0.5) },
    };
  });

  // Génération des propriétés animées pour le premier Path SVG
  const path1 = useAnimatedProps(() => {
    const { from, c1, c2, to } = data1.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });

  // Génération des propriétés animées pour le deuxième Path SVG
  const path2 = useAnimatedProps(() => {
    const { from, c1, c2, to } = data2.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        <Svg
          width={SIZEheight}
          height= {SIZEheight}
          viewBox="0 0 1 1"
        >
          <AnimatedPath fill={Colors.darkBlueTransparent} animatedProps={path2} />
          <AnimatedPath fill={Colors.neutralBlueTransparent} animatedProps={path1} />
        </Svg>
    </View>
  );
};

export default WaveSplash;
