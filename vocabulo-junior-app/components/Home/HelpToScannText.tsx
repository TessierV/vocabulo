import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { EvilIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { ButtonText, InformationText, Scannedtext } from '@/constants/StyledText';

export default function warningToScannText() {
  return (
    <View style={styles.container}>
        <View style={styles.warningButton}>
        <InformationText style={styles.warningButtonText}>Attention</InformationText>
        <Ionicons name="warning-outline" style={styles.warningIcon} />
        </View>
        <View style={styles.backgroundColorContainer}>
        <View style={styles.referenceLineContainer} >
            <View style={styles.targetContainer}>
              <SimpleLineIcons name="target" style={styles.targetIcon} />
              <InformationText style={styles.referenceLineText}>Cadre de repère</InformationText>
            </View>
            <Scannedtext style={styles.text}>Quand tu prends une photo, que ce soit en vertical ou en horizontal, mets le texte bien à l’intérieur du cadre !</Scannedtext>
            <View style={styles.referenceLine}></View>
          </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: '90%',
      marginHorizontal: 'auto',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    warningButton: {
        backgroundColor: Colors.whiteTransparent,
        height: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        paddingTop: 8,
    },
    warningIcon: {
      color: Colors.grey,
      fontSize: 15
    },
    warningButtonText:{
        color: Colors.grey,
        marginRight: 5
    },
    backgroundColorContainer: {
      borderRadius: 20,
      borderTopRightRadius: 0,
      width: '100%',
      height: '80%',
      marginHorizontal: 'auto',
      backgroundColor: Colors.whiteTransparent,
    },
    referenceLineContainer: {
      marginVertical: 'auto',
      height: '80%',
    },
    referenceLine: {
      width: '90%',
      height: '100%',
      borderRadius: 5,
      borderWidth: 2,
      borderStyle: 'dotted',
      borderColor: Colors.grey,
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute'
    },
    targetContainer: {
      marginHorizontal: '8%',
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    referenceLineText: {
      color: Colors.grey,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    targetIcon: {
      fontSize: 14,
      color: Colors.grey,
      marginRight: 5
    },
    text: {
        paddingTop: '3%',
        width: '87%',
        marginHorizontal: 'auto',
    }
  });
  