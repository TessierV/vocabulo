import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoExample = ({ videoUrl }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        useNativeControls
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
});

export default VideoExample;
