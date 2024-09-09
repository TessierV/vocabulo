// WordSuggestionsDisplay.js

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Paragraph, Subtitle } from '@/constants/StyledText';
import { SvgXml } from 'react-native-svg';
import { lightTheme, color } from '@/constants/Colors';

const DefineSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M54.172 12.209a6.052 6.052 0 0 0-4.391-1.693c-6.9.229-12.515 1.729-16.7 4.461a1.98 1.98 0 0 1-2.164 0c-4.182-2.731-9.8-4.231-16.7-4.46a6.024 6.024 0 0 0-4.39 1.693A5.948 5.948 0 0 0 8 16.519v26.053a5.957 5.957 0 0 0 5.776 5.991c6.1.2 11.176 1.55 15.091 4.023a5.907 5.907 0 0 0 6.268 0c3.913-2.473 8.99-3.826 15.089-4.023A5.957 5.957 0 0 0 56 42.572V16.519a5.948 5.948 0 0 0-1.828-4.31zM13.905 44.564A2 2 0 0 1 12 42.572V16.519a1.985 1.985 0 0 1 .61-1.436 2.011 2.011 0 0 1 1.408-.57h.068c6.156.2 11.083 1.487 14.644 3.811a5.916 5.916 0 0 0 1.27.613v29.689a34.536 34.536 0 0 0-16.095-4.062zM52 42.572a2 2 0 0 1-1.9 1.992A34.521 34.521 0 0 0 34 48.627V18.938a5.963 5.963 0 0 0 1.27-.613c3.561-2.324 8.488-3.607 14.643-3.811a1.965 1.965 0 0 1 1.477.569 1.985 1.985 0 0 1 .61 1.436z" fill="${color.neutralBlue}" opacity="1" data-original="${color.neutralBlue}"></path></g></svg>`;
const signSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="${color.lightPlum}" d="M13 2c-1.645 0-3 1.355-3 3v11.813l-.656-.688-.25-.219a2.968 2.968 0 0 0-4.188 0 2.968 2.968 0 0 0 0 4.188v.031l8.188 8.094.062.031.031.063a8.307 8.307 0 0 0 5 1.687h1.72a8.17 8.17 0 0 0 8.187-8.188V14c0-1.645-1.356-3-3-3-.426 0-.82.117-1.188.281C23.578 9.981 22.394 9 21 9c-.766 0-1.469.3-2 .781A2.984 2.984 0 0 0 17 9a2.95 2.95 0 0 0-1 .188V5c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v11h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2.094v-2c0-.555.445-1 1-1 .554 0 1 .445 1 1v7.813c0 3.464-2.723 6.187-6.188 6.187h-1.718c-1.465 0-2.731-.523-3.782-1.313l-8.093-8c-.446-.445-.446-.93 0-1.375s.93-.445 1.375 0L12 21.625V5c0-.555.445-1 1-1z" opacity="1" data-original="#000000"></path></g></svg>`;
const quoteSVG= `<svg id="Layer_2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2"><path d="m7.68 6.54c-3.68 0-6.68 3.03-6.68 6.75 0 2.53 1.37 4.8 3.54 5.96-.11 1.18-.6 3.69-2.61 4.24-.48.13-.79.59-.73 1.08s.46.87.96.88h.15c.98 0 6.36-.22 9.84-4.89 2.26-3.03 2.93-6.32 1.9-9.22-.86-2.87-3.42-4.8-6.37-4.8z"/><path d="m30.54 11.35c-.86-2.87-3.42-4.8-6.37-4.8-3.68 0-6.68 3.03-6.68 6.75 0 2.53 1.37 4.8 3.54 5.96-.11 1.18-.6 3.69-2.61 4.24-.48.13-.79.59-.73 1.08s.46.87.96.88h.15c.98 0 6.36-.22 9.84-4.89 2.26-3.03 2.93-6.32 1.9-9.22z"/></svg>`;

const grammaticalCategoryColors = {
  nom: '#94C1D7', // Blue
  "nom propre": '#528198', // Blue
  verbe: '#AC3939', // Red
  adjectif: '#93B97A', // Green
  adverbe: '#EADD8D', // Yellow
  pronom: '#9F92BC', // Violet
  préposition: '#847C4E', // Brown
  conjonction: '#DB9696', // Salmon
  déterminent: '#959693', // Gray
  autre: '#838079', // Yellow-green
};

const WordSuggestionsDisplay = ({ wordSuggestions, openVideoModal }) => {
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
    <View >
      <ScrollView horizontal style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {groupedWords.map(([word, suggestions], index) => (
            <View key={index} style={{ flex: 1, marginRight: 10 }}>
              <ScrollView style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'column' }}>
                 <View style={{width: '90%', alignSelf: 'center'}}>
                  {suggestions.length > 1 ? (
                    <Subtitle >
                      {`${suggestions.length} Suggestions : `}
                    </Subtitle>
                  ) : (
                    <Subtitle >Terme :</Subtitle>
                  )}
                  </View>
                  {suggestions.map((item, itemIndex) => (
                    <View key={itemIndex} style={{ padding: 20, backgroundColor: lightTheme.lightShade, margin: 8, borderRadius: 8, width: 320, minHeight: 250, justifyContent: 'space-between' }}>
                      <View style={{ textAlign: 'center' }}>
                        <Subtitle style={{ textAlign: 'center' }}>{item.mot}</Subtitle>
                        <Paragraph style={{ textAlign: 'center', fontSize: 13, color: grammaticalCategoryColors[item.grammatical_category] || grammaticalCategoryColors.Autre }}>
                          {item.grammatical_category}
                        </Paragraph>
                        <SvgXml style={{position: 'absolute', right:0, zIndex:0}} fill={grammaticalCategoryColors[item.grammatical_category]} xml={quoteSVG} width={18} height={18} />
                      </View>
                      <View style={{ height: 1, backgroundColor: color.neutral, marginHorizontal: 10 }}></View>
                      <View>
                        <Subtitle style={{ fontSize: 13, marginBottom: 5, color: grammaticalCategoryColors[item.grammatical_category] || grammaticalCategoryColors.Autre }}>Définition:</Subtitle>
                        <Paragraph style={{ fontSize: 14 }}>{item.definition}</Paragraph>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                        {item.signes.map((signe) => (
                          <React.Fragment key={signe.signe_id}>
                            {signe.url_def !== "Non spécifié" && (
                              <TouchableOpacity style={{
                                borderRadius: 5,
                                width: 130,
                                minHeight: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 10,
                                backgroundColor: lightTheme.darkShade,
                              }} onPress={() => openVideoModal(signe.url_def)}>
                                <SvgXml xml={DefineSVG} width={18} height={18} />
                                <Paragraph style={{ fontSize: 12, color: color.neutralBlue }}>Définition LSF</Paragraph>
                              </TouchableOpacity>
                            )}
                            {signe.url_sign !== "Non spécifié" && (
                              <TouchableOpacity style={{
                                borderRadius: 8,
                                width: 130,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                minHeight: 40,
                                backgroundColor: lightTheme.darkShade,
                              }} onPress={() => openVideoModal(signe.url_sign)}>
                                <SvgXml xml={signSVG} width={18} height={18} />
                                <Paragraph style={{ fontSize: 12, color: color.lightPlum }}>Signe</Paragraph>
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
    </View>
  );
};

export default WordSuggestionsDisplay;
