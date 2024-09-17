// This file defines the Index component, which is the initial screen displayed when the app opens.
// It renders the ScreensLayout component, setting up the main navigation for the app.

import { View } from 'react-native';

import ScreensLayout from './screens/_layout';
import HomeScreen from './screens/HomeScreen';


export default function Index() {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      {/* Display the ScreensLayout navigation first when the app opens */}
      <HomeScreen />
    </View>
  );
}