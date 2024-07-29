import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AnnonceTitle } from '@/constants/StyledText';
import { Feather } from '@expo/vector-icons';

const WeeklyOverview = ({ darkMode }) => {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Get current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const today = new Date().getDay();

  // Custom mapping: 1 for Monday to 7 for Sunday
  const todayIndex = today === 0 ? 6 : today - 1; // 0 (Sunday) => 6, 1 (Monday) => 0, ..., 6 (Saturday) => 5

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <AnnonceTitle style={{ color: darkMode ? 'white' : 'black' }}>Semainier</AnnonceTitle>
        <Text style={styles.infoIcon}>i</Text>
      </View>
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          let backgroundColor = darkMode ? 'gray' : 'lightgray';
          let borderStyle = styles.futureBorder; // Default style for future days
          let iconName = 'moon'; // Default icon for future days

          if (index === todayIndex) {
            backgroundColor = 'orange'; // Current day
            borderStyle = styles.currentBorder; // Transparent border
            iconName = 'sun'; // Icon for today
          } else if (index < todayIndex) {
            backgroundColor = 'gray'; // Past days
            borderStyle = styles.pastBorder; // Solid border
            iconName = 'heart'; // Icon for past days
          }

          return (
            <View key={index} style={[styles.card, { backgroundColor }, borderStyle]}>
              <Text style={styles.cardText}>{day}</Text>
              <Feather name={iconName} size={18} color="#fff" style={styles.icon} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'pink',
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    fontWeight: 'bold',
    color: '#000',
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    width: 20,
    height: 20,
    lineHeight: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    height: 70,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 10,
  },
  futureBorder: {
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'dashed',
  },
  currentBorder: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pastBorder: {
    borderWidth: 1,
    borderColor: 'pink',
    borderStyle: 'solid',
  },
});

export default WeeklyOverview;
