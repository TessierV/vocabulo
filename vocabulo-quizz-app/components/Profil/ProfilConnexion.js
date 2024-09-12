import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilConnexion = ({ maxStreak, currentStreak, totalDaysOnline }) => {
  return (
    <View>
      <Text style={styles.title}>Connexion</Text>
      <View style={styles.streakContainer}>
        <View style={styles.streakColumn}>
          <Text style={styles.streakTitle}>Max jours d'affilée</Text>
          <Text style={styles.streakValue}>{maxStreak}</Text>
        </View>
        <View style={styles.streakColumn}>
          <Text style={styles.streakTitle}>Jours d'affilée actuels</Text>
          <Text style={styles.streakValue}>{currentStreak}</Text>
        </View>
        <View style={styles.streakColumn}>
          <Text style={styles.streakTitle}>Jours en ligne</Text>
          <Text style={styles.streakValue}>{totalDaysOnline}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  streakColumn: {
    alignItems: 'center',
  },
  streakTitle: {
    fontSize: 8,
  },
  streakValue: {
    fontSize: 24,
    color: '#007AFF',
  },
});

export default ProfilConnexion;
