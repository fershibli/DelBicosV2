import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SobreContent } from './SobreContent';
import { ServicosContent } from './ServicosContent';
import { GaleriaContent } from './GaleriaContent';
import { AvaliacoesContent } from './AvaliacoesContent';
import { Rating } from 'react-native-ratings';

interface Professional {
  id: number;
  user_id: number;
  main_address_id: number;
  cpf: string;
  cnpj: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    active: boolean;
    avatar_uri: string | null;
    banner_uri: string | null;
    createdAt: string;
    updatedAt: string;
  };
  MainAddress?: {
    id: number;
    lat: string;
    lng: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country_iso: string;
    postal_code: string;
    user_id: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
  Services?: Array<{
    id: number;
    title: string;
    description: string;
    price: string;
    duration: number;
    banner_uri: string | null;
    active: boolean;
    subcategory_id: number;
    professional_id: number;
    createdAt: string;
    updatedAt: string;
  }>;
  Amenities?: any[];
  Gallery?: any[];
  Availabilities?: any[];
}

interface Parceiro {
  id: string;
  nome: string;
  descricao: string;
  imagemCapa: string;
  avaliacaoMedia: number;
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  servicos: Array<{
    id: number;
    nome: string;
    titulo: string;
    descricao: string;
    preco: number;
    duracao: number;
    imagem: string | null;
  }>;
  comodidadesIds: number[];
  galeria: string[];
  avaliacoes: any[];
  agenda: any[];
  disponibilidades: Array<{
    data: string;
    horarios: string[];
  }>;
}

const todasComodidades = [
  { id: 1, nome: 'Wi-Fi Gratuito' },
  { id: 2, nome: 'Estacionamento' },
  { id: 3, nome: 'Ar Condicionado' },
  { id: 4, nome: 'Aceita Cartão' },
  { id: 5, nome: 'Atendimento 24h' },
];

const gerarDisponibilidades = (availabilities: any[]): Array<{ data: string; horarios: string[] }> => {
  const disponibilidades: Array<{ data: string; horarios: string[] }> = [];
  const diasNoFuturo = 7;

  for (let i = 0; i < diasNoFuturo; i++) {
    const data = new Date();
    data.setDate(data.getDate() + i);
    const dataString = data.toISOString().split('T')[0];
    const dayOfWeek = data.getDay(); 

    const horariosDoDia: string[] = [];

    availabilities.forEach(avail => {
      if (avail.is_available) {
        if (avail.recurrence_pattern === 'weekly' && avail.days_of_week) {
          if (avail.days_of_week[dayOfWeek] === '1') {
            const horarios = gerarHorariosDisponiveis(avail.start_time, avail.end_time);
            horariosDoDia.push(...horarios);
          }
        } 
        else if (avail.recurrence_pattern === 'none' && avail.start_day && avail.end_day) {
          const startDay = new Date(avail.start_day).toISOString().split('T')[0];
          const endDay = new Date(avail.end_day).toISOString().split('T')[0];
          if (dataString >= startDay && dataString <= endDay) {
            const horarios = gerarHorariosDisponiveis(avail.start_time, avail.end_time);
            horariosDoDia.push(...horarios);
          }
        }
      }
    });

    const horariosUnicos = Array.from(new Set(horariosDoDia)).sort();
    if (horariosUnicos.length > 0) {
      disponibilidades.push({
        data: dataString,
        horarios: horariosUnicos,
      });
    }
  }

  return disponibilidades;
};

const gerarHorariosDisponiveis = (startTime: string, endTime: string): string[] => {
  const horarios: string[] = [];
  const start = parseInt(startTime.split(':')[0]);
  const end = parseInt(endTime.split(':')[0]);

  for (let i = start; i < end; i++) {
    horarios.push(`${i.toString().padStart(2, '0')}:00`);
  }

  return horarios;
};

function PartnerProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [activeTab, setActiveTab] = useState<
    'sobre' | 'servicos' | 'galeria' | 'avaliacoes'
  >('sobre');
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfessional();
  }, [id]);

  useEffect(() => {
    if (professional) {
      console.log('✅ Dados do profissional recebidos:', professional);
      console.log('👤 User:', professional.user);
      console.log('🏠 MainAddress:', professional.MainAddress);
      console.log('🔧 Services:', professional.Services);
      console.log('🕒 Availabilities:', professional.Availabilities);
    }
  }, [professional]);

  const fetchProfessional = async () => {
    try {
      setLoading(true);
      console.log('🔄 Buscando profissional com ID:', id);
      
      const response = await fetch(`http://localhost:3000/api/professionals/${id}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data: Professional = await response.json();
      console.log('📦 Dados brutos da API:', data);
      setProfessional(data);
    } catch (err) {
      console.error('❌ Erro ao buscar profissional:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const mapProfessionalToParceiro = (prof: Professional): Parceiro => {
    console.log('🗺️ Mapeando profissional para parceiro:', prof);

    const disponibilidades = prof.Availabilities ? gerarDisponibilidades(prof.Availabilities) : [];

    const parceiroMapeado = {
      id: prof.id.toString(),
      nome: prof.user?.name || 'Nome não disponível',
      descricao: prof.description || 'Descrição não disponível',
      imagemCapa: prof.user?.banner_uri || 'https://picsum.photos/400/200',
      avaliacaoMedia: 4.5,
      endereco: {
        rua: prof.MainAddress?.street || 'Endereço não informado',
        numero: prof.MainAddress?.number || 'S/N',
        complemento: prof.MainAddress?.complement || '',
        bairro: prof.MainAddress?.neighborhood || 'Bairro não informado',
        cidade: prof.MainAddress?.city || 'Cidade não informada',
        estado: prof.MainAddress?.state || 'UF',
        cep: prof.MainAddress?.postal_code || '00000-000',
      },
      servicos: (prof.Services || []).map(service => ({
        id: service.id,
        nome: service.title,
        titulo: service.title,
        descricao: service.description,
        preco: parseFloat(service.price),
        duracao: service.duration,
        imagem: service.banner_uri,
      })),
      comodidadesIds: (prof.Amenities || []).map(amenity => amenity.id),
      galeria: (prof.Gallery || []).map(item => item.image_uri || item.uri || '').filter(Boolean),
      avaliacoes: [],
      agenda: prof.Availabilities || [],
      disponibilidades: disponibilidades,
    };

    console.log('🎯 Parceiro mapeado:', parceiroMapeado);
    return parceiroMapeado;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#FC8200" />
        <Text style={{ marginTop: 10 }}>Carregando profissional...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ margin: 20, fontSize: 16, color: 'red' }}>
          Erro: {error}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfessional}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!professional) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ margin: 20, fontSize: 16 }}>
          Profissional não encontrado.
        </Text>
      </View>
    );
  }

  const parceiro = mapProfessionalToParceiro(professional);

  const renderContent = () => {
    console.log('📱 Renderizando conteúdo da aba:', activeTab);
    
    switch (activeTab) {
      case 'sobre':
        return (
          <SobreContent
            detalhes={parceiro.descricao}
            comodidadesIds={parceiro.comodidadesIds}
            todasComodidades={todasComodidades}
          />
        );
      case 'servicos':
        return (
          <ServicosContent
            servicos={parceiro.servicos}
            disponibilidades={parceiro.disponibilidades}
            professionalId={parceiro.id}
            clientId="5"
            userId="1"
          />
        );
      case 'galeria':
        return <GaleriaContent imagens={parceiro.galeria} />;
      case 'avaliacoes':
        return <AvaliacoesContent avaliacoes={parceiro.avaliacoes} />;
      default:
        return (
          <SobreContent
            detalhes={parceiro.descricao}
            comodidadesIds={parceiro.comodidadesIds}
            todasComodidades={todasComodidades}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: parceiro.imagemCapa }}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{parceiro.nome}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={12}
                readonly
                startingValue={parceiro.avaliacaoMedia}
                fractions={1}
                tintColor="black"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.ratingText}>{parceiro.avaliacaoMedia}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.addressContainer}>
        <MaterialCommunityIcons name="map-marker" size={16} color="#000" />
        <Text style={styles.addressText}>
          {`${parceiro.endereco.rua}, ${parceiro.endereco.numero} - ${parceiro.endereco.bairro}, ${parceiro.endereco.cidade} - ${parceiro.endereco.estado}`}
        </Text>
      </View>

      <View style={styles.navTabs}>
        <TouchableOpacity onPress={() => setActiveTab('sobre')}>
          <Text style={[styles.tab, activeTab === 'sobre' && styles.activeTab]}>
            Sobre
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('servicos')}>
          <Text
            style={[styles.tab, activeTab === 'servicos' && styles.activeTab]}>
            Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('galeria')}>
          <Text
            style={[styles.tab, activeTab === 'galeria' && styles.activeTab]}>
            Galeria
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('avaliacoes')}>
          <Text
            style={[
              styles.tab,
              activeTab === 'avaliacoes' && styles.activeTab,
            ]}>
            Avaliações
          </Text>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
  retryButton: {
    backgroundColor: '#FC8200',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PartnerProfileScreen;