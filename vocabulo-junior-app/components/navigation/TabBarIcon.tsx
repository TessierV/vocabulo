// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIonicons({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={25} style={[{marginBottom: -11}, style]} {...rest} />;
}

export function TabBarMaterialIcon({ style, ...rest }: IconProps<ComponentProps<typeof MaterialIcons>['name']>) {
  return <MaterialIcons size={30} style={[{marginBottom: -11}, style]} {...rest} />;
}