import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColors } from '@theme/ThemeProvider';

interface ExportCardProps {
  title: string;
  description: string;
  icon: 'file-excel-o' | 'file-text-o';
  onPress: () => void;
  isLoading?: boolean;
}

export const ExportCard: React.FC<ExportCardProps> = ({
  title,
  description,
  icon,
  onPress,
  isLoading,
}) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.primaryWhite }]}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.7}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: icon === 'file-excel-o' ? '#E8F5E9' : '#E3F2FD' },
        ]}>
        <FontAwesome
          name={icon}
          size={24}
          color={icon === 'file-excel-o' ? '#2E7D32' : '#1565C0'}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primaryBlack }]}>
          {title}
        </Text>
        <Text style={[styles.desc, { color: colors.textTertiary }]}>
          {description}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="download"
        size={24}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Afacad-Bold',
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    fontFamily: 'Afacad-Regular',
  },
});
