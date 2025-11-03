import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import colors from '@theme/colors';

// Habilita LayoutAnimation no Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    // Anima a transição de abertura/fechamento
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleOpen}
        style={styles.header}
        activeOpacity={0.7}>
        <Text style={styles.title}>{title}</Text>
        <FontAwesome
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.primaryOrange} // Cor de destaque
          style={styles.icon}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.body}>
          <Text style={styles.bodyText}>{children}</Text>
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
