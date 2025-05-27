import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, FlatList, Image } from 'react-native';
import { globalStyles } from '../../../theme/globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { API_URL } from '../../../lib/constants/api';
import Button from '../../../components/Button';
import { useAuthStore } from '../../../stores/authStore';

// Mock data for services (replace with real data fetching as needed)
const mocks = {
  services: [
    { id: 1, name: 'Eletricista', description: 'Serviço de eletricista residencial e comercial.' },
    { id: 2, name: 'Encanador', description: 'Reparo e manutenção de encanamentos.' },
    { id: 3, name: 'Cabeleireiro', description: 'Cortes, penteados e tratamentos capilares.' },
    { id: 4, name: 'Veterinário', description: 'Atendimento para pets.' },
    // Adicione mais serviços conforme necessário
  ],
};

const categories = [
  { id: '1', name: 'Beleza e estética', icon: '✂️' },
  { id: '2', name: 'Serviços gerais', icon: '💡' },
  { id: '3', name: 'Reformas e reparos', icon: '🔧' },
  { id: '4', name: 'Serviços domésticos', icon: '🏠' },
  { id: '5', name: 'Saúde', icon: '🩺' },
  { id: '6', name: 'Pets', icon: '🐾' },
  { id: '7', name: 'Eventos', icon: '🎉' },
];

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [clientData, setClientData] = useState({ name: '', location: '' });
  const { phoneNumber, location } = useAuthStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!phoneNumber) return;
      try {
        const response = await axios.get(`${API_URL}/user/user/${phoneNumber}`);
        setClientData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [phoneNumber]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredServices([]);
      return;
    }
    const filtered = mocks.services.filter((service: any) =>
      service.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleCategoryPress = (category: string) => {
    alert(`Categoria selecionada: ${category}`);
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.header}>
        <Button
          title={`Estou em: ${location ? `${location.city}, ${location.state}` : 'Localização Desconhecida'}`}
          onPress={() => {}}
          style={styles.locationButton}
        />
        <Text style={styles.greeting}>Olá, {clientData.name || 'Usuário'}!</Text>
        <Text style={styles.subGreeting}>Como podemos te ajudar hoje?</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Desejo um serviço de emergência"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
      {filteredServices.length > 0 && (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceDescription}>{item.description}</Text>
            </View>
          )}
          style={styles.searchResults}
        />
      )}
      <Text style={styles.categoryTitle}>Selecione por categorias</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Button
            key={category.id}
            title={`${category.icon}\n${category.name}`}
            onPress={() => handleCategoryPress(category.name)}
            style={styles.categoryButton}
          />
        ))}
      </View>
      <View style={styles.servicesGrid}>
        <View style={styles.servicePlaceholder} />
        <View style={styles.servicePlaceholder} />
        <View style={styles.servicePlaceholder} />
        <View style={styles.servicePlaceholder} />
      </View>
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
  header: {
    marginBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  locationButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('5%'),
    alignSelf: 'flex-start',
  },
  greeting: {
    fontSize: Platform.OS === 'web' ? wp('7%') : wp('6%'),
    color: '#000000',
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
  subGreeting: {
    fontSize: wp('4%'),
    color: '#666666',
    marginTop: hp('0.5%'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Platform.OS === 'web' ? wp('50%') : wp('90%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
  },
  searchInput: {
    flex: 1,
    padding: hp('1.5%'),
    fontSize: wp('4%'),
  },
  searchIcon: {
    fontSize: wp('5%'),
  },
  searchResults: {
    width: Platform.OS === 'web' ? wp('50%') : wp('90%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    padding: wp('2%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
  },
  serviceName: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: wp('3.5%'),
    color: '#666666',
  },
  categoryTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginLeft: wp('4%'),
    marginBottom: hp('1%'),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: hp('2%'),
  },
  categoryButton: {
    alignItems: 'center',
    width: wp('30%'),
    marginBottom: hp('1.5%'),
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: wp('4%'),
  },
  servicePlaceholder: {
    width: wp('45%'),
    height: hp('15%'),
    backgroundColor: '#E0E0E0',
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
  },
});

export default HomeScreen;