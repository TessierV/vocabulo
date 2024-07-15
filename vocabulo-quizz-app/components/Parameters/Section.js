import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '@/constants/Colors';

const Section = ({ title, iconName, children, darkMode }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Feather name={iconName} style={styles.icon} size={18} color={darkMode ? darkTheme.icon : lightTheme.icon} />
        <Text style={[styles.sectionTitle, { color: darkMode ? darkTheme.icon_title : lightTheme.icon_title }]}>{title}</Text>
      </View>
      <View style={[styles.sectionContent, { backgroundColor: darkMode ? darkTheme.container : lightTheme.container }]}>
        {childrenArray.map((child, index) =>
          React.cloneElement(child, { isLast: index === childrenArray.length - 1, darkMode })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    marginLeft: 10,
  },
  sectionContent: {
    borderRadius: 7,
  },
});

export default Section;
