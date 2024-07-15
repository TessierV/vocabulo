import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCurrentPath, useNavigate } from 'expo-router';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';

const Footer = () => {
  const currentPath = useCurrentPath();
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    if (currentPath !== path) {
      navigate(path);
    }
  };

  const getActiveStyle = (path: string) => {
    return currentPath === path ? styles.activeFooterItem : {};
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigateTo('/screens/home')}
        >
          <Feather name="home" size={24} color="black" />
          <Text style={[styles.footerItemText, getActiveStyle('/screens/home')]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigateTo('/screens/dico')}
        >
          <Feather name="book-open" size={24} color="black" />
          <Text style={[styles.footerItemText, getActiveStyle('/screens/dico')]}>Dico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundFooterItem}
          onPress={() => navigateTo('/screens/game')}
        >
          <Text style={[styles.roundFooterItemText, getActiveStyle('/screens/game')]}>Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigateTo('/screens/data')}
        >
          <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />
          <Text style={[styles.footerItemText, getActiveStyle('/screens/data')]}>Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigateTo('/screens/profile')}
        >
          <FontAwesome name="user-o" size={24} color="black" />
          <Text style={[styles.footerItemText, getActiveStyle('/screens/profile')]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 7,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  footerItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerItemText: {
    marginTop: 4,
    color: 'black',
    fontSize: 12,
  },
  roundFooterItem: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    borderColor: 'plum',
    borderWidth: 8,
  },
  roundFooterItemText: {
    color: 'white',
  },
  activeFooterItem: {
    color: 'black',
  },
});

export default Footer;
