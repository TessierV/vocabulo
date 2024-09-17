import React from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { ContainerTitle, Paragraph, Subtitle } from '@/constants/StyledText';
import { SvgXml } from 'react-native-svg';
import { lightTheme, color, darkTheme, grammaticalCategoryColors } from '@/constants/Colors';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { dictionary } from '@/constants/texts';


const WordSuggestionsDisplay = ({ wordSuggestions, openVideoModal, loading, darkMode, colorSet }) => {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={darkMode ? color.darkPlum : color.darkBlue} />
      </View>
    );
  }

  if (wordSuggestions.length === 0) {
    return (
      <View style={styles.noSuggestionsContainer}>
        <Paragraph style={{ fontSize: 12, color: darkMode ? darkTheme.neutral : lightTheme.neutral }}>{dictionary.wordSuggestion.none}</Paragraph>
      </View>
    );
  }

  // Group words by their value
  const groupedSuggestions = wordSuggestions.reduce((acc, word) => {
    if (!acc[word.mot]) {
      acc[word.mot] = [];
    }
    acc[word.mot].push(word);
    return acc;
  }, {});

  const groupedWords = Object.entries(groupedSuggestions);

  return (
    <ScrollView horizontal style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {groupedWords.map(([word, suggestions], index) => (
          <View key={index} style={styles.wordGroup}>
            <ScrollView style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ alignSelf: 'center' }}>
                  {suggestions.length > 1 ? (
                    <Paragraph style={{ color: darkMode ? darkTheme.neutral : lightTheme.neutral }}>{`${suggestions.length}${dictionary.wordSuggestion.suggestion}`}</Paragraph>
                  ) : (
                    <Paragraph style={{ color: darkMode ? darkTheme.neutral : lightTheme.darkShade }}>{dictionary.wordSuggestion.therme}</Paragraph>
                  )}
                </View>
                {suggestions.map((item, itemIndex) => (
                  <View key={itemIndex} style={[styles.wordCard, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>
                    <View style={{ textAlign: 'center' }}>
                      <Subtitle style={{ textAlign: 'center', color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade }}>{item.mot}</Subtitle>
                      <Paragraph style={{ textAlign: 'center', fontSize: 14, color: colorSet[item.grammatical_category] || colorSet.autre }}>
                        {item.grammatical_category === 'déterminent' ? 'déterminant' : item.grammatical_category}
                      </Paragraph>
                      <View style={{ position: 'absolute', right: 0, zIndex: 0 }}>
                        <InterfaceSvg iconName="quote" fillColor={colorSet[item.grammatical_category]} width={24} height={24} />
                      </View>
                    </View>
                    <View style={{
                      height: 1,
                      backgroundColor: darkMode ? darkTheme.light_darkShade : color.neutral,
                      marginHorizontal: 10,
                    }}></View>
                    <View>
                      <Subtitle style={[styles.definitionTitle, { color: colorSet[item.grammatical_category] || colorSet.autre }]}>{dictionary.card.def}</Subtitle>
                      <Paragraph style={{ fontSize: 14, color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade }}>{item.definition}</Paragraph>
                    </View>
                    <View style={styles.buttonsContainer}>
                      {item.signes.map((signe) => (
                        <React.Fragment key={signe.signe_id}>
                          {signe.url_def !== 'Non spécifié' && (
                            <TouchableOpacity style={styles.videoButton} onPress={() => openVideoModal(signe.url_def)}>
                              <InterfaceSvg iconName="url_def" fillColor={color.neutralBlue} width={18} height={18} />
                              <Paragraph style={styles.videoButtonText}>{dictionary.card.url_def}</Paragraph>
                            </TouchableOpacity>
                          )}
                          {signe.url_sign !== 'Non spécifié' && (
                            <TouchableOpacity style={styles.videoButton} onPress={() => openVideoModal(signe.url_sign)}>
                              <InterfaceSvg iconName="url_sign" fillColor={color.neutralPlum} width={18} height={18} />
                              <Paragraph style={[styles.videoButtonText, { color: color.neutralPlum }]}>{dictionary.card.url_sign}</Paragraph>
                            </TouchableOpacity>
                          )}
                        </React.Fragment>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noSuggestionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  wordGroup: {
    flex: 1,
    marginRight: 10,
  },
  wordCard: {
    padding: 20,
    margin: 8,
    borderRadius: 8,
    width: 320,
    minHeight: 250,
    justifyContent: 'space-between',
  },
  definitionTitle: {
    fontSize: 13,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  videoButton: {
    borderRadius: 5,
    width: 130,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: lightTheme.darkShade,
  },
  videoButtonText: {
    fontSize: 12,
    color: color.neutralBlue,
  },
};

export default WordSuggestionsDisplay;

