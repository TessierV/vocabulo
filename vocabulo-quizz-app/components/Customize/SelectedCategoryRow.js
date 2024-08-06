import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomizeRow from '@/components/Customize/CustomizeRow';
import { darkTheme, lightTheme } from '@/constants/Colors';

const SelectedCategoryRow = ({ categories, darkMode, onCategorySelect, onRemoveCategory }) => {
  return (
    <View style={styles.selectedCategories}>
      {categories.map((category, index) => (
        <CustomizeRow
          key={index}
          category={category || { textLabel: null, icon: null }}
          darkMode={darkMode}
          onSelect={() => onCategorySelect(category)}
          onRemove={() => onRemoveCategory(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default SelectedCategoryRow;
