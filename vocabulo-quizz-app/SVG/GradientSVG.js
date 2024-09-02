import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const GradientSVG = ({ colors }) => {
    return (
        <Svg height="100%" width="100%">
            <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    {colors.map((color, index) => (
                        <Stop
                            key={index}
                            offset={`${index * (100 / (colors.length - 1))}%`}
                            stopColor={color}
                            stopOpacity="1"
                        />
                    ))}
                </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
    );
};

export default GradientSVG;
