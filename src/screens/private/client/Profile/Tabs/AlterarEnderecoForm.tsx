import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

export default function EnderecoForm() {
  const [cep, setCep] = useState('23585-500');
  const [endereco, setEndereco] = useState('Rua Alvorada de Minas');
  const [numero, setNumero] = useState('1972');
  const [bairro, setBairro] = useState('Jardim Alvorada');
  const [uf, setUf] = useState('RJ');
  const [cidade, setCidade] = useState('Rio de Janeiro');
  // Segundo endereço (apenas visual)
  const [cep2, setCep2] = useState('01310-200');
  const [endereco2, setEndereco2] = useState('Av. Paulista');
  const [numero2, setNumero2] = useState('1000');
  const [bairro2, setBairro2] = useState('Bela Vista');
  const [uf2, setUf2] = useState('SP');
  const [cidade2, setCidade2] = useState('São Paulo');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.pageTitle}>Meus Endereços</Text>

        <View>
          {/* Card 1 */}
          <View style={styles.card}>
            <View style={styles.formContainer}>
              {/* Coluna esquerda: CEP, Número, UF */}
              <View style={styles.leftColumn}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>CEP</Text>
                  <TextInput
                    style={styles.cepInput}
                    value={cep}
                    onChangeText={setCep}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Número</Text>
                  <TextInput
                    style={styles.numeroInput}
                    value={numero}
                    onChangeText={setNumero}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>UF</Text>
                  <View style={styles.ufInput}>
                    <Picker
                      selectedValue={uf}
                      onValueChange={(itemValue) => setUf(itemValue as string)}
                      style={styles.picker}>
                      {[
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
                      ].map((sigla) => (
                        <Picker.Item key={sigla} label={sigla} value={sigla} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              {/* Coluna direita: Endereço, Bairro, Cidade */}
              <View style={styles.rightColumn}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Endereço</Text>
                  <TextInput
                    style={styles.enderecoInput}
                    value={endereco}
                    onChangeText={setEndereco}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Bairro</Text>
                  <TextInput
                    style={styles.bairroInput}
                    value={bairro}
                    onChangeText={setBairro}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Cidade</Text>
                  <TextInput
                    style={styles.cidadeInput}
                    value={cidade}
                    onChangeText={setCidade}
                  />
                </View>
              </View>
            </View>

            {/* Ações à direita */}
            <View style={styles.actionsRow}>
              <TouchableOpacity>
                <FontAwesome name="star-o" size={20} color="#0066cc" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="pencil" size={20} color="#ff6600" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="trash-o" size={20} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Botão Salvar à direita */}
            <View style={styles.saveRow}>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2 (duplicado) */}
          <View style={styles.card}>
            <View style={styles.formContainer}>
              {/* Coluna esquerda: CEP, Número, UF */}
              <View style={styles.leftColumn}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>CEP</Text>
                  <TextInput
                    style={styles.cepInput}
                    value={cep2}
                    onChangeText={setCep2}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Número</Text>
                  <TextInput
                    style={styles.numeroInput}
                    value={numero2}
                    onChangeText={setNumero2}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>UF</Text>
                  <View style={styles.ufInput}>
                    <Picker
                      selectedValue={uf2}
                      onValueChange={(itemValue) => setUf2(itemValue as string)}
                      style={styles.picker}>
                      {[
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
                      ].map((sigla) => (
                        <Picker.Item key={sigla} label={sigla} value={sigla} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              {/* Coluna direita: Endereço, Bairro, Cidade */}
              <View style={styles.rightColumn}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Endereço</Text>
                  <TextInput
                    style={styles.enderecoInput}
                    value={endereco2}
                    onChangeText={setEndereco2}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Bairro</Text>
                  <TextInput
                    style={styles.bairroInput}
                    value={bairro2}
                    onChangeText={setBairro2}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Cidade</Text>
                  <TextInput
                    style={styles.cidadeInput}
                    value={cidade2}
                    onChangeText={setCidade2}
                  />
                </View>
              </View>
            </View>

            {/* Ações à direita */}
            <View style={styles.actionsRow}>
              <TouchableOpacity>
                <FontAwesome name="star-o" size={20} color="#0066cc" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="pencil" size={20} color="#ff6600" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="trash-o" size={20} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Botão Salvar à direita */}
            <View style={styles.saveRow}>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Botão Novo Endereço centralizado */}
        <TouchableOpacity style={styles.newButton}>
          <Text style={styles.newButtonText}>+ Novo Endereço</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.rodape}>
        © DelBicos - 2025 - Todos os direitos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e0e8f0',
  },
  page: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    width: '100%',
    paddingBottom: 160,
  },
  pageTitle: {
    width: '100%',
    maxWidth: '80%',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d2b36',
    marginBottom: 12,
    alignSelf: 'flex-start',
    marginLeft: '3%',
  },

  card: {
    width: '100%',
    backgroundColor: '#f8fafd',
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: '#3399ff30', // os dois últimos dígitos (80) representam a opacidade em hex (~50%)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },

  formContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  leftColumn: {
    width: '25%',
    minWidth: 220,
  },
  rightColumn: {
    flex: 1,
  },

  // título movido para fora do card

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  inputWrapper: {
    marginRight: 4,
    marginBottom: 8,
  },

  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },

  cepInput: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    flexGrow: 0,
    flexShrink: 0,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 0 rgba(0,0,0,0.05) inset' }
      : {}),
  },

  enderecoInput: {
    width: '60%',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 0 rgba(0,0,0,0.05) inset' }
      : {}),
  },

  numeroInput: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    flexGrow: 0,
    flexShrink: 0,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 0 rgba(0,0,0,0.05) inset' }
      : {}),
  },

  bairroInput: {
    flex: 1,
    width: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 0 rgba(0,0,0,0.05) inset' }
      : {}),
  },

  ufInput: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexGrow: 0,
    flexShrink: 0,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 0 rgba(0,0,0,0.05) inset' }
      : {}),
  },

  cidadeInput: {
    flex: 1,
    width: '60%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 0 rgba(0,0,0,0.05) inset' }
      : {}),
  },

  picker: {
    height: Platform.OS === 'web' ? 46 : 50,
    width: '100%',
  },

  saveRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },

  actionsRow: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    gap: 12,
  },

  saveButton: {
    backgroundColor: '#005A93',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  newButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
  },

  newButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  rodape: {
    fontSize: 13,
    color: '#1877c9',
    marginTop: 30,
    alignSelf: 'center',
    fontWeight: '500',
  },
});
