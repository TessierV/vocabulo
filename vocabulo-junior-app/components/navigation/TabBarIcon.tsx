// Icons for TabBarNavigation in my .././app/(tabs)/_layout.tsx

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';


// Component for rendering Ionicons with a fixed size and adjusted margin
export function TabBarIonicons({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={25} style={[{ marginBottom: -11 }, style]} {...rest} />;
}

// Component for rendering MaterialIcons with a fixed size and adjusted margin
export function TabBarMaterialIcon({ style, ...rest }: IconProps<ComponentProps<typeof MaterialIcons>['name']>) {
  return <MaterialIcons size={30} style={[{ marginBottom: -11 }, style]} {...rest} />;
}

// Component for rendering MaterialCommunityIcons with a fixed size and adjusted margin
export function TabBarMaterialCommunityIcon({ style, ...rest }: IconProps<ComponentProps<typeof MaterialCommunityIcons>['name']>) {
  return <MaterialCommunityIcons size={28} style={[{ marginBottom: -11 }, style]} {...rest} />;
}
