import React from 'react';
import { darkTheme, lightTheme, color } from '@/constants/Colors'; // Importing theme colors
import Slider from '@/components/Slider/Slider'; // Importing Slider component
import ReusableCard from '@/components/Slider/card/ReusableCard'; // Importing reusable card component
import { basic } from '@/constants/texts'; // Importing text constants for the basic section

// SliderBasic component that renders a slider with different reusable cards
const SliderBasic = ({ darkMode }) => {
  return (
    // Slider component with data for each slide
    <Slider
      data={[
        {
          // First slide with a reusable card component
          key: '1',
          component: (
            <ReusableCard
              title={basic.slider.slider1.title} // Title for the first slide
              description={basic.slider.slider1.description} // Description for the first slide
              darkMode={darkMode} // Passing dark mode prop to the card
              containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade} // Setting background color based on dark mode
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="category" // Icon name for the second slide
              bannerSvgName="basic" // SVG banner for the third slide
              useSvg={true} // Enable using an SVG banner

              showButton={false} // Hide button for this card
            />
          ),
        },
        {
          // Second slide with a different reusable card component
          key: '2',
          component: (
            <ReusableCard
              title={basic.slider.slider2.title} // Title for the third slide
              description={basic.slider.slider2.description} // Description for the third slide
              darkMode={darkMode} // Passing dark mode prop
              containerBgColor={darkMode ? darkTheme.light_darkShade : color.darkBlue} // Setting background color for this card
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="annonce" // Icon name for the second slide
              bannerSvgName="frames" // SVG banner for the third slide
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
              title={basic.slider.slider3.title} // Title for the third slide
              description={basic.slider.slider3.description} // Description for the third slide
              darkMode={darkMode} // Passing dark mode prop
              containerBgColor={darkMode ? darkTheme.light_darkShade : color.darkGreen} // Setting background color
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="new" // Icon name for the third slide
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

export default SliderBasic; // Exporting the SliderHome component
