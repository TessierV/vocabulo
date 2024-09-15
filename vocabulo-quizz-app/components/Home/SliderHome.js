import React from 'react';
import { darkTheme, lightTheme, color } from '@/constants/Colors'; // Importing theme colors
import Slider from '@/components/Slider/Slider'; // Importing Slider component
import ReusableCard from '@/components/Slider/card/ReusableCard'; // Importing reusable card component
import { home } from '@/constants/texts'; // Importing text constants for the home section

// SliderHome component that renders a slider with different reusable cards
const SliderHome = ({ darkMode }) => {
  return (
    // Slider component with data for each slide
    <Slider
      data={[
        {
          // First slide with a reusable card component
          key: '1',
          component: (
            <ReusableCard
              title={home.slider.slider1.title} // Title for the first slide
              description={home.slider.slider1.description} // Description for the first slide
              darkMode={darkMode} // Passing dark mode prop to the card
              containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade} // Setting background color based on dark mode
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="home" // Icon name for the first slide
              showButton={false} // Hide button for this card
            />
          ),
        },
        {
          // Second slide with a different reusable card component
          key: '2',
          component: (
            <ReusableCard
              title={home.slider.slider2.title} // Title for the second slide
              description={home.slider.slider2.description} // Description for the second slide
              darkMode={darkMode} // Passing dark mode prop
              containerBgColor={darkMode ? darkTheme.light_darkShade : color.darkBlue} // Setting background color for this card
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="annonce" // Icon name for the second slide
              bannerSvgName="soon" // SVG banner for the second slide
              useSvg={true} // Enable using an SVG banner
              showButton={false} // Hide button for this card
            />
          ),
        },
        {
          // Third slide with another reusable card component
          key: '3',
          component: (
            <ReusableCard
              title={home.slider.slider3.title} // Title for the third slide
              description={home.slider.slider3.description} // Description for the third slide
              darkMode={darkMode} // Passing dark mode prop
              containerBgColor={darkMode ? darkTheme.light_darkShade : "#38b47f"} // Setting background color
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="annonce" // Icon name for the third slide
              bannerSvgName="fleurs" // SVG banner for the third slide
              useSvg={true} // Enable using an SVG banner
              showButton={false} // Hide button for this card
            />
          ),
        },
      ]}
      darkMode={darkMode} // Passing dark mode prop to the slider component
    />
  );
};

export default SliderHome; // Exporting the SliderHome component
