import React from 'react';
import { darkTheme, lightTheme, color } from '@/constants/Colors'; // Importing theme colors
import Slider from '@/components/Slider/Slider'; // Importing Slider component
import ReusableCard from '@/components/Slider/card/ReusableCard'; // Importing reusable card component
import { dictionary } from '@/constants/texts'; // Importing text constants for the home section

// SliderDictionary component that renders a slider with different reusable cards
const SliderDictionary = ({ darkMode, isDaltonianMode, toggleDaltonianMode }) => {
  return (
    // Slider component with data for each slide
    <Slider
      data={[
        {
          // First slide with a reusable card component
          key: '1',
          component: (
            <ReusableCard
              title={dictionary.slider.slider1.title} // Title for the first slide
              description={dictionary.slider.slider1.description} // Description for the first slide
              darkMode={darkMode} // Passing dark mode prop to the card
              containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade} // Setting background color based on dark mode
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="bookSaved" // Icon name for the first slide
              bannerSvgName="dictionary" // SVG banner for the second slide
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
              title={dictionary.slider.slider2.title} // Title for the second slide
              description={dictionary.slider.slider2.description} // Description for the second slide
              darkMode={darkMode} // Passing dark mode prop
              containerBgColor={darkMode ? darkTheme.light_darkShade : color.darkPlum} // Setting background color for this card
              iconBgColor={darkMode ? darkTheme.darkShade : lightTheme.darkShade} // Setting icon background color
              iconName="brush" // Icon name for the second slide
              bannerSvgName="colorpalet" // SVG banner for the second slide
              useSvg={true} // Enable using an SVG banner
              showButton={true} // Show button for this card
              onPressButton={() => toggleDaltonianMode()} // Binds the toggle function to the button press
            />
          ),
        },
      ]}
      darkMode={darkMode} // Passing dark mode prop to the slider component
    />
  );
};

export default SliderDictionary; // Exporting the SliderDictionary component
