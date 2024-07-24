import { View } from "react-native";

import LoginScreen from './(screens)/LoginScreen'
import SignUp from './auth/sign-up/index'
import SplashScreen from "./(screens)/SplashScreen";
import Onboarding from '../components/Onboarding/Onboarding'



export default function Index() {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Onboarding />
    </View>
  );
}
