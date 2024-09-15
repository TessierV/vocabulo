import React from 'react';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import Slider from '@/components/Slider/Slider';
import ReusableCard from '@/components/Slider/card/ReusableCard';
import { home } from '@/constants/texts';

const SliderHome = ({ darkMode }) => {
  return (
    <Slider
      data={[
        {
          key: '1',
          component: (
            <ReusableCard
              title={home.slider.slider1.title}
              description={home.slider.slider1.description}
              darkMode={darkMode}
              containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade}
              iconName="home"
              showButton={false}
            />
          ),
        },
        {
          key: '2',
          component: (
            <ReusableCard
              title={home.slider.slider2.title}
              description={home.slider.slider2.description}
              darkMode={darkMode}
              containerBgColor={darkMode ? darkTheme.light_darkShade : color.darkBlue}
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade}
              iconName="annonce"
              bannerSvgName="soon"
              useSvg={true}
              showButton={false}
            />
          ),
        },
        {
          key: '3',
          component: (
            <ReusableCard
              title={home.slider.slider3.title}
              description={home.slider.slider3.description}
              darkMode={darkMode}
              containerBgColor={darkMode ? darkTheme.light_darkShade : "#38b47f"}
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade}
              iconName="annonce"
              bannerSvgName="fleurs"
              useSvg={true}
              showButton={false}
            />
          ),
        },
      ]}
      darkMode={darkMode}
    />
  );
};

export default SliderHome;
