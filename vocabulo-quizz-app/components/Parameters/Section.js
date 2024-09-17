import React from 'react';
import { View, StyleSheet } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/Colors';
import { ContainerTitle } from '@/constants/StyledText';
import InterfaceSvg from '@/SVG/InterfaceSvg';

const Section = ({ title, iconName, children, darkMode }) => {
  const childrenArray = React.Children.toArray(children);
  const fillColor = darkMode ? darkTheme.lightShade : lightTheme.darkShade;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <InterfaceSvg iconName={iconName} fillColor={fillColor} width="18" height="18" />
        <ContainerTitle style={[styles.sectionTitle, { color: fillColor }]}>{title}</ContainerTitle>
      </View>
      <View style={[styles.sectionContent, { backgroundColor: darkMode ? darkTheme.light_darkShade : lightTheme.lightShade }]}>
        {childrenArray.map((child, index) =>
          React.cloneElement(child, { isLast: index === childrenArray.length - 1, darkMode })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
  },
  sectionContent: {
    borderRadius: 8,
  },
});

export default Section;
