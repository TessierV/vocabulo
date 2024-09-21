import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Paragraph, BigTitle, ContainerParagraph } from '@/constants/StyledText';
import RadarEffect from '@/components/RadarEffect';
import SvgIcon from '@/SVG/CategorySvgIcon';
import SvgDifficulty from '@/SVG/DifficultySvgIcon';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import { GradientBorderButton } from '../Button';

const ModalComponent = ({ darkMode, modalVisible, closeModal, selectedSection, selectedFilter, getRadarColors, filterWordsByDifficulty, navigation, basic }) => {
  if (!selectedSection || !selectedSection.subcat) {
    return null;
  }

  const { subcat, difficulty } = selectedSection;

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, {backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.lightShade}]}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Feather name="x" size={24} color={darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade} />
          </TouchableOpacity>
          <View style={styles.recapContainer}>
            <RadarEffect
              colors={getRadarColors(selectedFilter)}
              minRadius={30}
              maxRadius={50}
              svgIcon={SvgIcon({ icon: subcat.subcategory_name }).props.xml}
            />
            <View style={styles.textContainer}>
              <BigTitle style={{color: darkMode ? darkTheme.dark_lightShade : lightTheme.darkShade}}>
                {basic.modal.title}
              </BigTitle>
              <ContainerParagraph style={{ color: darkMode ? darkTheme.neutral : lightTheme.light_darkShade }}>
                {basic.modal.subtitle}
              </ContainerParagraph>
            </View>
            <View style={[styles.categoryRow, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
                <View style={styles.categoryRowIcon}>
                  <SvgIcon icon={subcat.subcategory_name} width="25" height="25" />
                  <Paragraph style={[styles.recapTitle, {color: darkMode ? darkTheme.lightShade : lightTheme.lightShade}]}>
                    {subcat.subcategory_name}
                  </Paragraph>
                </View>
                <View style={styles.difficultyContainer}>
                  <SvgDifficulty difficulty={difficulty} isSelected={false} />
                </View>
              </View>

            <GradientBorderButton
              background={darkMode ? 'dark' : 'light'}
              textColor={darkMode ? 'light' : 'dark'}
              onPress={() => {
                const filteredWords = filterWordsByDifficulty(subcat.words, difficulty);
                navigation.navigate('subcat/[subcat_id]', {
                  subcat_id: subcat.subcat_id,
                  difficulty: difficulty,
                  words: filteredWords,
                });
                closeModal();
              }}
              text={basic.modal.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    height: '90%',
    width: '100%',
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  recapContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    height: '100%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
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
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ModalComponent;
