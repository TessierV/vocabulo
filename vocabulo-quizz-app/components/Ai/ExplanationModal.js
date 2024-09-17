import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { BigTitle, Paragraph } from '@/constants/StyledText';
import { color, darkTheme, lightTheme } from '@/constants/Colors';
import { GradientBorderButton } from '@/components/Button';
import Bubble from '@/components/Effect/Bubble';
import InterfaceSvg from '@/SVG/InterfaceSvg';
import { ai } from '@/constants/texts';

const FeatureItem = ({ iconName, title, description, darkMode }) => (
  <View style={styles.featureItem}>
    <InterfaceSvg iconName={iconName} fillColor={darkMode ? color.darkPlum : color.darkBlue} width={18} height={18} />
    <View style={styles.featureTextContainer}>
      <Paragraph style={[styles.featureTitle, { color: darkMode ? color.neutral : lightTheme.darkShade }]}>{title}</Paragraph>
      <Paragraph style={[styles.featureText, { color: darkMode ? darkTheme.neutral : lightTheme.darkShade }]}>{description}</Paragraph>
    </View>
  </View>
);

const ExplanationModal = ({ visible, onClose, darkMode }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.bubblesContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Bubble
              key={index.toString()}
              size={Math.random() * 30 + 20}
              color={
                index % 4 === 0
                  ? darkMode
                    ? color.darkPlum
                    : color.darkBlue
                  : index % 4 === 1
                  ? darkMode
                    ? color.lightPlum
                    : color.lightBlue
                  : index % 4 === 2
                  ? darkMode
                    ? color.neutralPlum
                    : color.neutralBlue
                  : darkMode
                  ? color.darkPlum
                  : color.darkBlue
              }
              duration={5000 + Math.random() * 3000}
              delay={Math.random() * 8000}
              opacity={0.6}
            />
          ))}
        </View>

        <View
          style={[
            styles.modalContent,
            { backgroundColor: darkMode ? darkTheme.darkShade : lightTheme.dark_lightShade },
          ]}
        >
          <BigTitle style={[styles.modalTitle, { fontSize: 26, color: darkMode ? darkTheme.lightShade : lightTheme.darkShade }]}>
            Explication
          </BigTitle>

          <FeatureItem
            iconName="user_check"
            title={ai.explanation.row1.title}
            description={ai.explanation.row1.description}
            darkMode={darkMode}
          />

          <FeatureItem
            iconName="sun"
            title={ai.explanation.row2.title}
            description={ai.explanation.row2.description}
            darkMode={darkMode}
          />

          <FeatureItem
            iconName="chart"
            title={ai.explanation.row3.title}
            description={ai.explanation.row3.description}
            darkMode={darkMode}
          />

          <FeatureItem
            iconName="new"
            title={ai.explanation.row4.title}
            description={ai.explanation.row4.description}
            darkMode={darkMode}
          />

          <FeatureItem
            iconName="feedback"
            title={ai.explanation.row5.title}
            description={ai.explanation.row5.description}
            darkMode={darkMode}
          />

          <View style={{ marginTop: 10 }}>
            <GradientBorderButton
              background={darkMode ? 'dark' : 'light'}
              textColor={darkMode ? 'light' : 'dark'}
              onPress={onClose}
              text={ai.explanation.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(38, 45, 52, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    padding: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 26,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    gap: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 12,
  },
  featureText: {
    fontSize: 10,
    flexShrink: 1,
  },
});

export default ExplanationModal;
