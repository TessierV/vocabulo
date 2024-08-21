import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GradientBackgroundButton } from '@/components/Button';

const Footer = ({ validateAnswer, darkMode }) => {
    return (
        <View style={styles.footer}>
            <GradientBackgroundButton
                text="Valider"
                textColor={darkMode ? 'dark' : 'light'}
                onPress={validateAnswer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default Footer;
