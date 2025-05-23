import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Modal, ActivityIndicator, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/navigation';
import { globalStyles } from '../../theme/globalStyles';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { API_URL } from '../../lib/constants/api';
import Button from '../../components/Button';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RouteProp = ReturnType<typeof useRoute>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const { phoneNumber } = route.params as { phoneNumber: string };
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [gender, setGender] = useState<string>('Selecione');
  const [location, setLocation] = useState<string>('Selecione');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !day || !month || !year || gender === 'Selecione' || location === 'Selecione' || !email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (!termsAccepted) {
      alert('Você deve aceitar os termos de uso e condições.');
      return;
    }

    setIsLoading(true);
    try {
      const birthDate = `${day}/${month}/${year}`;
      const response = await axios.post(`${API_URL}/auth/users`, {
        phoneNumber,
        firstName,
        lastName,
        birthDate,
        gender,
        location,
        email,
        password,
      });

      if (response.status === 201) {
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate('Home');
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      alert('Erro ao registrar. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Precisamos saber mais sobre você!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Data de aniversário</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="DD"
          value={day}
          onChangeText={setDay}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="MM"
          value={month}
          onChangeText={setMonth}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="AAAA"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione gênero" value="Selecione" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione localização" value="Selecione" />
          <Picker.Item label="São Paulo, SP" value="São Paulo, SP" />
          <Picker.Item label="Rio de Janeiro, RJ" value="Rio de Janeiro, RJ" />
          <Picker.Item label="Belo Horizonte, MG" value="Belo Horizonte, MG" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Text>{passwordVisible ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          {termsAccepted && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Aceito os termos de uso e condições</Text>
      </View>
      <Button title="Cadastrar" onPress={handleRegister} />

      <Modal
        visible={isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.modalText}>Aguarde</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6FA',
    justifyContent: 'flex-start',
  },
  logoImage: {
    width: wp('15%'),
    height: wp('15%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    alignSelf: 'center',
  },
  title: {
    fontSize: Platform.OS === 'web' ? wp('7%') : wp('6%'),
    color: '#1E88E5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: hp('2%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp('2%'),
    padding: hp('1.5%'),
    fontSize: wp('4%'),
    width: Platform.OS === 'web' ? wp('50%') : wp('90%'),
    alignSelf: 'center',
    marginBottom: hp('1.5%'),
  },
  label: {
    fontSize: wp('4%'),
    color: '#000000',
    alignSelf: 'center',
    marginBottom: hp('0.5%'),
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('1.5%'),
  },
  dateInput: {
    width: wp('15%'),
    marginHorizontal: wp('1%'),
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp('2%'),
    width: Platform.OS === 'web' ? wp('50%') : wp('90%'),
    alignSelf: 'center',
    marginBottom: hp('1.5%'),
  },
  picker: {
    height: hp('6%'),
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Platform.OS === 'web' ? wp('50%') : wp('90%'),
    alignSelf: 'center',
    marginBottom: hp('1.5%'),
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: wp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Platform.OS === 'web' ? wp('50%') : wp('90%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  checkbox: {
    width: wp('5%'),
    height: wp('5%'),
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  checkboxChecked: {
    backgroundColor: '#1E88E5',
    borderColor: '#1E88E5',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: wp('3%'),
  },
  checkboxLabel: {
    fontSize: wp('3.5%'),
    color: '#000000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1E88E5',
    padding: wp('5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    width: Platform.OS === 'web' ? wp('30%') : wp('80%'),
  },
  modalText: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    marginTop: hp('1%'),
  },
});

export default RegisterScreen;