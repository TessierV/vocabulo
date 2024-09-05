import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ButtonText } from '@/constants/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth

export default function CustomProfile() {
  const [userName, setUserName] = useState<string>('Utilisateur');
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData && userData.name) {
              setUserName(userData.name);
            }
          } else {
            console.log('User document does not exist');
          }
        } else {
          console.error('No user is authenticated');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();

    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    moveAnimation.start();
  }, [moveAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./../../assets/images/Logo-blue.png')}
        style={[styles.logo, { transform: [{ translateY: moveAnim }] }]}
      />
      <View style={styles.UserNameContainer}>
        <ButtonText style={styles.UserName}>{userName}</ButtonText>
        <TouchableOpacity>
          <EvilIcons name="pencil" style={styles.ModifyUserNameiconButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 100,
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'center',
    marginHorizontal: 'auto',
    padding: 15,
  },
  logo: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  UserNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderBottomColor: Colors.grey,
    marginTop: 10,
  },
  UserName: {
    paddingHorizontal: 20,
  },
  ModifyUserNameiconButton: {
    fontSize: 25,
  },
});
