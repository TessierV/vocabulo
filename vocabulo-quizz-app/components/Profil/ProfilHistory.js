import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SvgXml } from 'react-native-svg';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { Paragraph, Subtitle } from '@/constants/StyledText';
import VideoModal from '@/components/Profil/VideoModal'; // Assuming you have VideoModal component
import LinearProgressBar from '@/components/Profil/LinearProgressBar'; // Assuming you have LinearProgressBar component
import { profil } from '@/constants/texts'; // Importing text constants

// Function to generate the circular progress SVG
const getCircularProgressSvg = (filteredCount, totalWords, gradient) => {
  const progress = (filteredCount / totalWords) * 100;
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return `
    <svg width="45" height="45" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%">
          <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${gradient[1]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradient[2]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="15" stroke="${lightTheme.dark_lightShade}" stroke-width="5" fill="none" />
      <circle cx="20" cy="20" r="15" stroke="url(#progress-gradient)" stroke-width="5" fill="none"
        stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" transform="rotate(-90 20 20)" />
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="6" fill="${lightTheme.light_darkShade}">
        ${filteredCount}/${totalWords}
      </text>
    </svg>
  `;
};

// Function to determine gradient colors based on views and correctRatio
const getGradientColors = (views, correctRatio) => {
  if (views <= 2) {
    return [color.neutral, color.neutral, color.neutral]; // Neutral color when views <= 2
  }

  if (views > 2) {
    if (correctRatio === 100) return [color.darkYellow, color.neutralYellow, color.lightYellow]; // Perfect score
    if (correctRatio > 85) return [color.darkGreen, color.neutralGreen, color.lightGreen]; // High score
    if (correctRatio >= 60 && correctRatio <= 85) return [color.darkBlue, color.neutralBlue, color.lightBlue]; // Decent score
    if (correctRatio >= 50 && correctRatio < 60) return [color.darkPlum, color.neutralPlum, color.lightPlum]; // Low score
    return [color.darkCoral, color.neutralCoral, color.lightCoral]; // Poor score
  }
};

// Function to determine the border color of a word container based on its views and correct ratio
const getBorderColor = (word) => {
  const views = word.times_seen;
  const correct = word.times_correct;

  if (views <= 2) return lightTheme.neutral;

  const correctRatio = (correct / views) * 100;

  if (correctRatio === 100) return color.neutralYellow;
  if (correctRatio > 85) return color.neutralGreen;
  if (correctRatio >= 60 && correctRatio <= 85) return color.neutralBlue;
  if (correctRatio >= 50 && correctRatio < 60) return color.neutralPlum;
  return color.neutralCoral;
};

