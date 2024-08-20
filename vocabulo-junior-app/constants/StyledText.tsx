import * as React from "react";
import { ReactNode } from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { Colors } from '@/constants/Colors';


// Fonction pour créer des styles thématisés
const createThemedStyles = () => StyleSheet.create({
  bigTitle: {
    fontFamily: 'Chewy',
    fontSize: 50,
    letterSpacing: 2,
  },
  HeaderTitle: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
  },
  ButtonText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
  },
  Scannedtext: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    lineHeight: 35
  },
  Title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
  },
  InformationText: {
    fontFamily: 'MontserratRegular',
    fontSize: 12,
  },
  UserNameText: {
    fontFamily: 'Chewy',
    fontSize: 24,
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
  SourceCard: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 12,
    color: Colors.lightGrey
  },
  VideoButtonCard: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
    color: Colors.white
  },
  WordCard: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    color: Colors.grey
  },
  DefCard: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: Colors.grey
  },
  CategoryCard: {
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    color: Colors.grey
  },
});

interface TextComponentProps extends TextProps {
  children: ReactNode;
}

const BigTitle = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.bigTitle, style]} {...props}>{children}</Text>;
};

const HeaderTitle = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.HeaderTitle, style]} {...props}>{children}</Text>;
};

const ButtonText = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.ButtonText, style]} {...props}>{children}</Text>;
};
const Scannedtext = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.Scannedtext, style]} {...props}>{children}</Text>;
};
const Title = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.Title, style]} {...props}>{children}</Text>;
};
const InformationText = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.InformationText, style]} {...props}>{children}</Text>;
};
const UserNameText = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.UserNameText, style]} {...props}>{children}</Text>;
};
const OnboardingTitle = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.OnboardingTitle, style]} {...props}>{children}</Text>;
};
const OnboardingText = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.OnboardingText, style]} {...props}>{children}</Text>;
};
const SourceCard = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.SourceCard, style]} {...props}>{children}</Text>;
};
const VideoButtonCard = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.VideoButtonCard, style]} {...props}>{children}</Text>;
};
const WordCard = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.WordCard, style]} {...props}>{children}</Text>;
};
const CategoryCard = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.CategoryCard, style]} {...props}>{children}</Text>;
};
const DefCard = ({ children, style, ...props }: TextComponentProps) => {
  const styles = createThemedStyles();
  return <Text style={[styles.DefCard, style]} {...props}>{children}</Text>;
};
export {
  BigTitle,
  HeaderTitle,
  ButtonText,
  Scannedtext,
  Title,
  InformationText,
  UserNameText,
  OnboardingTitle,
  OnboardingText,
  SourceCard,
  VideoButtonCard,
  WordCard,
  DefCard,
  CategoryCard
};