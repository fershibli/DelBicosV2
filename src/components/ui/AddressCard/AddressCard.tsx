import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import CustomTextInput from '@components/ui/CustomTextInput';
import { createStyles } from './styles';
import { Address } from '@stores/Address';
import { useViaCepStore } from '@stores/ViaCep';
import { useColors } from '@theme/ThemeProvider';

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

export const AddressCard: React.FC<{
  addressData: Address;
  onUpdate: (id: number, data: Partial<Address>) => void;
  onDelete: (id: number) => void;
  onSetPrimary: (id: number) => void;
}> = ({ addressData, onUpdate, onDelete, onSetPrimary }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(addressData);
  const { fetchCep, loading: loadingCep, error: errorCep } = useViaCepStore();
  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    const cep = localData.postal_code?.replace(/\D/g, '');
    if (isEditing && cep && cep.length === 8) {
      (async () => {
        const data = await fetchCep(localData.postal_code);
        if (data) {
          setLocalData((prev) => ({
            ...prev,
            street: data.logradouro || prev.street,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
            neighborhood: data.bairro || prev.neighborhood,
          }));
        }
      })();
    }
  }, [localData.postal_code, isEditing, fetchCep]);

  const handleInputChange = (field: keyof Address, value: string) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    onUpdate(localData.id, localData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalData(addressData);
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.formRow}>
        <View style={{ flex: 1 }}>
          <CustomTextInput
            label="CEP"
            value={localData.postal_code}
            onChangeText={(text) => handleInputChange('postal_code', text)}
            editable={isEditing}
            style={!isEditing ? styles.inputReadOnly : styles.input}
            keyboardType="numeric"
            maxLength={9}
          />
          {isEditing && loadingCep && (
            <Text style={{ color: 'orange', marginLeft: 8 }}>
              Buscando endereço...
            </Text>
          )}
          {isEditing && errorCep && (
            <Text style={{ color: 'red', marginLeft: 8 }}>{errorCep}</Text>
          )}
        </View>
        <CustomTextInput
          label="Endereço"
          value={localData.street}
          onChangeText={(text) => handleInputChange('street', text)}
          editable={isEditing}
          style={!isEditing ? styles.inputReadOnly : styles.input}
          containerStyle={{ flex: 2 }}
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
          editable={false}
          style={styles.inputReadOnly}
          containerStyle={{ flex: 1 }}>
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
          ) : null}
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
            color={localData.isPrimary ? '#ffc107' : colors.textSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsEditing(true)}>
          <FontAwesome name="pencil" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onDelete(localData.id)}>
          <FontAwesome name="trash-o" size={22} color={colors.primaryOrange} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressCard;
