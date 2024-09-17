import React from 'react';
import { View, StyleSheet } from 'react-native';
import BigSlider from '@/components/Slider/BigSlider';
import BigReusableCard from '@/components/Slider/card/BigReusableCard';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { ai } from '@/constants/texts';

const SliderAI = ({ darkMode, setSliderModalVisible }) => {
  return (
    <View style={styles.container}>
      <BigSlider
        data={[
          {
            key: '1', component:
            <BigReusableCard
              title={ai.slider.slider1.title}
              description={ai.slider.slider1.description}
              buttonText={ai.slider.slider1.button}
              onPressButton={() => setSliderModalVisible(true)}
              darkMode={darkMode}
              containerBgColor={color.darkPlum}
              iconName="hybrid"
              iconBgColor={darkTheme.darkShade}
              bannerSvgName="hybrid"
              useSvg={true}
            />
          },
        ]}
        darkMode={darkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

export default SliderAI;
