import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
  getBorderColor
}) => {
  return (
    <View>
      <Text style={styles.title}>Historique des mots</Text>

      <View style={styles.filterButtons}>
        <TouchableOpacity onPress={() => setFilterType('week')} style={[styles.button, filterType === 'week' && styles.activeButton]}>
          <Text style={styles.buttonText}>Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType('month')} style={[styles.button, filterType === 'month' && styles.activeButton]}>
          <Text style={styles.buttonText}>Mois</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationButtons}>
        {filterType === 'week' ? (
          currentWeek > oldestDate ? (
            <TouchableOpacity onPress={previousWeek}>
              <Text style={styles.navText}>{"<"}</Text>
            </TouchableOpacity>
          ) : null
        ) : (
          currentMonth > oldestDate ? (
            <TouchableOpacity onPress={previousMonth}>
              <Text style={styles.navText}>{"<"}</Text>
            </TouchableOpacity>
          ) : null
        )}

        <Text style={styles.currentPeriod}>
          {filterType === 'week' ? formatWeek(currentWeek) : currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </Text>

        {filterType === 'week' ? (
          currentWeek < today ? (
            <TouchableOpacity onPress={nextWeek}>
              <Text style={styles.navText}>{">"}</Text>
            </TouchableOpacity>
          ) : null
        ) : (
          currentMonth < today ? (
            <TouchableOpacity onPress={nextMonth}>
              <Text style={styles.navText}>{">"}</Text>
            </TouchableOpacity>
          ) : null
        )}
      </View>

      {filteredWords.length > 0 ? (
        filteredWords.map((word, index) => (
          <View key={index} style={[styles.wordContainer, { borderColor: getBorderColor(word), borderWidth: 1 }]}>
            <Text>Mot: {word.mot}</Text>
            <Text>Définition: {word.definition}</Text>
            <Text>Dernière vue: {new Date(word.last_seen).toLocaleDateString()}</Text>
            <Text>Vues: {word.times_seen}</Text>
            <Text>Correctes: {word.times_correct}</Text>
            <Text>URL Signe: {word.url_sign}</Text>
            <Text>URL Définition: {word.url_def}</Text>
          </View>
        ))
      ) : (
        <Text>Aucun historique de mots trouvé</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  currentPeriod: {
    fontSize: 18,
  },
  wordContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default WordHistory;
