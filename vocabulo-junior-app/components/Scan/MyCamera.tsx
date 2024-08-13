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
          <Image source={{ uri: photoUri }} style={styles.photo} />
          <TouchableOpacity onPress={closePhoto} style={styles.closeButtonContainer}>
            <AntDesign name="close" style={styles.closeButton}/>
          </TouchableOpacity>
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
    backgroundColor: Colors.lightGrey,
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
    backgroundColor: Colors.darkCoral,
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
    bottom: '14%',
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    top: '12%',
    alignItems: 'center',
  },
  photo: {
    width: '90%',
    minHeight: 470,
    resizeMode: 'contain',
    borderRadius: 15
  },
  scanButton: {
    paddingVertical: 15,
    marginTop: -25,
    width: 200,
    borderRadius: 100,
    backgroundColor: Colors.darkCoral,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    right: '5%',
    position: 'absolute',
    padding: 5,
    borderRadius: 50,
    backgroundColor: Colors.whiteTransparent,
    margin: 10
  },
  closeButton: {
    color: Colors.white,
    fontSize: 18
  },
});
