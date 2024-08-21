import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { darkTheme, lightTheme, color } from '@/constants/Colors';
import useDarkMode from '@/components/useDarkMode';

// Fonction pour créer des styles thématisés
const createThemedStyles = (darkMode: boolean | (() => Promise<void>)) => StyleSheet.create({
  bigtitle: {
    fontFamily: 'font-h1-bold',
    fontSize: 36,
    letterSpacing: 1,
    textTransform: 'capitalize',
    height: 50,
  },
  title: {
    fontFamily: 'font-base-bold',
    fontSize: 24,

  },
  subtitle: {
    fontFamily: 'font-base-bold',
    fontSize: 20,
    lineHeight: 20,
  },
  text: {
    fontFamily: 'font-base',
    fontSize: 16,
  },
  gridText:{
    fontFamily: 'font-base',
    fontSize: 10,
    textAlign: 'center',
  },
  button: {
    fontFamily: 'font-base',
    fontSize: 18,
  },
  annonceTitle: {
    fontFamily: 'font-h1-bold',
    fontSize: 22,
  },
  annonceParagraph: {
    fontFamily: 'font-base',
    fontSize: 14,
  },
  containerTitle: {
    fontFamily: 'font-base',
    fontSize: 18,
  },
  containerParagraph: {
    fontFamily: 'font-base',
    fontSize: 14,
  },
});

interface TextComponentProps extends TextProps {
  children: ReactNode;
}

const BigTitle = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.bigtitle, style]} {...props}>{children}</Text>;
};

const Title = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.title, style]} {...props}>{children}</Text>;
};

const Subtitle = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.subtitle, style]} {...props}>{children}</Text>;
};

const Paragraph = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.text, style]} {...props}>{children}</Text>;
};

const GridText = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.gridText, style]} {...props}>{children}</Text>;
};

const ButtonText = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.button, style]} {...props}>{children}</Text>;
};

const AnnonceTitle = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.annonceTitle, style]} {...props}>{children}</Text>;
};

const AnnonceParagraph = ({ children, style, ...props }: TextComponentProps) => {
  const [ darkMode ] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.annonceParagraph, style]} {...props}>{children}</Text>;
};

const ContainerTitle = ({ children, style, ...props }: TextComponentProps) => {
  const [darkMode] = useDarkMode();
  const styles = createThemedStyles(darkMode);
  return <Text style={[styles.containerTitle, style]} {...props}>{children}</Text>;
};

const ContainerParagraph = ({ children, style, ...props }: TextComponentProps) => {
    const [darkMode] = useDarkMode();
    const styles = createThemedStyles(darkMode);
  return <Text style={[styles.containerParagraph, style]} {...props}>{children}</Text>;
};

export {
  BigTitle,
  Title,
  Subtitle,
  Paragraph,
  GridText,
  ButtonText,
  AnnonceTitle,
  AnnonceParagraph,
  ContainerTitle,
  ContainerParagraph,
};
