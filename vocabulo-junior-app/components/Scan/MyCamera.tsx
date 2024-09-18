// This file defines a React Native component that provides a camera interface
// for taking pictures, scanning text from the captured image, and handling permissions.

import React, { useState, useRef, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { StyleSheet, TouchableOpacity, View, Image, Animated, Alert, ImageStyle } from 'react-native';
import { router } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';

import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '@/constants/Colors';
import { ButtonText, InformationText } from '@/constants/StyledText';


const IPvillagebyca = '10.10.1.126';
const IPmyHome = '192.168.1.12';
// add your IP adress here


export default function MyCamera() {
  // State to control camera facing direction ('front' or 'back')
  const [facing, setFacing] = useState<CameraType>('back');

  // States and hooks for handling camera and media library permissions
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoHeight, setPhotoHeight] = useState<number>(0); // State for photo height
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Animation value for scanning effect
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isScanning) {
      // Loop animation for scanning effect
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

  // Interpolate animation value to translate the line vertically
  const lineTranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 385],
  });

  // Style for animated line
  const animatedLineStyle = {
    transform: [{ translateY: lineTranslateY }],
  };

  // Handle case when camera permission is not granted
  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <InformationText style={styles.permissionsMessage}>
          We need your permission to access the camera
        </InformationText>
        <TouchableOpacity
          style={styles.permissionsButton}
          onPress={requestCameraPermission}
        >
          <ButtonText style={styles.permissionsButtontext}>
            Allow Camera Access
          </ButtonText>
        </TouchableOpacity>
      </View>
    );
  }

  // Handle case when media library permission is not granted
  if (!mediaPermission) {
    return <View />;
  }

  if (!mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <InformationText style={styles.permissionsMessage}>
          We need your permission to access the media library
        </InformationText>
        <TouchableOpacity
          style={styles.permissionsButton}
          onPress={requestMediaPermission}
        >
          <ButtonText style={styles.permissionsButtontext}>
            Allow Media Library Access
          </ButtonText>
        </TouchableOpacity>
      </View>
    );
  }

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          setPhotoUri(photo.uri);
          setPhotoHeight(photo.height); // Set photo height
        } else {
          console.error('Failed to take picture');
        }
      } catch (error) {
        console.error('Error taking picture', error);
      }
    }
  };

  // Function to close the photo preview
  const closePhoto = () => {
    setPhotoUri(null);
    setPhotoHeight(0); // Reset photo height
  };

  // Function to save photo to the gallery
  const savePhotoToGallery = async (uri: string) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      return asset.uri;
    } catch (error) {
      console.error('Error saving photo to gallery:', error);
      return null;
    }
  };

  // Function to scan text from the photo
  const scanText = async () => {
    if (photoUri) {
      setIsScanning(true);

      const savedUri = await savePhotoToGallery(photoUri);
      if (!savedUri) {
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
      try {
        // (change IP adress constant here)
        response = await fetch(`http://${IPvillagebyca}:3000/send-img/`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        router.push({
          pathname: './../../(tabs)/ScannedText',
          params: { ocrData: JSON.stringify(data) }
        });

      } catch (error) {
        Alert.alert(
          'Unable to upload image',
          'Check network IP address and server configuration',
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

  // Determine the style for the photo based on its height
  const photoStyle: ImageStyle = {
    minWidth: '90%',
    minHeight: photoHeight > 3000 ? 470 : 265,
    marginTop: photoHeight > 3000 ? 0 : 120,
    resizeMode: 'contain',
    borderRadius: 20
  };

  // Adjust the marginTop for the close button container based on photo height
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
    marginTop: 10,
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