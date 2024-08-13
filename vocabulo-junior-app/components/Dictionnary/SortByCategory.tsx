import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';

type Category = string;

const ByCategory = 'Verbe/Adverbe/Adjectif/Nom/Sujet'.split('/');

export default function SortByCategory() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handlePress = (category: Category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                style={styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {ByCategory.map((item) => {
                        const isSelected = item === selectedCategory;
                        return (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handlePress(item)}
                                style={[styles.button, isSelected && styles.selectedButton]}
                            >
                                <InformationText style={styles.buttonText}>
                                    {item}
                                </InformationText>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        width: '90%',
        height: 40,
        marginHorizontal: 'auto',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.white,
        paddingHorizontal: 30,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        margin: 3,
    },
    selectedButton: {
        backgroundColor: Colors.lightCoral,
    },
    buttonText: {
        color: Colors.black,
    },
});
