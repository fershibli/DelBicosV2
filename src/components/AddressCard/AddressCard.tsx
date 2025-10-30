import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import CustomTextInput from '@components/CustomTextInput';
import { styles } from './styles';
import { Address } from '@stores/Address';
import colors from '@theme/colors';

interface AddressCardProps {
  addressData: Address;
  onUpdate: (id: number, data: Partial<Address>) => void;
  onDelete: (id: number) => void;
  onSetPrimary: (id: number) => void;
}

const UFs = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

export const AddressCard: React.FC<AddressCardProps> = ({
  addressData,
  onUpdate,
  onDelete,
  onSetPrimary,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // Estado local para edição, para não alterar o estado global a cada digitação
  const [localData, setLocalData] = useState(addressData);

  const handleInputChange = (field: keyof Address, value: string) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    onUpdate(localData.id, localData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalData(addressData); // Restaura os dados originais
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.formRow}>
        <CustomTextInput
          label="CEP"
          value={localData.postal_code}
          onChangeText={(text) => handleInputChange('postal_code', text)}
          editable={isEditing}
          style={!isEditing ? styles.inputReadOnly : styles.input}
        />
        <CustomTextInput
          label="Endereço"
          value={localData.street}
          onChangeText={(text) => handleInputChange('street', text)}
          editable={isEditing}
          style={!isEditing ? styles.inputReadOnly : styles.input}
          containerStyle={{ flex: 2 }} // Ocupa mais espaço
        />
      </View>

      <View style={styles.formRow}>
        <CustomTextInput
          label="Número"
          value={localData.number}
          onChangeText={(text) => handleInputChange('number', text)}
          editable={isEditing}
          keyboardType="numeric"
          style={!isEditing ? styles.inputReadOnly : styles.input}
          containerStyle={{ flex: 1 }}
        />
        <CustomTextInput
          label="Bairro"
          value={localData.neighborhood}
          onChangeText={(text) => handleInputChange('neighborhood', text)}
          editable={isEditing}
          style={!isEditing ? styles.inputReadOnly : styles.input}
          containerStyle={{ flex: 2 }}
        />
      </View>

      <View style={styles.formRow}>
        <CustomTextInput
          label="UF"
          value={localData.state}
          editable={false} // O CustomTextInput nunca será editável diretamente
          style={styles.inputReadOnly} // Aplica sempre o estilo de leitura
          containerStyle={{ flex: 1 }}>
          {/* A lógica condicional agora acontece DENTRO do CustomTextInput */}
          {isEditing ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={localData.state}
                onValueChange={(itemValue) =>
                  handleInputChange('state', itemValue as string)
                }
                style={styles.picker}>
                {UFs.map((uf) => (
                  <Picker.Item key={uf} label={uf} value={uf} />
                ))}
              </Picker>
            </View>
          ) : // Em modo de leitura, o CustomTextInput já exibe o valor `value`
          // Portanto, não precisamos renderizar nada aqui.
          null}
        </CustomTextInput>
        <CustomTextInput
          label="Cidade"
          value={localData.city}
          onChangeText={(text) => handleInputChange('city', text)}
          editable={isEditing}
          style={!isEditing ? styles.inputReadOnly : styles.input}
          containerStyle={{ flex: 2 }}
        />
      </View>

      {localData.complement && (
        <View style={styles.formRow}>
          <CustomTextInput
            label="Complemento"
            value={localData.complement || ''}
            onChangeText={(text) => handleInputChange('complement', text)}
            editable={isEditing}
            style={!isEditing ? styles.inputReadOnly : styles.input}
          />
        </View>
      )}

      {isEditing && (
        <View style={styles.saveRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleCancel}>
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSaveChanges}>
            <Text style={styles.actionButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onSetPrimary(localData.id)}>
          <FontAwesome
            name={localData.isPrimary ? 'star' : 'star-o'}
            size={22}
            color={localData.isPrimary ? '#ffc107' : colors.primaryBlue}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsEditing(true)}>
          <FontAwesome name="pencil" size={22} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onDelete(localData.id)}>
          <FontAwesome name="trash-o" size={22} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
