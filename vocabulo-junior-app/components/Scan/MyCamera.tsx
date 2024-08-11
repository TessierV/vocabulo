import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';
import { router } from 'expo-router';

export default function MyCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <InformationText style={styles.permissionsMessage}>
          Nous avons besoin de votre permission pour afficher la caméra
        </InformationText>
        <TouchableOpacity
          style={styles.permissionsButton}
          onPress={() => router.push('./../../screens/ScannedTextScreen')}
        >
          <ButtonText style={styles.permissionsButtontext}>
            Autoriser l'accès à la caméra
          </ButtonText>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          setPhotoUri(photo.uri);
        } else {
          console.error('Échec de la prise de photo');
        }
      } catch (error) {
        console.error('Erreur lors de la prise de photo', error);
      }
    }
  };

  const closePhoto = () => {
    setPhotoUri(null);
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={closePhoto} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => router.push('./../../screens/ScannedTextScreen')}
          >
            <ButtonText style={styles.buttonText}>Scanner le texte</ButtonText>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.takePhotoButtonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.takePhotobutton} />
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  permissionsMessage: {
    color: Colors.white,
    textAlign: 'center',
  },
  permissionsButton: {
    paddingVertical: 15,
    marginTop: -25,
    width: '90%',
    borderRadius: 100,
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
  },
  permissionsButtontext: {
    textAlign: 'center',
    color: Colors.white,
  },
  camera: {
    flex: 1,
  },
  takePhotoButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  takePhotobutton: {
    width: 70,
    height: 70,
    backgroundColor: Colors.whiteTransparent,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
  },
  photo: {
    width: '90%',
    height: 470,
    resizeMode: 'contain',
  },
  scanButton: {
    paddingVertical: 15,
    marginTop: -25,
    width: 200,
    borderRadius: 100,
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    padding: 10,
    borderRadius: 50,
  },
});
