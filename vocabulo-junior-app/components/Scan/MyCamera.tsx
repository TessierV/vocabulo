import React, { useState, useRef, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Animated, Alert, ImageStyle } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';
import { router } from 'expo-router';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import * as MediaLibrary from 'expo-media-library';
import LinearGradient from 'react-native-linear-gradient';

const IPvillagebyca = '10.10.1.126';
const IPmyHome = '192.168.1.12';

export default function MyCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoHeight, setPhotoHeight] = useState<number>(0); // New state to store photo height
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isScanning) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );

      animation.start();

      return () => animation.stop();
    } else {
      animationValue.setValue(0);
    }
  }, [isScanning]);

  const lineTranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 385],
  });

  const animatedLineStyle = {
    transform: [{ translateY: lineTranslateY }],
  };

  if (!cameraPermission) {
    console.log('Camera permission state is undefined');
    return <View />;
  }

  if (!cameraPermission.granted) {
    console.log('Camera permission not granted');
    return (
      <View style={styles.container}>
        <InformationText style={styles.permissionsMessage}>
          Nous avons besoin de votre permission pour afficher la caméra
        </InformationText>
        <TouchableOpacity
          style={styles.permissionsButton}
          onPress={requestCameraPermission}
        >
          <ButtonText style={styles.permissionsButtontext}>
            Autoriser l'accès à la caméra
          </ButtonText>
        </TouchableOpacity>
      </View>
    );
  }

  if (!mediaPermission) {
    console.log('Media library permission state is undefined');
    return <View />;
  }

  if (!mediaPermission.granted) {
    console.log('Media library permission not granted');
    return (
      <View style={styles.container}>
        <InformationText style={styles.permissionsMessage}>
          Nous avons besoin de votre permission pour accéder à la bibliothèque de médias
        </InformationText>
        <TouchableOpacity
          style={styles.permissionsButton}
          onPress={requestMediaPermission}
        >
          <ButtonText style={styles.permissionsButtontext}>
            Autoriser l'accès à la bibliothèque de médias
          </ButtonText>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      console.log('Attempting to take a picture');
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Picture taken:', photo);

        if (photo?.uri) {
          setPhotoUri(photo.uri);
          setPhotoHeight(photo.height); // Set the height of the photo
          console.log('Photo height:', photo.height);
        } else {
          console.error('Échec de la prise de photo');
        }
      } catch (error) {
        console.error('Erreur lors de la prise de photo', error);
      }
    }
  };

  const closePhoto = () => {
    console.log('Closing photo');
    setPhotoUri(null);
    setPhotoHeight(0); // Reset the photo height when closing the photo
  };

  const savePhotoToGallery = async (uri: string) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log('Photo saved to gallery:', asset);
      return asset.uri;
    } catch (error) {
      console.error('Error saving photo to gallery:', error);
      return null;
    }
  };

  const scanText = async () => {
    if (photoUri) {
      console.log('Preparing to scan text');
      setIsScanning(true);

      const savedUri = await savePhotoToGallery(photoUri);
      if (!savedUri) {
        console.error('Failed to save photo to gallery');
        setIsScanning(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: savedUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      let response;
      console.log(formData);
      console.log(savedUri);
      try {
        console.log('Sending image to server');
        response = await fetch(`http://${IPvillagebyca}:3000/send-img/`, {
          method: 'POST',
          body: formData,
        });

        console.log('Server response:', response);

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received from server:', data);

        router.push({
          pathname: './../../(tabs)/ScannedText',
          params: { ocrData: JSON.stringify(data) }
        });

      } catch (error) {
        console.error(error, response);
        Alert.alert(
          'Impossible de charger l\'image',
          'Vérifier l\'adresse IP réseau wifi ipconfig + containers + node .\\server.js',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        );
        return;
      } finally {
        setIsScanning(false);
      }
    }
  };

  // Determine the minHeight based on the photoHeight
  const photoStyle: ImageStyle = {
    minWidth: '90%',
    minHeight: photoHeight > 3000 ? 470 : 265,
    marginTop: photoHeight > 3000 ? 0 : 120,
    resizeMode: 'contain',
    borderRadius: 20
  };

  // Adjust the marginTop for closeButtonContainer based on photoHeight
  const closeButtonContainerStyle = {
    ...styles.closeButtonContainer,
    marginTop: photoHeight >= 4000 ? styles.closeButtonContainer.marginTop : (photoHeight > 3000 ? 100 : 130),
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoUri }} style={photoStyle} />
          <TouchableOpacity onPress={closePhoto} style={closeButtonContainerStyle}>
            <AntDesign name="close" style={styles.closeButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={scanText}
          >
            <ButtonText style={styles.buttonText}>Scanner le texte</ButtonText>
          </TouchableOpacity>
          {isScanning && (
            <Animated.View style={[styles.animatedLineContainer, animatedLineStyle]}>
              <LinearGradient
                colors={['transparent', 'white', 'transparent']}
                style={styles.animatedLine}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          )}
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.referenceLineContainer} >
            <View style={styles.targetContainer}>
              <SimpleLineIcons name="target" style={styles.targetIcon} />
              <InformationText style={styles.referenceLineText}>Cadre de repère</InformationText>
            </View>
            <View style={styles.referenceLine}></View>
          </View>
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
    width: '90%',
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
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
    bottom: '15%',
    position: 'absolute',
    zIndex: 10
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    top: '13%',
    alignItems: 'center',
  },
  scanButton: {
    paddingVertical: 15,
    marginTop: -25,
    width: 200,
    borderRadius: 50,
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
    zIndex: 10
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
    margin: 10,
    marginTop: 10, // Initial marginTop value
  },
  closeButton: {
    color: Colors.white,
    fontSize: 18
  },
  referenceLineContainer: {
    top: '7%',
  },
  referenceLine: {
    width: '90%',
    height: 630,
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: Colors.white,
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
    color: Colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  targetIcon: {
    fontSize: 14,
    color: Colors.white,
    marginRight: 5
  },
  animatedLineContainer: {
    position: 'absolute',
    top: '6%',
    left: '5%',
    right: '5%',
    height: 4,
  },
  animatedLine: {
    flex: 1,
    height: '100%',
  },
});
