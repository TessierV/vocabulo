/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  white: "#ffffff",
  whiteTransparent: "#ffffff80",

  black: "000000",

  lightGrey: "#EBEBEB",

  darkCoral: "#E18D73",
  neutralCoral: '#FFA381',
  lightCoral: "#FACDBC",

  darkGreen: "#99CDBD",
  neutralGreen: "#BFDFD2",
  lightGreen: "#DCE6E2",

  darkBlue: "#7DAED6",
  darkBlueTransparent: "#7DAED680",
  neutralBlue: "#ABCDE8",
  neutralBlueTransparent: "#ABCDE880",
  lightBlue: "#D1E6F6",

  darkPlum: "#AC83C8",
  neutralPlum: "#BE9EDF",
  lightPlum: "#EFE0FF",
  lightPlumTransparent: "#EFE0FF50",

  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
