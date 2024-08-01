import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Text, FlatList, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';


const FilterBar = ({ onSearchChange, onSortChange }) => {
    const [darkMode] = useDarkMode();

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
    { label: 'Z-A', value: 'Z-A' }
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor: darkMode ? darkTheme.lightShade : lightTheme.lightShade} ]}>
      <Feather name="search" size={20} color={ darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade} style={styles.searchIcon} />
      <TextInput
          style={[styles.searchInput, { color: darkMode ? darkTheme.light_darkShade : lightTheme.light_darkShade }]}
          placeholder="Rechercher ..."
          value={searchText}
          onChangeText={handleSearchChange}
        />
      </View>
      <View style={[styles.sortContainer, { backgroundColor: darkMode ? darkTheme.light_darkShade  : lightTheme.darkShade}]}>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setModalVisible(true)}
        >
            <View style={styles.pickerIconContainer}>
            <Feather name="filter" size={20} color={ darkMode ? darkTheme.dark_lightShade : lightTheme.dark_lightShade}  />

            </View>
          <Text style={[styles.selectedOption, {color: darkMode ? darkTheme.dark_lightShade : lightTheme.dark_lightShade}]}>{sortOption}</Text>

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
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>
            <FlatList
              data={sortOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => handleSortChange(item.value)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
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
    borderRadius: 8,

  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',

  },

  pickerIconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default FilterBar;
