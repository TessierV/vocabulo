// DailyGoals.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnnonceTitle } from '@/constants/StyledText';

const DailyGoals = ({ darkMode }) => {
  // Categories and their respective completion statuses
  const goals = [
    { label: 'Finis', completed: 7, total: 12 },
    { label: 'Facile', completed: 2, total: 4 },
    { label: 'Moyen', completed: 3, total: 4 },
    { label: 'Difficile', completed: 1, total: 4 },
  ];

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <AnnonceTitle style={{ color: darkMode ? 'white' : 'black' }}>Objectifs du jour</AnnonceTitle>
        <Text style={styles.infoIcon}>i</Text>
      </View>
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalCard}>
            <Text style={styles.goalLabel}>{goal.label}</Text>
            <Text style={styles.goalStatus}>{goal.completed}/{goal.total}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'yellow',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoIcon: {
    fontWeight: 'bold',
    color: '#000',
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    width: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,

  },
  goalCard: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  goalStatus: {
    fontSize: 12,
    color: '#333',
  },
});

export default DailyGoals;
