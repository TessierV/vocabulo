import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Paragraph, BigTitle, ContainerParagraph } from '@/constants/StyledText';
import RadarEffect from '@/components/RadarEffect';
import SvgIcon from '@/SVG/CategorySvgIcon';
import { darkTheme, lightTheme } from '@/constants/Colors';

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
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Feather name="x" size={24} color={darkMode ? lightTheme.darkShade : darkTheme.darkShade} />
          </TouchableOpacity>

          <View style={styles.recapContainer}>
            <RadarEffect
              colors={getRadarColors(selectedFilter)}
              minRadius={30}
              maxRadius={50}
              svgIcon={SvgIcon({ icon: subcat.subcategory_name }).props.xml}
            />
            <BigTitle>{basic.modal.title}</BigTitle>
            <ContainerParagraph style={{ color: darkMode ? lightTheme.light_darkShade : darkTheme.darkShade }}>
              {basic.modal.subtitle}
            </ContainerParagraph>

            <View style={[styles.categoryRow, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.darkShade }]}>
              <View style={styles.categoryRowIcon}>
                <SvgIcon icon={subcat.subcategory_name} width="25" height="25" />
                <Paragraph style={styles.recapTitle}>{subcat.subcategory_name}</Paragraph>
              </View>
              <Paragraph style={styles.modalTitle}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Paragraph>
            </View>

            <ScrollView style={{ height: 200 }}>
              {filterWordsByDifficulty(subcat.words, difficulty).map(word => (
                <View key={word.mot_id}>
                  <Paragraph style={{ color: darkMode ? darkTheme.darkShade : lightTheme.darkShade }}>
                    {word.mot} - {word.definition}
                  </Paragraph>
                  {word.signs.map((sign, index) => (
                    <View key={index}>
                      <Paragraph>Sign Video: {sign.urlSign}</Paragraph>
                      <Paragraph>Definition Video: {sign.urlDef}</Paragraph>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                const filteredWords = filterWordsByDifficulty(subcat.words, difficulty);
                navigation.navigate('subcat/[subcat_id]', {
                  subcat_id: subcat.subcat_id,
                  difficulty: difficulty,
                  words: filteredWords,
                });
                closeModal();
              }}
              style={styles.Button}
            >
              <Paragraph style={{ color: darkMode ? lightTheme.text : lightTheme.darkShade }}>
                {basic.modal.button}
              </Paragraph>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  Button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ModalComponent;
