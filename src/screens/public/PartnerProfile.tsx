import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import {  SobreContent } from './PartnerProfile/SobreContent';
import { ServicosContent } from './PartnerProfile/ServicosContent';
import { GaleriaContent } from './PartnerProfile/GaleriaContent';
import { AvaliacoesContent } from './PartnerProfile/AvaliacoesContent';
import { Rating } from 'react-native-ratings';

type Comodidade = {
  id: string;
  nome: string;
};

type Disponibilidade = {
  data: string;
  horarios: string[];
};

const AGENDA_MOCK: Disponibilidade[] = (() => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dateString = date.toISOString().split('T')[0];
    
    dates.push({
      data: dateString,
      horarios: [
        '08:00', '09:00', '10:00', '11:00', 
        '14:00', '15:00', '16:00', '17:00'
      ]
    });
  }
  
  return dates;
})();

const comodidades: Comodidade[] = [
  { id: '1', nome: 'Acessibilidade à deficientes' },
  { id: '2', nome: 'Atendimento à crianças' },
  { id: '3', nome: 'Wifi' },
  { id: '4', nome: 'Ar-condicionado' },
  { id: '5', nome: 'Estacionamento' },
  { id: '6', nome: 'Estacionamento gratuito' },
  { id: '7', nome: 'Aceita animais' }
]

const servicos = [
  { id: '1', nome: 'Corte Masculino', preco: 'R$ 30,00', duracao: '30 min' },
  { id: '2', nome: 'Barba', preco: 'R$ 20,00', duracao: '20 min' },
  { id: '3', nome: 'Luzes', preco: 'R$ 120,00', duracao: '1h 30min' },
];

const parceiroDetalhes = {
  descricao: 'Salão especializado em cortes masculinos e barba, com atendimento personalizado e ambiente climatizado. Possuimos os melhores profissionais da região',
  comodidadesIds: ['1', '3', '5', '6', '7' ]
};



export function PartnerProfile() {
  const navigation = useNavigation();
  
  const [activeTab, setActiveTab] = useState<'sobre' | 'servicos' | 'galeria' | 'avaliacoes'>('sobre');

    const renderContent = () => {
    switch(activeTab) {
      case 'sobre':
        return <SobreContent
                 detalhes={parceiroDetalhes.descricao}
                 comodidadesIds={parceiroDetalhes.comodidadesIds}
                 todasComodidades={comodidades}
                 />;
      case 'servicos':
        return <ServicosContent 
                 servicos={servicos}
                 disponibilidades={AGENDA_MOCK}
                />;
      case 'galeria':
        return <GaleriaContent />;
      case 'avaliacoes':
        return <AvaliacoesContent />;
      default:
        return <SobreContent
                 detalhes={parceiroDetalhes.descricao}
                 comodidadesIds={parceiroDetalhes.comodidadesIds}
                 todasComodidades={comodidades}
               />;
        
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://www.shutterstock.com/image-photo/haircut-by-hairdresser-barbershop-barber-600nw-2484467169.jpg' }}
        style={styles.headerImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jefferson Santos</Text>
            <View style={styles.ratingContainer}>
            <Rating
              type='star'
              ratingCount={5}
              imageSize={12}
              readonly
              startingValue={4.6}
              fractions={1}
              tintColor='black'
              style={{ marginRight: 4 }}
            />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.addressContainer}>
        <MaterialCommunityIcons name="map-marker" size={16} color="#000" />
        <Text style={styles.addressText}>
          Rua Mascarenhas Carneio, 517- 18600-692 - Vila Santana - Sorocaba / SP
        </Text>
      </View>

      <View style={styles.navTabs}>
        <TouchableOpacity onPress={() => setActiveTab('sobre')}>
          <Text style={[styles.tab, activeTab === 'sobre' && styles.activeTab]}>Sobre</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setActiveTab('servicos')}>
          <Text style={[styles.tab, activeTab === 'servicos' && styles.activeTab]}>Serviços</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('galeria')}>
          <Text style={[styles.tab, activeTab === 'galeria' && styles.activeTab]}>Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('avaliacoes')}>
          <Text style={[styles.tab, activeTab === 'avaliacoes' && styles.activeTab]}>Avaliações</Text>
        </TouchableOpacity>

      </View>

      {renderContent()}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6F0',
  },
  headerImage: {
    height: 174,
    width: '100%',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 12,
    padding: 4,
  },
  profileInfo: {
    marginBottom: 8,
  },
  profileName: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  ratingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  addressText: {
    fontSize: 11,
    fontWeight: '300',
    flexShrink: 1,
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    fontSize: 17,
    color: '#000',
  },
  activeTab: {
    color: '#FC8200',
    fontWeight: 'bold',
  },
});