import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/Header/Header';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import ProfilConnexion from '@/components/Profil/ProfilConnexion';
import WordHistory from '@/components/Profil/ProfilHistory';
import SliderProfil from '@/components/Profil/SliderProfil';
import HorizontalProgressBar from '@/components/Profil/HorizontalProgressBar';
import TotalWordsProgressBar from '@/components/Profil/TotalWordsProgressBar';
import SectionTitle from '@/components/General/SectionTitle';
import { profil } from '@/constants/texts';


const ProfileScreen = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [userInfo, setUserInfo] = useState(null);
  const [wordHistory, setWordHistory] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [filterType, setFilterType] = useState('week');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [maxStreak, setMaxStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalDaysOnline, setTotalDaysOnline] = useState(0);

  const today = new Date();

  const oldestDate = wordHistory.length > 0 ? new Date(Math.min(...wordHistory.map(word => new Date(word.last_seen)))) : new Date('2024-01-01');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = '01952a09-d04c-47fe-879c-51f19e167541';
        const response = await fetch(`http://192.168.0.12:3000/api/authentication/${userId}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur lors de la récupération des informations utilisateur: ${errorText}`);
        }

        const data = await response.json();

        setUserInfo(data.user);
        setWordHistory(data.word_history);
        calculateStreaks(data.word_history);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        setErrorMessage('Erreur lors de la récupération des informations utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (filterType === 'week') {
      setFilteredWords(filterByWeek(wordHistory, currentWeek));
    } else {
      setFilteredWords(filterByMonth(wordHistory, currentMonth));
    }
  }, [wordHistory, filterType, currentWeek, currentMonth]);

  const calculateStreaks = (history) => {
    const uniqueDates = [...new Set(history.map(word => new Date(word.last_seen).toDateString()))].map(date => new Date(date).getTime());
    uniqueDates.sort((a, b) => a - b);

    let currentStreakCount = 1;
    let maxStreakCount = 1;
    let totalDays = uniqueDates.length;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDay = uniqueDates[i - 1];
      const currentDay = uniqueDates[i];

      if (currentDay - prevDay === 86400000) {
        currentStreakCount++;
      } else {
        maxStreakCount = Math.max(maxStreakCount, currentStreakCount);
        currentStreakCount = 1;
      }
    }

    maxStreakCount = Math.max(maxStreakCount, currentStreakCount);
    const lastLoginDate = new Date(uniqueDates[uniqueDates.length - 1]);
    const differenceFromToday = Math.ceil((today - lastLoginDate) / 86400000);

    setCurrentStreak(differenceFromToday === 0 ? currentStreakCount : 0);
    setMaxStreak(maxStreakCount);
    setTotalDaysOnline(totalDays);
  };

  const filterByWeek = (words, weekStartDate) => {
    const startOfWeek = new Date(weekStartDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return words.filter(word => {
      const lastSeen = new Date(word.last_seen);
      return lastSeen >= startOfWeek && lastSeen <= endOfWeek;
    });
  };

  const filterByMonth = (words, monthStartDate) => {
    const startOfMonth = new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), 1);
    const endOfMonth = new Date(monthStartDate.getFullYear(), monthStartDate.getMonth() + 1, 0);

    return words.filter(word => {
      const lastSeen = new Date(word.last_seen);
      return lastSeen >= startOfMonth && lastSeen <= endOfMonth;
    });
  };

  const previousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    if (prevWeek >= oldestDate) {
      setCurrentWeek(prevWeek);
    }
  };

  const nextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    if (nextWeek <= today) {
      setCurrentWeek(nextWeek);
    }
  };

  const previousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    if (prevMonth >= oldestDate) {
      setCurrentMonth(prevMonth);
    }
  };

  const nextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    if (nextMonth <= today) {
      setCurrentMonth(nextMonth);
    }
  };

  const formatWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return `${startOfWeek.toLocaleDateString()} au ${endOfWeek.toLocaleDateString()}`;
  };

  const getBorderColor = (word) => {
    const views = word.times_seen;
    const correct = word.times_correct;

    if (views <= 2) return color.neutral;

    if (views > 2) {
      const correctRatio = (correct / views) * 100;

      if (correctRatio == 100) return '#FAF2CB';
      if (correctRatio > 85) return color.lightGreen;
      if (correctRatio >= 60 && correctRatio <= 85) return color.lightBlue;
      if (correctRatio >= 50 && correctRatio < 60) return color.lightPlum;
      return color.lightCoral;
    }
    return 'transparent';
  };

  if (loading) return <Text>Chargement...</Text>;
  if (errorMessage) return <Text>{errorMessage}</Text>;

  return (
    <View style={[styles.mainContainer, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade, }]}>
      <Header darkMode={darkMode} PageTitle={profil.header.title} firstLink="/home" secondLink="/parameter" />
      <ScrollView style={{ width: '100%',}}>
      <SliderProfil filterType={filterType} darkMode={darkMode} userInfo={userInfo} />

        <View style={styles.container}>
          <SectionTitle
            title={profil.section.title}
            darkMode={darkMode}
            showTextAndIcon={false}
          />
          <TotalWordsProgressBar filteredWords={wordHistory} darkMode={darkMode} />
        </View>

        <View style={styles.container}>
          <SectionTitle
            title={profil.section2.title}
            darkMode={darkMode}
            showTextAndIcon={false}
          />
          <ProfilConnexion maxStreak={maxStreak} currentStreak={currentStreak} totalDaysOnline={totalDaysOnline} darkMode={darkMode} />
        </View>

        <View style={[styles.container, { marginTop: 5 }]}>
          <SectionTitle
            title={profil.section3.title}
            text={profil.section3.subheader}
            iconName="info"
            popupTitle={profil.section3.popup.title}
            popupText={profil.section3.popup.description}
            popupButtonText={profil.section3.popup.button}
            darkMode={darkMode}
          />
          <HorizontalProgressBar filteredWords={filteredWords} darkMode={darkMode} />
        </View>
        <WordHistory
          filterType={filterType}
          setFilterType={setFilterType}
          currentWeek={currentWeek}
          currentMonth={currentMonth}
          today={today}
          previousWeek={previousWeek}
          nextWeek={nextWeek}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          oldestDate={oldestDate}
          formatWeek={formatWeek}
          filteredWords={filteredWords}
          getBorderColor={getBorderColor}
          darkMode={darkMode}
        />
        <View style={{marginBottom: 200}}></View>

        {/* User Info Section */}
        {/*
          <View style={styles.section}>
          <Text style={styles.title}>Informations utilisateur</Text>
          {userInfo ? (
            <View style={styles.userInfoContainer}>
              <Text>Pseudo: {userInfo.pseudo}</Text>
              <Text>User ID: {userInfo.user_id}</Text>
              <Text>Password: {userInfo.password}</Text>
              <Text>Date: {new Date(userInfo.date).toLocaleDateString()}</Text>
              <Text>Quiz ID: {userInfo.quiz_id ? userInfo.quiz_id : 'Aucun'}</Text>
              <Text>Token ID: {userInfo.token_id}</Text>
            </View>
          ) : (
            <Text>Aucune information utilisateur trouvée</Text>
            </View>
          )}*/}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  section: {
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  wordContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
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
});

export default ProfileScreen;
