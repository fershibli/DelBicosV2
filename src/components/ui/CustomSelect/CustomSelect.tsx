import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

export interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: any;
  loading?: boolean;
  disabled?: boolean;

  // --- NOVAS PROPS DE ESTILO ---
  containerStyle?: StyleProp<ViewStyle>; // Estilo do container externo
  buttonStyle?: StyleProp<ViewStyle>; // Estilo do botão (caixa do select)
  textStyle?: StyleProp<TextStyle>; // Estilo do texto selecionado
  placeholderStyle?: StyleProp<TextStyle>; // Estilo do placeholder
  dropdownStyle?: StyleProp<ViewStyle>; // Estilo do modal/lista (opcional)
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Selecione...',
  error,
  loading = false,
  disabled = false,
  containerStyle,
  buttonStyle,
  textStyle,
  placeholderStyle,
}) => {
  const colors = useColors();
  const styles = createStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  // --- Renderização Web Nativa ---
  const renderWebSelect = () => {
    if (Platform.OS !== 'web') return null;
    return (
      <select
        style={styles.webSelect} // O estilo webSelect continua escondido por cima
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[
          styles.selectButton,
          !!error && styles.errorBorder,
          disabled && { opacity: 0.6 },
          buttonStyle, // <-- Aplica estilo customizado do botão
        ]}
        onPress={() => !disabled && !loading && setModalVisible(true)}
        activeOpacity={0.7}
        disabled={disabled || Platform.OS === 'web'}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primaryOrange} />
        ) : (
          <Text
            style={[
              styles.selectButtonText,
              textStyle, // <-- Aplica estilo customizado do texto
              !selectedLabel && [styles.placeholderText, placeholderStyle], // <-- Aplica estilo do placeholder
            ]}>
            {selectedLabel || placeholder}
          </Text>
        )}

        {renderWebSelect()}
      </TouchableOpacity>

      {!!error && (
        <Text style={styles.errorText}>
          {error.message || 'Campo inválido'}
        </Text>
      )}

      {/* Modal para Mobile (iOS/Android) */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{label}</Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onChange(item.value);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomSelect;
