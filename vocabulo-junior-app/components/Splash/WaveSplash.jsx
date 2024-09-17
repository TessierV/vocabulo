// This file defines the WaveSplash component, which renders animated wave patterns using SVG and React Native Reanimated.

import React, { useEffect } from 'react';
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
import { mix } from 'react-native-redash';

import { Colors } from '@/constants/Colors';


// Dimensions for the animation, calculated based on the window width and height
const SIZEheight = Dimensions.get('window').height;
const SIZEwidth = Dimensions.get('window').width;

// Create an animated component for the SVG Path
const AnimatedPath = Animated.createAnimatedComponent(Path);

const WaveSplash = () => {
  // Shared value to control the animation progress
  const progress = useSharedValue(0);

  // Start the animation when the component mounts
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1, // Repeat indefinitely
      true // Reverse to the initial value after each cycle
    );
  }, [progress]);

  // Compute the data for the first wave based on animation progress
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

  // Compute the data for the second wave, which is the inverse of the first wave
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

  // Generate animated properties for the first SVG Path
  const path1 = useAnimatedProps(() => {
    const { from, c1, c2, to } = data1.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });

  // Generate animated properties for the second SVG Path
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
        height={SIZEheight}
        viewBox="0 0 1 1"
      >
        {/* Render the animated wave paths with different colors */}
        <AnimatedPath fill={Colors.lightBlue} animatedProps={path2} />
        <AnimatedPath fill={Colors.neutralBlue} animatedProps={path1} />
      </Svg>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -20,
          backgroundColor: Colors.neutralBlue,
        }}
      >
        {/* Additional SVG element (currently empty) */}
        <Svg
          width={SIZEwidth}
          height={SIZEheight}
        />
      </View>
    </View>
  );
};

export default WaveSplash;