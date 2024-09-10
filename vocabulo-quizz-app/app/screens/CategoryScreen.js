import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Button, ActivityIndicator, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import useDarkMode from '@/components/useDarkMode';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import Header from '@/components/Header/Header';
import SvgDifficulty from '@/SVG/DifficultySvgIcon'; // Import your SVG component
import { SvgXml } from 'react-native-svg';
import SvgIcon from '@/SVG/CategorySvgIcon';
import GradientSVG from '@/SVG/GradientSVG';
import { Paragraph, Subtitle, BigTitle, ContainerParagraph } from '@/constants/StyledText';
import RadarEffect from '@/components/RadarEffect';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


import Slider from '@/components/Slider/Slider';
import ReusableCard from '@/components/Game/ReusableCard';

import imgSection from '@/assets/images/icon_transparent.png'; // Import d'une autre image locale
import bgImage from '@/assets/images/seatree.png';
const svgBanner = `
<svg height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg"><g id="_30-Bed" data-name="30-Bed"><path d="m63 34v10h-3v-6a4 4 0 0 0 -4-4h-48a4 4 0 0 0 -4 4v6h-3v-10a4 4 0 0 1 4-4h54a3.995 3.995 0 0 1 4 4z" fill="#75806d"/><path d="m58 48-1 4h-2l-1-4z" fill="#70695b"/><path d="m15 34h34v6h-34z" fill="#6b411c"/><path d="m10 48-1 4h-2l-1-4z" fill="#70695b"/><rect fill="#75806d" height="10" rx="2" width="16" x="14" y="20"/><rect fill="#75806d" height="10" rx="2" width="16" x="34" y="20"/><path d="m14 28a2.006 2.006 0 0 0 2 2h-7v-14h46v14h-7a2.006 2.006 0 0 0 2-2v-6a2.006 2.006 0 0 0 -2-2h-12a2.006 2.006 0 0 0 -2 2v6a2.006 2.006 0 0 0 2 2h-8a2.006 2.006 0 0 0 2-2v-6a2.006 2.006 0 0 0 -2-2h-12a2.006 2.006 0 0 0 -2 2z" fill="#e8e4dc"/><path d="m56 34a4 4 0 0 1 4 4v10h-56v-10a4 4 0 0 1 4-4h7v6h34v-6z" fill="#b56e2f"/><path d="m59 14v16h-4v-14h-46v14h-4v-16a2.006 2.006 0 0 1 2-2h50a2.006 2.006 0 0 1 2 2z" fill="#b56e2f"/><path d="m28 27h-12a2.006 2.006 0 0 1 -2-2v3a2.006 2.006 0 0 0 2 2h12a2.006 2.006 0 0 0 2-2v-3a2.006 2.006 0 0 1 -2 2z" fill="#586957"/><path d="m48 27h-12a2.006 2.006 0 0 1 -2-2v3a2.006 2.006 0 0 0 2 2h12a2.006 2.006 0 0 0 2-2v-3a2.006 2.006 0 0 1 -2 2z" fill="#586957"/><path d="m8 37h7v-3h-7a4 4 0 0 0 -4 4v3a4 4 0 0 1 4-4z" fill="#d68238"/><path d="m56 34h-7v3h7a4 4 0 0 1 4 4v-3a4 4 0 0 0 -4-4z" fill="#d68238"/><path d="m57 25v-10a1 1 0 0 0 -1-1h-48a1 1 0 0 0 -1 1v10a2 2 0 0 1 -2 2v3h4v-14h46v14h4v-3a2 2 0 0 1 -2-2z" fill="#6b411c"/><rect fill="#d68238" height="2" rx="1" width="32" x="12" y="12"/><rect fill="#d68238" height="2" rx="1" width="5" x="47" y="12"/><path d="m36 20h-3a2.006 2.006 0 0 0 -2 2v6a1.975 1.975 0 0 0 .279 1h-1.558a2 2 0 0 1 -1.721 1h8a1.968 1.968 0 0 1 -.483-.066c-.04-.01-.077-.024-.116-.036a2 2 0 0 1 -.361-.156c-.022-.012-.045-.023-.067-.036a2.045 2.045 0 0 1 -.693-.706 1.975 1.975 0 0 1 -.28-1v-6a2.006 2.006 0 0 1 2-2z" fill="#cdc3b4"/><path d="m9 16v14h7a1.968 1.968 0 0 1 -.483-.066c-.04-.01-.077-.024-.116-.036a2 2 0 0 1 -.361-.156c-.022-.012-.045-.023-.067-.036a2.045 2.045 0 0 1 -.693-.706 1.975 1.975 0 0 1 -.28-1v-6a2.006 2.006 0 0 1 2-2h-3a2.006 2.006 0 0 0 -2 2v6a1.975 1.975 0 0 0 .279 1h-1.279v-12h44v12h-4.279a2 2 0 0 1 -1.721 1h7v-14z" fill="#cdc3b4"/><path d="m44.147 21.106c-.092.015-.184.031-.276.05a1.463 1.463 0 0 0 -.518.186.893.893 0 0 0 -.1 1.334 2.568 2.568 0 0 0 .993.621l1.5.641 2.207.946a.714.714 0 0 0 .663.051.626.626 0 0 0 .2-.267 2.494 2.494 0 0 0 .184-1.124 3.2 3.2 0 0 0 -.122-1.019 1.954 1.954 0 0 0 -.777-1.187 3.168 3.168 0 0 0 -1.351-.3 11.664 11.664 0 0 0 -2.603.068z" fill="#8c9882"/><path d="m24.147 21.106c-.092.015-.184.031-.276.05a1.463 1.463 0 0 0 -.518.186.893.893 0 0 0 -.1 1.334 2.568 2.568 0 0 0 .993.621l1.495.641 2.207.946a.714.714 0 0 0 .663.051.626.626 0 0 0 .2-.267 2.494 2.494 0 0 0 .189-1.124 3.2 3.2 0 0 0 -.122-1.019 1.954 1.954 0 0 0 -.777-1.187 3.168 3.168 0 0 0 -1.351-.3 11.664 11.664 0 0 0 -2.603.068z" fill="#8c9882"/><path d="m61 39v-4a3 3 0 0 0 -3-3h-52a3 3 0 0 0 -3 3v4a2 2 0 0 1 -2 2v3h3v-6a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v6h3v-3a2 2 0 0 1 -2-2z" fill="#586957"/><path d="m15 34h34v3h-34z" fill="#875223"/><path d="m15 40h34a0 0 0 0 1 0 0 3 3 0 0 1 -3 3h-28a3 3 0 0 1 -3-3 0 0 0 0 1 0 0z" fill="#945a26"/></g></svg>
`;


