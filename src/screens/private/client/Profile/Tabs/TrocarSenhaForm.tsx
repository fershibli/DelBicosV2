import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import EyeOpen from '@assets/eye-open.png';
import EyeOff from '@assets/eye-off.png';

const TrocarSenhaForm: React.FC = () => {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const handleSalvar = () => {
    // Lógica para salvar a nova senha
  };

  return (
    <View style={styles.wrapperGeral}>
      <Text style={styles.titulo}>Trocar Senha</Text>
      <View style={styles.card}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha Atual</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              secureTextEntry={!showSenhaAtual}
              placeholder="********************"
              placeholderTextColor="#222"
            />
            <TouchableOpacity
              onPress={() => setShowSenhaAtual((v) => !v)}
              style={{ marginLeft: 8 }}>
              {showSenhaAtual ? (
                <Image
                  source={EyeOpen}
                  style={{ width: 24, height: 24, tintColor: '#222' }}
                />
              ) : (
                <Image
                  source={EyeOff}
                  style={{ width: 24, height: 24, tintColor: '#222' }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nova Senha</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry={!showNovaSenha}
              placeholder="********************"
              placeholderTextColor="#222"
            />
            <TouchableOpacity
              onPress={() => setShowNovaSenha((v) => !v)}
              style={{ marginLeft: 8 }}>
              {showNovaSenha ? (
                <Image
                  source={EyeOpen}
                  style={{ width: 24, height: 24, tintColor: '#222' }}
                />
              ) : (
                <Image
                  source={EyeOff}
                  style={{ width: 24, height: 24, tintColor: '#222' }}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.senhaRegras}>
            Sua senha deve conter no mínimo 8 caracteres até 12 caracteres{'\n'}
            com pelo menos um número, uma letra e um caractere especial.
          </Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!showConfirmarSenha}
              placeholder="********************"
              placeholderTextColor="#222"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmarSenha((v) => !v)}
              style={{ marginLeft: 8 }}>
              {showConfirmarSenha ? (
                <Image
                  source={EyeOpen}
                  style={{ width: 24, height: 24, tintColor: '#222' }}
                />
              ) : (
                <Image
                  source={EyeOff}
                  style={{ width: 24, height: 24, tintColor: '#222' }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
          <Text style={styles.btnSalvarText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexGrow: 1 }} />
      <Text style={styles.rodape}>
        © DelBicos - 2025 - Todos os direitos reservados.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperGeral: {
    flex: 1,
    backgroundColor: '#dde6f0',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: '100%',
    paddingTop: 20,
    width: '100%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    width: '100%',
    borderRadius: 12,
    elevation: 4,
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginLeft: 0,
    borderColor: '#3399ff30', // os dois últimos dígitos (80) representam a opacidade em hex (~50%)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 36,
    borderColor: '#bfc9d9',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f7fafd',
    fontSize: 15,
    color: '#222',
  },
  senhaRegras: {
    fontSize: 13,
    color: '#1a7ed6',
    marginTop: 4,
    marginBottom: 0,
    lineHeight: 16,
  },
  btnSalvar: {
    backgroundColor: '#005A93',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignSelf: 'flex-end',
    marginTop: 10,
    shadowColor: '#005A93',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  btnSalvarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rodape: {
    fontSize: 13,
    color: '#1877c9',
    marginTop: 30,
    alignSelf: 'center',
    fontWeight: '500',
  },
});

export default TrocarSenhaForm;
