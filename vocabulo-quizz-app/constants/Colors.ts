/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

export const color = {
  white: '#FFF',
  neutral: "#DDD",

  darkCoral: "#E85B27",
  neutralCoral: '#FF7F50',
  lightCoral: "#FFA381",

  darkGreen: "#69B59E",
  neutralGreen: "#A0CFBC",
  lightGreen: "#DCE6E2",

  darkBlue: "#7DAED6",
  neutralBlue: "#ABCDE8",
  lightBlue: "#D1E6F6",

  darkPlum: "#AA8AC9",
  neutralPlum: "#BA94D0",
  lightPlum: "#E9D3F5",
};

export const lightTheme = {
  darkShade: '#0D1320',
  light_darkShade: "#667BA1",
  neutral: '#8399A5',
  lightShade: '#FFF',
  dark_lightShade: '#F6F6F6',
};

export const darkTheme = {
  darkShade: '#0D1320',
  light_darkShade: "#262D34",
  neutral: '#8399A5',
  lightShade: '#FFF',
  dark_lightShade: '#DAE0E4',
};

export const grammaticalCategoryColors = {
  nom: '#94C1D7', // Blue
  "nom propre": '#528198', // Blue
  verbe: '#AC3939', // Red
  adjectif: '#93B97A', // Green
  adverbe: '#EADD8D', // Yellow
  pronom: '#9F92BC', // Violet
  préposition: '#847C4E', // Brown
  conjonction: '#DB9696', // Salmon
  déterminent: '#959693', // Gray
  autre: '#838079', // Yellow-green
};

export const grammaticalCategoryColorsDaltonian  = {
  nom: '#00B7EC', // Light Blue - Adapted for deuteranopia
  "nom propre": '#0077B8', // Medium Blue - Adapted for tritanopia
  verbe: '#F4640E', // Orange-Red - Adapted for protanopia
  adjectif: '#00A177', // Light Green - Good for deuteranopia and protanopia
  adverbe: '#F5E636', // Yellow-Gold - Good for tritanopia
  pronom: '#4B0092', // Soft Purple - Adapted for deuteranopia and tritanopia
  préposition: '#EABF71', // Olive-Brown - Suitable for all types
  conjonction: '#E47EAD', // Soft Red-Pink - Adapted for protanopia
  déterminent: '#994F00', // Neutral Gray - Works for all types
  autre: '#7E8074', // Gray-Green - Neutral for all types
};
