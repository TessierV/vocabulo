import React from 'react';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import Slider from '@/components/Slider/Slider';
import ReusableCard from '@/components/Slider/card/ReusableCard';
import { profil } from '@/constants/texts';
import WeeklyOverview from '@/components/Home/WeeklyOverview';


const SliderProfil = ({ darkMode, userInfo }) => {
  return (
    <Slider
      data={[
        {
          key: '1',
          component: (
            <ReusableCard
              title={profil.slider.slider1.title}
              description={`${profil.slider.slider1.description} ${userInfo ? userInfo.pseudo : ''}`}
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
              title={profil.slider.slider2.title}
              description={profil.slider.slider2.description}
              darkMode={darkMode}
              containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade}
              iconName="annonce"
              bannerSvgName="monitor"
              useSvg={true}
              showButton={false}
            />
          ),
        },
        {
          key: '3',
          component: <WeeklyOverview darkMode={darkMode} />,
        },
      ]}
      darkMode={darkMode}
    />
  );
};

export default SliderProfil;
