import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Subtitle, Paragraph } from '@/constants/StyledText';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { texts } from '@/constants/texts';

const SectionTitle = ({ title, text, iconName = 'info', popupTitle, popupText, popupButtonText, darkMode }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Subtitle style={{ color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }}>{title}</Subtitle>
        <View style={styles.rightColumn}>
          <Paragraph style={[styles.textRight, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{text}</Paragraph>
          <TouchableOpacity onPress={handleIconPress}>
          <SvgXml xml={texts.sectionTitle.icons} width={15} height={15} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.lightShade }]}>
            <Text style={[styles.modalTitle, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{popupTitle}</Text>
            <Text style={[styles.modalText, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{popupText}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={[styles.closeButton, { color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>{popupButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRight: {
    marginRight: 10,
    fontSize: 14,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SectionTitle;
