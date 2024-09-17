import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import BigSlider from '@/components/Slider/BigSlider';
import BigReusableCard from '@/components/Slider/card/BigReusableCard';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { parameters } from '@/constants/texts';

const SliderParameters = ({ darkMode, setSliderModalVisible }) => {
    // Function to open external links
    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            <BigSlider
                data={[
                    {
                        key: '1', component:
                            <BigReusableCard
                                title={parameters.slider.slider1.title}
                                description={parameters.slider.slider1.description}
                                buttonText={parameters.slider.slider1.button}
                                onPressButton={() => setSliderModalVisible(true)}
                                darkMode={darkMode}
                                iconName="rotate"
                                iconBgColor={darkTheme.darkShade}
                                bannerSvgName="monitor"
                                useSvg={true}
                            />
                    },
                    {
                        key: '2', component:
                            <BigReusableCard
                                title={parameters.slider.slider2.title}
                                description={parameters.slider.slider2.description}
                                buttonText={parameters.slider.slider2.button}
                                onPressButton={() => openURL('https://dico.elix-lsf.fr/')} // Open Elix dictionary
                                darkMode={darkMode}
                                containerBgColor="#F1C400"
                                iconName="source"
                                iconBgColor={darkTheme.darkShade}
                                bannerSvgName="thankyou"
                                useSvg={true}
                            />
                    },
                    {
                        key: '3', component:
                            <BigReusableCard
                                title={parameters.slider.slider3.title}
                                description={parameters.slider.slider3.description}
                                buttonText={parameters.slider.slider3.button}
                                onPressButton={() => openURL('https://www.irsa.fr/')} // Open IRSA website
                                darkMode={darkMode}
                                containerBgColor="#14597E"
                                iconName="source"
                                iconBgColor={darkTheme.darkShade}
                                bannerSvgName="thankyou"
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

export default SliderParameters;
