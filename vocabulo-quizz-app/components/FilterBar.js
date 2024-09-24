import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Text, FlatList, Pressable } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';
import SvgIcon from './SvgIcon'; // Adjust the import path as needed
import { Feather } from '@expo/vector-icons';
import { Paragraph } from '@/constants/StyledText';

const FilterBar = ({ onSearchChange, onSortChange, darkMode }) => {
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchChange = (text) => {
    setSearchText(text);
    onSearchChange(text);
  };

  const handleSortChange = (itemValue) => {
    setSortOption(itemValue);
    onSortChange(itemValue);
    setModalVisible(false);
  };

  const sortOptions = [
    { label: 'A-Z', value: 'A-Z' },
    { label: 'Z-A', value: 'Z-A' },
    { label: 'Ancienneté', value: 'OLD' },
    { label: 'Nouveauté', value: 'NEW' }
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor: darkMode ? darkTheme.lightShade : lightTheme.lightShade }]}>
        <SvgIcon icon="search" fillColor={darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }]}
          placeholder="Search ..."
          value={searchText}
          onChangeText={handleSearchChange}
        />
      </View>
      <View style={[styles.sortContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.darkShade }]}>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.pickerIconContainer}>
            <SvgIcon icon="sort" fillColor={darkMode ? darkTheme.dark_lightShade : lightTheme.dark_lightShade} />
          </View>
          <Paragraph style={[styles.selectedOption, { color: darkMode ? darkTheme.dark_lightShade : lightTheme.dark_lightShade }]}>{sortOption}</Paragraph>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color={darkMode ? darkTheme.lightShade : lightTheme.light_darkShade} />
              </TouchableOpacity>
            <FlatList
              data={sortOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <Pressable
                  style={[styles.modalItem, { borderBottomWidth: index < sortOptions.length - 1 ? 1 : 0 }]}
                  onPress={() => handleSortChange(item.value)}
                >
                  <Paragraph style={styles.modalItemText}>{item.label}</Paragraph>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    height: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '80%',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    width: '20%',
    borderRadius: 8,
    height: 40,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  pickerIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingRight: 25,
    top: 20,
  },
  modalContent: {
    width: '60%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalItem: {
    padding: 10,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default FilterBar;
