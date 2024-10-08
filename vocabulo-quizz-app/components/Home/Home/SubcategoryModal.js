// SubcategoryModal.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SvgIcon from '@/SVG/CategorySvgIcon';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { Paragraph } from '@/constants/StyledText';

const SubcategoryModal = ({ subcategory, darkMode }) => {
    if (!subcategory || !Array.isArray(subcategory.words)) {
        console.error('Invalid subcategory prop:', subcategory);
        return <Paragraph>Aucun mot disponible</Paragraph>;
    }

    console.log('SubcategoryModal Subcategory:', subcategory);

    return (
        <View style={styles.container}>
            <View style={[styles.subcategoryDetailContainer, {          borderColor: darkMode ? darkTheme.light_darkShade : color.neutral,}]}>
            <View style={styles.categoryRowIcon}>
                <SvgIcon icon={subcategory.subcategory_name} fillColor="pink" width="25" height="25"/>
                <Paragraph style={styles.recapTitle}>
                    {subcategory.subcategory_name}
                </Paragraph>
                </View>
                <Paragraph style={styles.recapCount}>
                    {subcategory.countSelected} / {subcategory.wordCount} mots
                </Paragraph>

                {/* Uncomment the following section to display the list of words */}
                {/* {subcategory.words.map((word) => (
                    <View key={word.mot_id} style={styles.wordItemContainer}>
                        <Text style={styles.word}>{word.mot}</Text>
                        <Text style={styles.definition}>{word.definition}</Text>
                        {word.signes && word.signes.map((signe, index) => (
                            <View key={index}>
                                <Text>Sign URL: {signe.url_sign || 'Non spécifié'}</Text>
                                <Text>Definition URL: {signe.url_def || 'Non spécifié'}</Text>
                            </View>
                        ))}
                    </View>
                ))} */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
    subcategoryDetailContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 8,
          borderWidth: 1,
    },
    categoryRowIcon: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 10,
  },
  recapTitle: {
    color: lightTheme.light_darkShade,
    fontSize: 12,
},

// Filter
recapCount: {
    fontSize: 12,
    color: lightTheme.light_darkShade,
},
    wordItemContainer: {
        marginBottom: 10,
    },
    word: {
        fontSize: 16,
    },
    definition: {
        fontSize: 14,
    },
});

export default SubcategoryModal;
