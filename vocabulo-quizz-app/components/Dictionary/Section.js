import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { ContainerParagraph, ContainerTitle, Paragraph, Subtitle } from '@/constants/StyledText';
import VideoModal from '@/components/Dictionary/VideoModal';
import { SvgXml } from 'react-native-svg';

const Section = ({ mot, categorie_grammaticale, items, iconName, darkMode }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  // SVG for a simple circle
  const DefineSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M54.172 12.209a6.052 6.052 0 0 0-4.391-1.693c-6.9.229-12.515 1.729-16.7 4.461a1.98 1.98 0 0 1-2.164 0c-4.182-2.731-9.8-4.231-16.7-4.46a6.024 6.024 0 0 0-4.39 1.693A5.948 5.948 0 0 0 8 16.519v26.053a5.957 5.957 0 0 0 5.776 5.991c6.1.2 11.176 1.55 15.091 4.023a5.907 5.907 0 0 0 6.268 0c3.913-2.473 8.99-3.826 15.089-4.023A5.957 5.957 0 0 0 56 42.572V16.519a5.948 5.948 0 0 0-1.828-4.31zM13.905 44.564A2 2 0 0 1 12 42.572V16.519a1.985 1.985 0 0 1 .61-1.436 2.011 2.011 0 0 1 1.408-.57h.068c6.156.2 11.083 1.487 14.644 3.811a5.916 5.916 0 0 0 1.27.613v29.689a34.536 34.536 0 0 0-16.095-4.062zM52 42.572a2 2 0 0 1-1.9 1.992A34.521 34.521 0 0 0 34 48.627V18.938a5.963 5.963 0 0 0 1.27-.613c3.561-2.324 8.488-3.607 14.643-3.811a1.965 1.965 0 0 1 1.477.569 1.985 1.985 0 0 1 .61 1.436z" fill="${color.neutralBlue}" opacity="1" data-original="${color.neutralBlue}"></path></g></svg>`;
  const signSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="${color.lightPlum}" d="M13 2c-1.645 0-3 1.355-3 3v11.813l-.656-.688-.25-.219a2.968 2.968 0 0 0-4.188 0 2.968 2.968 0 0 0 0 4.188v.031l8.188 8.094.062.031.031.063a8.307 8.307 0 0 0 5 1.687h1.72a8.17 8.17 0 0 0 8.187-8.188V14c0-1.645-1.356-3-3-3-.426 0-.82.117-1.188.281C23.578 9.981 22.394 9 21 9c-.766 0-1.469.3-2 .781A2.984 2.984 0 0 0 17 9a2.95 2.95 0 0 0-1 .188V5c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v11h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2.094v-2c0-.555.445-1 1-1 .554 0 1 .445 1 1v7.813c0 3.464-2.723 6.187-6.188 6.187h-1.718c-1.465 0-2.731-.523-3.782-1.313l-8.093-8c-.446-.445-.446-.93 0-1.375s.93-.445 1.375 0L12 21.625V5c0-.555.445-1 1-1z" opacity="1" data-original="#000000"></path></g></svg>`;
  const sourceSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M16 3a13 13 0 1 0 13 13A13.015 13.015 0 0 0 16 3zm9.786 8h-4.217a16.027 16.027 0 0 0-1.855-5.341A11.048 11.048 0 0 1 25.786 11zM20 16a26.721 26.721 0 0 1-.17 3h-7.66a26.556 26.556 0 0 1 0-6h7.66a26.721 26.721 0 0 1 .17 3zm-4 11c-1.34 0-2.788-2.375-3.519-6h7.038c-.731 3.625-2.179 6-3.519 6zm-3.519-16C13.212 7.375 14.66 5 16 5s2.788 2.375 3.519 6zm-.2-5.341A16.027 16.027 0 0 0 10.431 11H6.214a11.048 11.048 0 0 1 6.072-5.341zM5.426 13h4.727a29.488 29.488 0 0 0 0 6H5.426a10.776 10.776 0 0 1 0-6zm.788 8h4.217a16.027 16.027 0 0 0 1.855 5.341A11.048 11.048 0 0 1 6.214 21zm13.5 5.341A16.027 16.027 0 0 0 21.569 21h4.217a11.048 11.048 0 0 1-6.072 5.341zM26.574 19h-4.727A29.773 29.773 0 0 0 22 16a29.773 29.773 0 0 0-.153-3h4.727a10.776 10.776 0 0 1 0 6z" data-name="Layer 51" fill="#CCC" opacity="1" data-original="#000000"></path></g></svg>`;

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2000],
  });

  const renderItem = ({ item, index }) => {
    const prefix = items.length > 1 ? `${index + 1}. Suggestions ` : 'Terme';

    const videoDefinitionUrl = item.url_video_definition !== 'Non spécifié' ? item.url_video_definition : '';
    const videoMotUrl = item.url_video_mot !== 'Non spécifié' ? item.url_video_mot : '';

    return (
      <View style={[styles.itemContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>
        <Subtitle style={[styles.suggestionText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
          {prefix}:
        </Subtitle>
        <Paragraph style={[styles.suggestionText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
          Définition:
        </Paragraph>
        <ContainerParagraph style={[{ color: darkMode ? darkTheme.lightShade : lightTheme.light_darkShade }]}>
          {item.definition}
        </ContainerParagraph>
        <View style={[styles.buttonContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>

          {videoDefinitionUrl ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleVideoPress(videoDefinitionUrl)}
            >
              <SvgXml xml={DefineSVG} width={18} height={18} />
              <Text style={[styles.buttonText, styles.definitionText]}>Définition LSF</Text>
            </TouchableOpacity>
          ) : null}
          {videoMotUrl ? (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => handleVideoPress(videoMotUrl)}
            >
              <SvgXml xml={signSVG} width={18} height={18} />
              <Text style={[styles.buttonText, styles.signText]}>Signe</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.sourceButton]}
          href={item.url_source}
        >
          <SvgXml xml={sourceSVG} width={18} height={18} />
          <Text style={[styles.buttonText, styles.sourceText]}>Source URL</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleVideoPress = (url) => {
    setCurrentVideoUrl(url);
    setModalVisible(true);
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
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      </Animated.View>
      <VideoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        videoUrl={currentVideoUrl}
        mot={mot}

      />
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
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 30,
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
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: lightTheme.darkShade,
  },
  signText: {
    color: color.lightPlum,
  },

  definitionText: {
    color: color.neutralBlue,
  },

  sourceButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    borderTopWidth: 1,
    borderTopColor: lightTheme.dark_lightShade,
    paddingTop: 10,
  },

  sourceText: {
    color: '#C6C6C6',
  },
});

export default Section;