const Page = () => {
  const [darkMode] = useDarkMode();
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // State for difficulty filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search
  const [sortOption, setSortOption] = useState('A-Z'); // State for sorting option
  const [selectedSection, setSelectedSection] = useState(null); // State for the selected section
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedFilter, setSelectedFilter] = useState('all'); // State for selected filter

  const navigation = useNavigation(); // Initialize navigation


  const getRadarColors = (filter) => {
    switch (filter) {
      case 'easy':
        return [color.darkGreen, color.neutralGreen, color.lightGreen];
      case 'medium':
        return [color.darkBlue, color.neutralBlue, color.lightBlue];
      case 'hard':
        return [color.darkPlum, color.neutralPlum, color.lightPlum];
      case 'all':
      default:
        return [color.lightPlum, color.neutralBlue, color.neutralGreen];
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        //const categoryResponse = await fetch('http://192.168.0.12:3000/api/categories/basique');
        const categoryResponse = await fetch('http://192.168.0.12:3000/api/categories/basique');

        const categoryData = await categoryResponse.json();

        if (!categoryData) {
          throw new Error('Category not found');
        }

        setCategoryName(categoryData.categorie_name);

        const subcategoriesWithDetails = categoryData.subcategories.map(subcat => ({
          ...subcat,
          words: subcat.words.map(word => ({
            ...word,
            signs: word.signes.map(sign => ({
              urlSign: sign.url_sign,
              urlDef: sign.url_def
            }))
          }))
        }));

        setSubcategories(subcategoriesWithDetails);
        setFilteredSubcategories(subcategoriesWithDetails); // Initialize filtered subcategories
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const filterSubcategoriesByDifficulty = () => {
      if (filter === 'all') {
        setFilteredSubcategories(subcategories);
      } else {
        const filtered = subcategories
          .map(subcat => {
            const filteredWords = filterWordsByDifficulty(subcat.words, filter);
            return { ...subcat, words: filteredWords };
          })
          .filter(subcat => subcat.words.length > 0); // Only include subcategories that have words with the selected difficulty

        setFilteredSubcategories(filtered);
      }
    };

    filterSubcategoriesByDifficulty();
  }, [filter, subcategories]);

  useEffect(() => {
    // Filter by search query
    const filteredBySearch = subcategories.filter(subcat =>
      subcat.subcategory_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort based on selected sorting option
    const sortedSubcategories = filteredBySearch.sort((a, b) => {
      if (sortOption === 'A-Z') return a.subcategory_name.localeCompare(b.subcategory_name);
      if (sortOption === 'Z-A') return b.subcategory_name.localeCompare(a.subcategory_name);
      if (sortOption === 'New to Old') return b.originalIndex - a.originalIndex;
      if (sortOption === 'Old to New') return a.originalIndex - b.originalIndex;
      return 0;
    });

    setFilteredSubcategories(sortedSubcategories);
  }, [searchQuery, sortOption, subcategories]);

  const filterWordsByDifficulty = (words, filter) => {
    if (filter === 'all') {
      return words;
    }
    return words.filter(word => {
      const hasUrlSign = word.signs.some(signe => signe.urlSign && signe.urlSign !== 'Non spécifié');
      const hasUrlDef = word.signs.some(signe => signe.urlDef && signe.urlDef !== 'Non spécifié');

      if (filter === 'easy') {
        return hasUrlSign && hasUrlDef;
      }
      if (filter === 'medium') {
        return (hasUrlSign || hasUrlDef) && !(hasUrlSign && hasUrlDef);
      }
      if (filter === 'hard') {
        return !hasUrlSign && !hasUrlDef;
      }
      return false;
    });
  };

  const handleSectionClick = (subcat, difficulty) => {
    setSelectedSection({ subcat, difficulty });
    setModalVisible(true);
  };

  const toggleSortOption = () => {
    setSortOption(prev => (prev === 'A-Z' ? 'Z-A' : 'A-Z'));
  };

  const getWordCountByDifficulty = (subcat, difficulty) => {
    const totalWords = subcat.word_count;
    const filteredWords = filterWordsByDifficulty(subcat.words, difficulty);
    return { totalWords, filteredCount: filteredWords.length };
  };

  const getCircularProgressSvg = (filteredCount, totalWords, gradientLight, gradientNeutral, gradientHard) => {
    const progress = (filteredCount / totalWords) * 100;
    const radius = 15;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return `
      <svg width="45" height="45" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${gradientHard};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${gradientNeutral};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${gradientLight};stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="15" stroke=${lightTheme.dark_lightShade} stroke-width="5" fill="none" />
        <circle cx="20" cy="20" r="15" stroke="url(#progress-gradient)" stroke-width="5" fill="none"
          stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" transform="rotate(-90 20 20)" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="6" fill="${lightTheme.light_darkShade}">
          ${filteredCount}/${totalWords}
        </text>
      </svg>
    `;
  };




  if (loading) return <ActivityIndicator size="large" color={darkMode ? lightTheme.primary : darkTheme.primary} />;
  if (error) return <Text style={{ color: darkMode ? darkTheme.text : lightTheme.text }}>Error: {error}</Text>;

  return (
    <>
      <Header darkMode={darkMode}  PageTitle="Catégorie" title={categoryName} firstLink="/home" secondLink="none" />
      <ScrollView contentContainerStyle={[styles.mainContainer, { paddingBottom: 50 }]}>
        <Slider
          data={[
            {
              key: '1', component:

                <ReusableCard
                  title="Basique"
                  description="Plongez dans un monde de mots essentiels, accessibles à tous"
                  buttonText="Commencer"
                  onPressButton={() => console.log('Bouton pressé')}
                  darkMode={darkMode}
                  containerBgColor="#282C52"
                  iconBgColor={darkTheme.darkShade}
                  useSvg={true}
                  customSvg={`<svg id="Flat" height="512" viewBox="0 0 340 340" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m57.392 29.762s96.705 3.895 109.777 85.967l-102.245-47.788a76.418 76.418 0 0 0 -7.532-38.179z" fill="#ccd4ea"/><path d="m41.929 157.4-5.874-7.393s33.881-32.21 131.1-9.284c0 0 87.741-29.784 128.477 11.823l-5.162 9.777z" fill="#ea8744"/><path d="m165.906 112.155s-1.389-40.368 58.56-69.622c19.847-9.686 30.516-19.222 35.908-29.254 0 0 13.311 33.7-10.249 59.466z" fill="#ccd4ea"/><path d="m163.885 117.752s7.2-29.266 41.352-40.23 73.346-14.229 83.843-28.222c0 0 2.333 38.256-27.058 47.353l-90.974 25.029z" fill="#aeb7d3"/><path d="m170 117.752s-24.807-61.493-125.334-54.486c0 0 9.869 14.544 9.61 36.361z" fill="#aeb7d3"/><path d="m293.811 104.245a9.1 9.1 0 0 0 -7.223-7.206c-17.752-3.386-72.105-10.383-119.419 18.69-47.315-29.073-101.669-22.076-119.42-18.69a9.1 9.1 0 0 0 -7.223 7.206c-.627 3.241-1.117 6.388-1.5 9.377a17.063 17.063 0 0 1 -.69 6.511 137.146 137.146 0 0 0 -.426 18.894c63.372-20.076 129.256 0 129.256 0s65.883-20.076 129.255 0a134.164 134.164 0 0 0 -.293-17.221 11.243 11.243 0 0 1 -.635-6.64c-.399-3.443-.946-7.117-1.682-10.921z" fill="#dfe6ef"/><path d="m296.13 121.806c-.155-2.087-.363-4.311-.636-6.64a158.992 158.992 0 0 0 -90.131-5.628 152.005 152.005 0 0 0 -35.212 12.6v-9.491l-6-.021v9.739c-36.015-17.3-71.453-17.653-95.237-14.765a193.812 193.812 0 0 0 -29.883 6.023c-.288 2.269-.515 4.448-.69 6.51 22.868-6.849 74.349-17 125.81 8.923v9.131l6 .009v-9.24a143 143 0 0 1 36.787-13.623 153.049 153.049 0 0 1 89.192 6.473z" fill="#aeb7d3"/><path d="m260.388 289.854c1.3-13.347 9.764-18.844 9.764-18.844h-225.438a22.345 22.345 0 0 0 -22.345 22.345 22.345 22.345 0 0 0 22.345 22.345h225.438s-8.5-5.1-9.773-18.845a11.651 11.651 0 0 1 .009-7.001z" fill="#dfe6ef"/><path d="m301.667 259.988h-221.192a52.447 52.447 0 0 0 7.812-13.725 8.812 8.812 0 0 0 1.927-7 39.156 39.156 0 0 0 -.082-14.23 12.126 12.126 0 0 0 -1.9-7 63.273 63.273 0 0 0 -7.753-14.711h221.188a28.333 28.333 0 0 1 28.333 28.333 28.333 28.333 0 0 1 -28.333 28.333z" fill="#ffe7c7"/><path d="m298.739 136.5c-10.8-6.219-31.723-14.825-64.828-14.825-33.921 0-55.205 8.294-63.178 12.1a8.3 8.3 0 0 1 -7.129 0c-7.973-3.8-29.256-12.095-63.177-12.095-33.106 0-54.031 8.606-64.829 14.825a9.675 9.675 0 0 0 -2.974 14.242l4.237 5.629s16.871-19.294 63.81-19.294c33.267 0 52.78 7.767 61.326 12.292a11.034 11.034 0 0 0 10.343 0c8.546-4.525 28.06-12.292 61.326-12.292 46.939 0 62.9 20.318 62.9 20.318l5.145-6.653a9.675 9.675 0 0 0 -2.972-14.247z" fill="#ffb655"/><g fill="#e5ba93"><path d="m294.2 225.033h-53.114a3.5 3.5 0 0 1 0-7h53.114a3.5 3.5 0 0 1 0 7z"/><path d="m219.857 218.033h-131.63a45.882 45.882 0 0 1 1.9 7h129.73a3.5 3.5 0 0 0 0-7z"/><path d="m294.2 239.262h-203.99a40.746 40.746 0 0 1 -1.926 7h205.916a3.5 3.5 0 0 0 0-7z"/></g><path d="m260.4 289.855h-208.1a3.5 3.5 0 1 0 0 7h208.085c-.1-1.112-.164-3.5-.164-3.5 0-1.225.065-2.387.179-3.5z" fill="#aebed1"/><path d="m287.152 203.322h-33.713a32.631 32.631 0 0 0 -18.619 0h-121.7c-5.724-1.845-13.291-2.112-18.619 0h-49.147a11.585 11.585 0 0 1 -11.586-11.585v-29.181a10.011 10.011 0 0 1 10.011-10.011h50.721a33.038 33.038 0 0 0 18.619 0h121.7a27.9 27.9 0 0 0 18.619 0h35.066a10.232 10.232 0 0 1 10.232 10.232v28.96a11.585 11.585 0 0 1 -11.584 11.585z" fill="#c9656a"/><path d="m94.503 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m234.82 152.545h18.619v50.777h-18.619z" fill="#fff"/><path d="m45.384 311.561a18.207 18.207 0 0 1 -18.207-18.206 18.208 18.208 0 0 1 18.207-18.207h233.716a11.365 11.365 0 0 0 11.366-11.365v-3.8h-247.099a33.367 33.367 0 0 0 -33.367 33.372 33.366 33.366 0 0 0 33.367 33.366h247.1v-3.794a11.366 11.366 0 0 0 -11.367-11.366z" fill="#5d80c6"/></svg>`}
                />
            },
            {
              key: '2', component: <ReusableCard
                title="Nouveaux Défis"
                description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
                buttonText="Découvrir"
                onPressButton={() => console.log('Nouveaux Défis Découvrir')}
                containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
                iconBgColor={darkMode ? darkTheme.darkShade : color.darkBlue}
                darkMode={darkMode}
              />
            },
            {
              key: '3', component: <ReusableCard
                title="Nouveaux Défis"
                description="Explorez de nouveaux défis chaque jour pour améliorer vos compétences."
                buttonText="Découvrir"
                onPressButton={() => console.log('Nouveaux Défis Découvrir')}
                containerBgColor={darkMode ? darkTheme.light_darkShade : lightTheme.darkShade}
                iconBgColor={darkMode ? darkTheme.darkShade : color.darkBlue}
                darkMode={darkMode}
              />
            },
          ]}
          darkMode={darkMode}
        />

        <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            minHeight: 40,
            gap: 10,
          }}>
            <View style={{ flex: 5 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                borderRadius: 8,
                minHeight: 40,
                paddingHorizontal: 10,
                backgroundColor: darkMode ? darkTheme.dark_lightShade : lightTheme.lightShade,
              }}>
                <Feather name="search" size={20} color={darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade} />
                <TextInput
                  style={[styles.searchBar, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}
                  placeholder="Recherche un thème..."
                  placeholderTextColor={darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={toggleSortOption}
              style={{
                flex: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade,
                minHeight: 40,
              }}
            >
              <Text style={[styles.sortToggleText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.dark_lightShade }]}>
                {sortOption}
              </Text>
            </TouchableOpacity>
          </View>


          <ScrollView
            horizontal
            style={{ marginVertical: 15 }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterBar}
          >
            {['all', 'easy', 'medium', 'hard'].map(option => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setFilter(option);
                  setSelectedFilter(option);
                }}
                style={[
                  styles.filterButton,
                  {
                    borderColor: selectedFilter === option
                      ? option === 'all' ? lightTheme.dark_lightShade :
                        option === 'easy' ? color.neutralGreen :
                          option === 'medium' ? color.neutralBlue :
                            color.neutralPlum
                      : color.neutral,
                    backgroundColor: selectedFilter === option ?
                      option === 'all' ? lightTheme.dark_lightShade :
                        option === 'easy' ? color.neutralGreen :
                          option === 'medium' ? color.neutralBlue :
                            color.neutralPlum
                      : 'transparent',
                  }
                ]}
              >
                {selectedFilter === option && (
                  <View style={styles.gradientContainer}>
                    <GradientSVG
                      colors={
                        option === 'all' ? [color.neutralGreen, color.neutralBlue, color.neutralPlum] :
                          option === 'easy' ? [color.lightGreen, color.neutralGreen, color.darkGreen] :
                            option === 'medium' ? [color.lightBlue, color.neutralBlue, color.darkBlue] :
                              [color.lightPlum, color.neutralPlum, color.darkPlum]
                      }
                    />
                  </View>
                )}
                <SvgDifficulty difficulty={option} isSelected={selectedFilter === option} />
                <Paragraph style={[styles.filterButtonText, { color: selectedFilter === option ? lightTheme.darkShade : lightTheme.lightDarkShade }]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Paragraph>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredSubcategories.length > 0 ? (
            <>
              {/* Check for subcategories with 6 or more words */}
              {filteredSubcategories.some(subcat => getWordCountByDifficulty(subcat, filter).filteredCount >= 6) && (
                <>
                  <Subtitle
                    style={{ fontSize: 18, marginVertical: 10, color: darkMode ? darkTheme.text : lightTheme.darkShade }}
                  >
                    Basique
                  </Subtitle>

                  {filteredSubcategories
                    .filter(subcat => getWordCountByDifficulty(subcat, filter).filteredCount >= 6)
                    .map(subcat => {
                      const { totalWords, filteredCount } = getWordCountByDifficulty(subcat, filter);

                      return (
                        <TouchableOpacity
                          key={subcat.subcat_id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 5,
                            minHeight: 60,
                            backgroundColor: lightTheme.lightShade,
                            borderRadius: 8,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between',
                            backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade,
                          }}
                          onPress={() => handleSectionClick(subcat, filter)}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 20,
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              justifyContent: 'center',
                            }}
                          >
                            <SvgIcon icon={subcat.subcategory_name} fillColor={color.darkBlue} width="30" height="30" />
                            <Paragraph
                              style={[
                                styles.subcategoryText,
                                { fontSize: 12, color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade, textTransform: 'capitalize' },
                              ]}
                            >
                              {subcat.subcategory_name}
                            </Paragraph>
                          </View>

                          {filter === 'all' ? (
                            <Paragraph style={[{ fontSize: 12, color: darkMode ? darkTheme.text : lightTheme.light_darkShade }]}>
                              {totalWords} mots
                            </Paragraph>
                          ) : (
                            <View style={styles.circularProgressContainer}>
                              <SvgXml xml={getCircularProgressSvg(filteredCount, totalWords, color.neutralGreen, color.neutralBlue, color.neutralPlum)} />
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                </>
              )}

              {/* Check for subcategories with less than 6 words */}
              {filteredSubcategories.some(subcat => getWordCountByDifficulty(subcat, filter).filteredCount < 6) && (
                <>
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: darkMode ? darkTheme.text : lightTheme.text }}
                  >
                    Bientôt
                  </Text>

                  {filteredSubcategories
                    .filter(subcat => getWordCountByDifficulty(subcat, filter).filteredCount < 6)
                    .map(subcat => {
                      const { totalWords, filteredCount } = getWordCountByDifficulty(subcat, filter);

                      return (
                        <TouchableOpacity
                          key={subcat.subcat_id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 5,
                            minHeight: 60,
                            backgroundColor: lightTheme.lightShade,
                            borderRadius: 8,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            borderColor: darkMode ? darkTheme.light_darkShade : color.neutral,
                            backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade,
                          }}
                          onPress={() => handleSectionClick(subcat, filter)}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 20,
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              justifyContent: 'center',
                            }}
                          >
                            <SvgIcon icon={subcat.subcategory_name} fillColor={color.darkBlue} width="30" height="30" />
                            <Paragraph
                              style={[
                                styles.subcategoryText,
                                { fontSize: 12, color: darkMode ? color.neutral : lightTheme.light_darkShade, textTransform: 'capitalize' },
                              ]}
                            >
                              {subcat.subcategory_name}
                            </Paragraph>
                          </View>

                          {filter === 'all' ? (
                            <Paragraph style={[{ fontSize: 12, color: darkMode ? color.neutral : lightTheme.light_darkShade }]}>
                              {totalWords}
                            </Paragraph>
                          ) : (
                            <View style={styles.circularProgressContainer}>
                              <SvgXml xml={getCircularProgressSvg(filteredCount, totalWords, color.lightCoral, color.neutralCoral, color.darkCoral)} />
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                </>
              )}
            </>
          ) : (
            <Text style={{ color: darkMode ? color.neutral : color.neutral }}>No subcategories found</Text>
          )}
          {selectedSection && selectedSection.subcat && (
            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Feather name="x" size={24} color={darkMode ? lightTheme.text : darkTheme.text} />
                  </TouchableOpacity>

                  <View style={styles.recapContainer}>
                    {/* RadarEffect and other modal content */}
                    <RadarEffect
                      colors={getRadarColors(selectedFilter)}
                      minRadius={30}
                      maxRadius={50}
                      svgIcon={SvgIcon({ icon: selectedSection.subcat.subcategory_name }).props.xml}
                    />
                    <BigTitle>Récapitulatif</BigTitle>
                    <ContainerParagraph style={{ color: darkMode ? lightTheme.light_darkShade : darkTheme.text }}>
                      Vous allez commencer avec ce thème:
                    </ContainerParagraph>

                    <View style={[styles.categoryRow, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]}>
                      <View style={styles.categoryRowIcon}>
                        <SvgIcon icon={selectedSection.subcat.subcategory_name} width="25" height="25" />
                        <Text style={styles.recapTitle}>{selectedSection.subcat.subcategory_name}</Text>
                      </View>
                      <Text style={styles.modalTitle}>
                        {selectedSection.difficulty.charAt(0).toUpperCase() + selectedSection.difficulty.slice(1)}
                      </Text>
                    </View>

                    {/* Liste des mots filtrés */}
                    <ScrollView style={{ height: 200 }}>
                      {filterWordsByDifficulty(selectedSection.subcat.words, selectedSection.difficulty).map(word => (
                        <View key={word.mot_id}>
                          <Text style={{ color: darkMode ? darkTheme.text : lightTheme.text }}>
                            {word.mot} - {word.definition}
                          </Text>
                          {word.signs.map((sign, index) => (
                            <View key={index}>
                              <Text>Sign Video: {sign.urlSign}</Text>
                              <Text>Definition Video: {sign.urlDef}</Text>
                            </View>
                          ))}
                        </View>
                      ))}
                    </ScrollView>

                    <TouchableOpacity
  onPress={() => {
    const filteredWords = filterWordsByDifficulty(selectedSection.subcat.words, selectedSection.difficulty);

    navigation.navigate('subcat/[subcat_id]', {
      subcat_id: selectedSection.subcat.subcat_id, // Passe l'ID de la sous-catégorie
      difficulty: selectedSection.difficulty, // Passe le filtre de difficulté
      words: filteredWords, // Passe les mots filtrés
    });
    setModalVisible(false); // Ferme le modal après la navigation
  }}
  style={styles.closeButton}
>
  <Text style={{ color: darkMode ? lightTheme.text : darkTheme.text }}>
    Go to Subcategory Page
  </Text>
</TouchableOpacity>

                  </View>
                </View>
              </View>
            </Modal>
          )}


        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
  },
  filterBar: {
    flexDirection: 'row',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    alignItems: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    overflow: 'hidden',
  },
  filterButtonText: {
    fontSize: 16,
  },
  subcategoryContainer: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  subcategoryText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  recapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  recapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  //test
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width - 50,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
    minHeight: 40,
    marginTop: 20,
  },
  categoryRowIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  recapTitle: {
    color: lightTheme.lightShade,
  },
  // Filter
  recapCount: {
    fontSize: 12,
    color: lightTheme.dark_lightShade,
  },
  filterScrollView: {
    width: '100%',
    maxHeight: 45,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    height: 40,
    width: '100%',
  },
  filterButton: {
    minWidth: 80,
    flexWrap: 'wrap',
    borderRadius: 8,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    padding: 5,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 12,
  },
});

export default Page;
