import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { ContainerTitle } from '@/constants/StyledText';

const Section = ({ mot, categorie_grammaticale, items, iconName, darkMode }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  // Toggle the expanded state and start the animation
  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  // Interpolate the animation value to control the maxHeight of the expanded content
  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000], // Adjust the maximum height according to your content
  });

  // Generate suggestion text based on the item index
  const getSuggestionText = (index) => {
    const count = items.length;
    if (count === 1) {
      return index === 0 ? 'Therme' : '';
    } else {
      return `Suggestion ${index + 1}`;
    }
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={toggleExpand} style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Feather name={iconName} style={styles.icon} size={18} color={darkMode ? darkTheme.light_darkShade : lightTheme.lightShade} />
          <ContainerTitle style={[styles.sectionTitle, { color: darkMode ? darkTheme.lightShade : lightTheme.lightShade }]}>
            {mot}
          </ContainerTitle>
          <ContainerTitle style={[styles.sectionTitle, { color: darkMode ? darkTheme.lightShade : lightTheme.lightShade }]}>
            {categorie_grammaticale}
          </ContainerTitle>
        </View>
        <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={darkMode ? darkTheme.lightShade : lightTheme.lightShade} />
      </TouchableOpacity>
      <Animated.View style={[styles.sectionContent, { maxHeight }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {items.map((item, index) => (
            <View key={index} style={[styles.itemContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>
              <Text style={[styles.suggestionText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                {getSuggestionText(index)}
              </Text>
              <Text style={[styles.text, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                Definition: {item.definition}
              </Text>
              <Text style={[styles.text, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                Video URL Definition: {item.url_video_definition}
              </Text>
              <Text style={[styles.text, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                Video URL Word: {item.url_video_mot}
              </Text>
              <Text style={[styles.text, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
                Source URL: {item.url_source}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: lightTheme.darkShade,
    borderRadius: 10,
    padding: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 12,
  },
  sectionContent: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Section;
