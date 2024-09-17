// HintComponent.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Paragraph } from '@/constants/StyledText';
import { lightTheme, color } from '@/constants/Colors';
import InterfaceSvg from '@/SVG/InterfaceSvg';

const HintComponent = ({ showFirstHint, showSecondHint, url_def, url_sign, openHintModal }) => {
    return (
        <View style={styles.container}>
            {showFirstHint && (
                url_def === 'Non spécifié' && url_sign === 'Non spécifié' ? (
                    <>
                        <Feather style={styles.bannerInfo} name="key" size={15} color={lightTheme.light_darkShade} />
                        <Paragraph style={[styles.hintText, { color: lightTheme.light_darkShade, fontSize: 14 }]}>
                            Pas d'indice pour ce mot
                        </Paragraph>
                    </>
                ) : url_sign !== 'Non spécifié' && url_def === 'Non spécifié' ? (
                    <View style={[styles.hintButton, { borderColor: 'transparent' }]}>
                        <Feather style={styles.bannerInfo} name="key" size={15} color={lightTheme.light_darkShade} />
                        <Paragraph style={{ color: lightTheme.light_darkShade, fontSize: 12 }}>
                            Indice bientôt
                        </Paragraph>
                    </View>
                ) : url_def !== 'Non spécifié' && url_sign !== 'Non spécifié' ? (
                    <TouchableOpacity
                        style={[styles.hintButton, { borderColor: color.neutralBlue }]}
                        onPress={() => openHintModal(url_def)}
                    >
                        <InterfaceSvg iconName="url_def" fillColor={color.neutralBlue} width={18} height={18} />
                        <Paragraph style={{ color: color.neutralBlue, fontSize: 12 }}>
                            Définition LSF
                        </Paragraph>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.hintButton, { borderColor: color.neutralBlue }]}
                        onPress={() => openHintModal(url_def)}
                    >
                        <InterfaceSvg iconName="url_def" fillColor={color.neutralBlue} width={18} height={18} />
                        <Paragraph style={{ color: color.neutralBlue, borderColor: color.neutralBlue, fontSize: 12 }}>
                            Définition LSF
                        </Paragraph>
                    </TouchableOpacity>
                )
            )}
            {showSecondHint && url_sign !== 'Non spécifié' && (
                <TouchableOpacity
                    style={[styles.hintButton, { borderColor: color.darkPlum }]}
                    onPress={() => openHintModal(url_sign)}
                >
                    <InterfaceSvg iconName="url_sign" fillColor={color.darkPlum} width={18} height={18} />
                    <Paragraph style={{ color: color.darkPlum, fontSize: 12 }}>
                        Sign
                    </Paragraph>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
        gap: 10,
    },
    hintButton: {
        padding: 10,
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        alignSelf: 'center',
        borderWidth: 1,
        maxWidth: 230,
        minHeight: 40,
    },
    bannerInfo: {
        // Style pour l'icône clé si nécessaire
    },
    hintText: {
        // Style pour le texte des indices si nécessaire
    }
});

export default HintComponent;
