import * as React from "react";
import { ReactNode } from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { Colors } from '@/constants/Colors';


// Fonction pour créer des styles thématisés
const createThemedStyles = () => StyleSheet.create({
  bigtitle: {
    fontFamily: 'Chewy',
    fontSize: 50,
    color: Colors.black,
    letterSpacing: 2,
    textAlign: 'center'
  },
  HeaderTitle: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 24,
  },
  Title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
  },
  OnboardingTitle: {
    fontFamily: 'Chewy',
    fontSize: 50,
    letterSpacing: 2,
    color: Colors.white
  },
  OnboardingText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    color: Colors.white
  },
});

interface TextComponentProps extends TextProps {
  children: ReactNode;
}

const BigTitle = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.bigtitle, style]} {...props}>{children}</Text>;
};

const HeaderTitle = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.HeaderTitle, style]} {...props}>{children}</Text>;
};

const Title = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.Title, style]} {...props}>{children}</Text>;
};
const OnboardingTitle = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.OnboardingTitle, style]} {...props}>{children}</Text>;
};
const OnboardingText = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.OnboardingText, style]} {...props}>{children}</Text>;
};
export {
  BigTitle,
  HeaderTitle,
  Title,
  OnboardingTitle,
  OnboardingText
};