// WordHistory Component
const WordHistory = ({
  filterType,
  setFilterType,
  currentWeek,
  currentMonth,
  today,
  previousWeek,
  nextWeek,
  previousMonth,
  nextMonth,
  oldestDate,
  formatWeek,
  filteredWords,
  darkMode,
}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  // Function to open video modal
  const openVideoModal = (url) => {
    setVideoUrl(url);
    setVideoModalVisible(true);
  };

  // Function to close video modal
  const closeModal = () => {
    setVideoModalVisible(false);
    setVideoUrl('');
  };

  return (
    <View style={{ backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade, width: '90%', alignSelf: "center" }}>
      {/* Filter Buttons */}
      <View style={styles.filterButtons}>
        <TouchableOpacity
          onPress={() => setFilterType('week')}
          style={[
            styles.button,
            filterType === 'week' && { backgroundColor: darkMode ? color.darkPlum : lightTheme.darkShade } // Change background when selected
          ]}
        >
          <InterfaceSvg
            iconName="calendarWeek"
            height={21}
            width={21}
            fillColor={filterType === 'week' ? (darkMode ? darkTheme.lightShade : lightTheme.dark_lightShade) : (darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade)}
          />
          <Paragraph
            style={[
              styles.buttonText,
              filterType === 'week'
                ? { color: darkMode ? darkTheme.lightShade : lightTheme.lightShade }  // Text color when selected
                : { color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade }  // Text color when not selected
            ]}
          >
            {profil.section3.section.col1}
          </Paragraph>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterType('month')}
          style={[
            styles.button,
            filterType === 'month' && { backgroundColor: darkMode ? color.darkPlum : lightTheme.darkShade } // Change background when selected
          ]}
        >
          <InterfaceSvg
            iconName="calendarMonths"
            height={21}
            width={21}
            fillColor={filterType === 'month' ? (darkMode ? darkTheme.lightShade : lightTheme.dark_lightShade) : (darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade)}
          />
          <Paragraph
            style={[
              styles.buttonText,
              filterType === 'month'
                ? { color: darkMode ? darkTheme.lightShade : lightTheme.lightShade }  // Text color when selected
                : { color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade }  // Text color when not selected
            ]}
          >
            {profil.section3.section.col2}
          </Paragraph>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        {filterType === 'week' ? (
          currentWeek > oldestDate ? (
            <TouchableOpacity onPress={previousWeek}>
              <InterfaceSvg iconName="arrowLeft" height={21} width={21} fillColor={lightTheme.neutral} />
            </TouchableOpacity>
          ) : null
        ) : (
          currentMonth > oldestDate ? (
            <TouchableOpacity onPress={previousMonth}>
              <InterfaceSvg iconName="arrowLeft" height={21} width={21} fillColor={lightTheme.neutral} />
            </TouchableOpacity>
          ) : null
        )}

        <Paragraph style={[styles.currentPeriod, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>
          {filterType === 'week'
            ? formatWeek(currentWeek)
            : currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </Paragraph>

        {filterType === 'week' ? (
          currentWeek < today ? (
            <TouchableOpacity onPress={nextWeek}>
              <InterfaceSvg iconName="arrowRight" height={21} width={21} fillColor={lightTheme.neutral} />
            </TouchableOpacity>
          ) : null
        ) : (
          currentMonth < today ? (
            <TouchableOpacity onPress={nextMonth}>
              <InterfaceSvg iconName="arrowRight" height={21} width={21} fillColor={lightTheme.neutral} />
            </TouchableOpacity>
          ) : null
        )}
      </View>

      {/* Progress Bar */}
      <LinearProgressBar filteredWords={filteredWords} darkMode={darkMode} />

      {/* Word List */}
      {filteredWords.length > 0 ? (
        filteredWords.map((word, index) => {
          const correctRatio = (word.times_correct / word.times_seen) * 100;
          const gradient = getGradientColors(word.times_seen, correctRatio);

          return (
            <View key={index} style={[styles.wordContainer, { padding: 10, borderColor: getBorderColor(word), backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade, borderWidth: 2, gap: 20 }]}>
              <View style={{ gap: 5, flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                <View style={styles.circularProgressContainer}>
                  <SvgXml xml={getCircularProgressSvg(word.times_correct, word.times_seen, gradient)} />
                </View>
                <View>
                  <Subtitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }}>{word.mot}</Subtitle>
                  <Paragraph style={{ fontSize: 13, color: getBorderColor(word) }}>
                    {new Date(word.last_seen).toLocaleDateString()}
                  </Paragraph>
                </View>
              </View>

              <View style={{ height: 1, backgroundColor: color.neutral, marginHorizontal: 10 }}></View>

              <View>
                <Subtitle style={{ fontSize: 13, textAlign: 'center', marginBottom: 5, color: getBorderColor(word) }}>{profil.section3.section.definition}</Subtitle>
                <Paragraph style={{ color: darkMode ? darkTheme.lightShade : lightTheme.darkShade, fontSize: 14, textAlign: 'center', textTransform: 'capitalize' }}>{word.definition}</Paragraph>
              </View>

              <View>
                <View style={styles.videoButtonsContainer}>
                  {word.url_def !== 'Non spécifié' && (
                    <TouchableOpacity
                      style={[styles.hintButton, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade, borderColor: color.neutralBlue }]}
                      onPress={() => openVideoModal(word.url_def)}
                    >
                      <InterfaceSvg iconName="url_def" fillColor={color.neutralBlue} width={18} height={18} />
                      <Paragraph style={{ color: color.neutralBlue, fontSize: 12 }}>{profil.section3.section.urldef}</Paragraph>
                    </TouchableOpacity>
                  )}

                  {word.url_sign !== 'Non spécifié' && (
                    <TouchableOpacity
                      style={[styles.hintButton, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade, borderColor: color.darkPlum }]}
                      onPress={() => openVideoModal(word.url_sign)}
                    >
                      <InterfaceSvg iconName="url_sign" fillColor={color.darkPlum} width={18} height={18} />
                      <Paragraph style={{ color: color.darkPlum, fontSize: 12 }}>{profil.section3.section.urlsign}</Paragraph>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', alignSelf: 'center', alignContent: 'center', marginTop: 50 }}>
          <InterfaceSvg iconName="hybrid" height={21} width={21} fillColor={darkMode ? darkTheme.neutral : lightTheme.neutral} />
          <Paragraph style={[styles.title, { color: darkMode ? darkTheme.neutral : lightTheme.neutral }]}>{profil.section3.section.error}</Paragraph>
        </View>
      )}

      {/* Video Modal Component */}
      <VideoModal
        closeModal={closeModal}
        videoUrl={videoUrl}
        modalVisible={videoModalVisible}
        darkMode={lightTheme.darkMode}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.neutral,
    borderRadius: 50,
    marginVertical: 10,
  },
  button: {
    padding: 10,
    width: '50%',
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPeriod: {
    fontSize: 14,
    color: lightTheme.light_darkShade,
  },
  wordContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  circularProgressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    maxWidth: 150,
    minHeight: 40,
  },
  videoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 10,
  },
});

export default WordHistory;
