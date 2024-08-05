import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { texts } from '@/constants/texts';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import { interfaceIcons } from '@/constants/svg';
import { ContainerParagraph, Subtitle } from '@/constants/StyledText';


const categories = texts.categories;

const getRandomCategory = (categories) => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

const getAvailableDifficulties = (categoryLabel) => {
  return categories
    .filter(category => category.textLabel === categoryLabel)
    .map(category => category.difficulty);
};

const RandomScreen = () => {
  const [darkMode] = useDarkMode();
  const [randomCategory, setRandomCategory] = useState(getRandomCategory(categories));
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleRandomize = () => {
    setRandomCategory(getRandomCategory(categories));
  };

  const handleValidate = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    const routeName = randomCategory.route.replace('/', '');
    setModalVisible(false);
    navigation.navigate(routeName);
  };

  const handleChangeDifficulty = (difficulty) => {
    const availableDifficulties = getAvailableDifficulties(randomCategory.textLabel);
    if (availableDifficulties.includes(difficulty)) {
      setRandomCategory({ ...randomCategory, difficulty });
    }
  };

  const isDifficultyAvailable = (difficulty) => {
    const availableDifficulties = getAvailableDifficulties(randomCategory.textLabel);
    return availableDifficulties.includes(difficulty);
  };

  const getDifficultySVG = (difficulty) => {
    const colors = {
      easy: darkMode ? darkTheme.lightGreen : color.darkGreen,
      middle: darkMode ? darkTheme.lightBlue : color.neutralBlue,
      middleDark: darkMode ? darkTheme.darkBlue : color.darkBlue,
      hard: darkMode ? darkTheme.lightPlum : color.neutralPlum,
      hardDark: darkMode ? darkTheme.lightPlum : color.darkPlum,

    };

    switch (difficulty) {
      case 'easy':
        return `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.88977 0.83237L6.64142 3.2977C6.7416 3.6262 6.92106 3.92506 7.16391 4.1679C7.40678 4.41078 7.70567 4.59017 8.0342 4.69035L10.4997 5.44197C10.7208 5.50934 10.7208 5.82302 10.4997 5.89038L8.0342 6.642C7.70558 6.742 7.40661 6.92137 7.1637 7.16424C6.92083 7.40712 6.74146 7.70607 6.64142 8.03466L5.88977 10.5C5.82241 10.7211 5.50868 10.7211 5.44129 10.5L4.68964 8.03466C4.5896 7.70607 4.41023 7.40712 4.16733 7.16424C3.92445 6.92137 3.62548 6.742 3.29686 6.642L0.831334 5.89038C0.610258 5.82302 0.610258 5.50934 0.831334 5.44197L3.29686 4.69035C3.62539 4.59017 3.92428 4.41078 4.16713 4.1679C4.41 3.92506 4.58943 3.6262 4.68964 3.2977L5.44129 0.83237C5.50868 0.610259 5.82241 0.610259 5.88977 0.83237Z" fill="${colors.easy}"/></svg>`;
      case 'middle':
        return `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_354_1338)"><path d="M5.64459 4.08707L6.41774 6.75159C6.52079 7.10664 6.70536 7.42964 6.95517 7.69211C7.20499 7.9546 7.5124 8.1485 7.85034 8.25679L10.3864 9.06911C10.6137 9.14193 10.6137 9.48096 10.3864 9.55378L7.85034 10.3661C7.51232 10.4742 7.20482 10.6681 6.95497 10.9306C6.70513 11.1931 6.52062 11.5161 6.41774 11.8713L5.64459 14.5358C5.57529 14.7747 5.25261 14.7747 5.1833 14.5358L4.41016 11.8713C4.30727 11.5161 4.12277 11.1931 3.87292 10.9306C3.62308 10.6681 3.31558 10.4742 2.97756 10.3661L0.441543 9.55378C0.214147 9.48096 0.214147 9.14193 0.441543 9.06911L2.97756 8.25679C3.31549 8.1485 3.6229 7.9546 3.87272 7.69211C4.12254 7.42964 4.3071 7.10664 4.41016 6.75159L5.1833 4.08707C5.25261 3.84701 5.57529 3.84701 5.64459 4.08707Z" fill="${colors.middleDark}" /></g><path d="M10.9696 0.135525L11.4922 2.14122C11.5619 2.40848 11.6867 2.65161 11.8555 2.84918C12.0244 3.04676 12.2322 3.19273 12.4606 3.27423L14.1748 3.88571C14.3285 3.94051 14.3285 4.19572 14.1748 4.25053L12.4606 4.862C12.2321 4.94337 12.0243 5.08929 11.8554 5.28688C11.6865 5.48449 11.5618 5.72768 11.4922 5.99502L10.9696 8.00071C10.9228 8.18055 10.7047 8.18055 10.6578 8.00071L10.1352 5.99502C10.0657 5.72768 9.94097 5.48449 9.77209 5.28688C9.60321 5.08929 9.39536 4.94337 9.16688 4.862L7.45268 4.25053C7.29898 4.19572 7.29898 3.94051 7.45268 3.88571L9.16688 3.27423C9.3953 3.19273 9.60309 3.04676 9.77195 2.84918C9.94082 2.65161 10.0656 2.40848 10.1352 2.14122L10.6578 0.135525C10.7047 -0.0451751 10.9228 -0.0451751 10.9696 0.135525Z" fill="${colors.middle}"/><defs><clipPath id="clip0_354_1338"><rect width="10.8284" height="11.3771" fill="white" transform="translate(0 3.62288)"/></clipPath></defs></svg>`;
      case 'hard':
        return `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_354_1326)"><path d="M5.6446 4.08705L6.41773 6.75159C6.52078 7.10663 6.70537 7.42964 6.95516 7.6921C7.20498 7.9546 7.51241 8.14849 7.85034 8.25677L10.3863 9.06912C10.6137 9.14192 10.6137 9.48095 10.3863 9.55376L7.85034 10.3661C7.51232 10.4742 7.2048 10.668 6.95495 10.9305C6.70513 11.193 6.52063 11.5162 6.41773 11.8713L5.6446 14.5358C5.57531 14.7747 5.25261 14.7747 5.18329 14.5358L4.41016 11.8713C4.30726 11.5162 4.12276 11.193 3.87291 10.9305C3.62309 10.668 3.31557 10.4742 2.97756 10.3661L0.441543 9.55376C0.214147 9.48095 0.214147 9.14192 0.441543 9.06912L2.97756 8.25677C3.31548 8.14849 3.62291 7.9546 3.8727 7.6921C4.12253 7.42964 4.30708 7.10663 4.41016 6.75159L5.18329 4.08705C5.25261 3.84702 5.57531 3.84702 5.6446 4.08705Z" fill="${colors.hardDark}"/><path d="M12.6403 9.39826L13.0117 10.6831C13.0612 10.8544 13.1498 11.0101 13.2698 11.1367C13.3898 11.2633 13.5375 11.3568 13.6998 11.409L14.918 11.8007C15.0272 11.8358 15.0272 11.9993 14.918 12.0344L13.6998 12.4262C13.5375 12.4783 13.3897 12.5718 13.2697 12.6984C13.1497 12.8249 13.0611 12.9808 13.0117 13.152L12.6403 14.4369C12.607 14.5521 12.452 14.5521 12.4187 14.4369L12.0473 13.152C11.9979 12.9808 11.9093 12.8249 11.7893 12.6984C11.6693 12.5718 11.5215 12.4783 11.3592 12.4262L10.141 12.0344C10.0318 11.9993 10.0318 11.8358 10.141 11.8007L11.3592 11.409C11.5215 11.3568 11.6692 11.2633 11.7892 11.1367C11.9092 11.0101 11.9978 10.8544 12.0473 10.6831L12.4187 9.39826C12.452 9.28249 12.607 9.28249 12.6403 9.39826Z" fill="${colors.hardDark}"/><path d="M10.9697 0.135525L11.4922 2.14122C11.5619 2.40848 11.6867 2.65161 11.8555 2.84918C12.0244 3.04676 12.2322 3.19271 12.4606 3.27423L14.1748 3.8857C14.3285 3.94052 14.3285 4.19571 14.1748 4.25053L12.4606 4.862C12.2321 4.94336 12.0243 5.08929 11.8554 5.2869C11.6865 5.4845 11.5618 5.72768 11.4922 5.99501L10.9697 8.00072C10.9228 8.18056 10.7047 8.18056 10.6579 8.00072L10.1352 5.99501C10.0657 5.72768 9.94099 5.4845 9.77208 5.2869C9.60321 5.08929 9.39537 4.94336 9.16688 4.862L7.45268 4.25053C7.29898 4.19571 7.29898 3.94052 7.45268 3.8857L9.16688 3.27423C9.39531 3.19271 9.60309 3.04676 9.77197 2.84918C9.94081 2.65161 10.0656 2.40848 10.1352 2.14122L10.6579 0.135525C10.7047 -0.0451751 10.9228 -0.0451751 10.9697 0.135525Z" fill="${colors.hard}"/></g><defs><clipPath id="clip0_354_1326"><rect width="15" height="15" fill="white"/></clipPath></defs></svg>`;
      default:
        return '';
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const buttonSize = screenWidth / 3 - 25;

  const getDifficultyColors = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return {
          borderColor: color.darkGreen,
          textColor: color.darkGreen,
          backgroundColor: color.lightGreen,
        };
      case 'middle':
        return {
          borderColor: color.darkBlue,
          textColor: color.darkBlue,
          backgroundColor: color.lightBlue,

        };
      case 'hard':
        return {
          borderColor: color.darkPlum,
          textColor: color.darkPlum,
          backgroundColor: color.lightPlum,
        };
      default:
        return {
          borderColor: darkMode ? darkTheme.borderColor : 'gray',
          textColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade,
        };
    }
  };

  const buttonStyle = (difficulty) => {
    const isSelected = randomCategory.difficulty === difficulty;
    const { borderColor, textColor, backgroundColor } = getDifficultyColors(difficulty);
    return {
      backgroundColor: isDifficultyAvailable(difficulty)
        ? (isSelected ? (darkMode ? 'yellow' : backgroundColor ) : 'transparent')
        : 'transparent',
      borderRadius: 8,
      width: buttonSize,
      height: buttonSize,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      borderColor: isDifficultyAvailable(difficulty) ? (darkMode ? 'yellow' : borderColor) : '#CCC',
      borderWidth: 2,
      borderStyle: isSelected ? 'solid' : 'dotted',
      opacity: isDifficultyAvailable(difficulty) ? 1 : 0.4,
    };
  };

  const textStyle = (difficulty) => {
    const { textColor } = getDifficultyColors(difficulty);
    const isSelected = randomCategory.difficulty === difficulty;
    return {
      color: isSelected ? lightTheme.darkShade : 'gray',
      fontSize: 16,
      marginTop: 5,
    };
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade }
    ]}>
      <Header darkMode={darkMode} title="Random Category" firstLink="/home" secondLink="none" />
      <View style={styles.iconContainer}>
        <SvgXml xml={randomCategory.icon} width={100} height={100} />
        <Subtitle style={[styles.iconText, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.light_darkShade }]}>
          {`${randomCategory.textLabel}`}
        </Subtitle>
      </View>
      <SectionTitle
        title={texts.homeScreen.section.title}
        text={texts.homeScreen.section.text}
        iconName="help-circle"
        popupTitle={texts.homeScreen.section.popup.title}
        popupText={texts.homeScreen.section.popup.text}
        popupButtonText={texts.homeScreen.section.popup.button}
        darkMode={darkMode}
      />
      <TouchableOpacity style={[styles.randomButtonContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]} onPress={handleRandomize}>
      <SvgXml xml={interfaceIcons.dice} width="30" height="30" />

        <ContainerParagraph style={{color: darkMode ? darkTheme.lightShade : lightTheme.lightShade}}>Cliquer pour relancer</ContainerParagraph>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
      <View style={[styles.separator, { borderTopColor: darkMode ? darkTheme.light_darkShade : '#CCC' }]}></View>
      <Text style={{color: darkMode ? darkTheme.light_darkShade : '#CCC'}}>OU</Text>
        <View style={[styles.separator, { borderTopColor: darkMode ? darkTheme.light_darkShade : '#CCC' }]}></View>
      </View>

      <SectionTitle
        title={texts.homeScreen.section.title}
        text={texts.homeScreen.section.text}
        iconName="help-circle"
        popupTitle={texts.homeScreen.section.popup.title}
        popupText={texts.homeScreen.section.popup.text}
        popupButtonText={texts.homeScreen.section.popup.button}
        darkMode={darkMode}
      />

      <View style={styles.difficultyContainer}>
        <TouchableOpacity style={buttonStyle('easy')} onPress={() => handleChangeDifficulty('easy')} disabled={!isDifficultyAvailable('easy')}>
          <SvgXml xml={getDifficultySVG('easy')} width="30" height="30" />
          <Text style={textStyle('easy')}>Facile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('middle')} onPress={() => handleChangeDifficulty('middle')} disabled={!isDifficultyAvailable('middle')}>
          <SvgXml xml={getDifficultySVG('middle')} width="30" height="30" />
          <Text style={textStyle('middle')}>Moyen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('hard')} onPress={() => handleChangeDifficulty('hard')} disabled={!isDifficultyAvailable('hard')}>
          <SvgXml xml={getDifficultySVG('hard')} width="30" height="30" />
          <Text style={textStyle('hard')}>Difficile</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
          <Text style={styles.validateButtonText}>Validate</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Récapitulatif</Text>
            <Text>Thème: {randomCategory.textLabel}</Text>
            <Text>Difficulté: {randomCategory.difficulty}</Text>
            <Text>Bonne chance !</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                <Text style={styles.modalButtonText}>Commencer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  themeContainer: {
    minHeight: 70,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  separatorContainer: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    borderTopWidth: 1,
    width: '40%',
  },
  randomButtonContainer: {
    minHeight: 70,
    paddingHorizontal: 20,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,

  },
  validateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  validateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  difficultyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyText: {
    fontSize: 18,
    marginVertical: 5,
  },
  easy: {
    color: 'green',
  },
  middle: {
    color: 'blue',
  },
  hard: {
    color: 'purple',
  },
  disabled: {
    color: 'lightgray',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RandomScreen;
