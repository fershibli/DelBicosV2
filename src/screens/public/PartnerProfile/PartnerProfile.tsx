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
  ScrollView,
} from 'react-native';
import { SobreContent } from './SobreContent';
import { ServicosContent } from './ServicosContent';
import { GaleriaContent } from './GaleriaContent';
import { AvaliacoesContent } from './AvaliacoesContent';
import { Rating } from 'react-native-ratings';
<<<<<<< HEAD
import { useUserStore } from '@stores/User';

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

const gerarDisponibilidades = (
  availabilities: any[],
): Array<{ data: string; horarios: string[] }> => {
  const disponibilidades: Array<{ data: string; horarios: string[] }> = [];
  const diasNoFuturo = 7;

  for (let i = 0; i < diasNoFuturo; i++) {
    const data = new Date();
    data.setDate(data.getDate() + i);
    const dataString = data.toISOString().split('T')[0];
    const dayOfWeek = data.getDay();

    const horariosDoDia: string[] = [];

    availabilities.forEach((avail) => {
      if (avail.is_available) {
        if (avail.recurrence_pattern === 'weekly' && avail.days_of_week) {
          if (avail.days_of_week[dayOfWeek] === '1') {
            const horarios = gerarHorariosDisponiveis(
              avail.start_time,
              avail.end_time,
            );
            horariosDoDia.push(...horarios);
          }
        } else if (
          avail.recurrence_pattern === 'none' &&
          avail.start_day &&
          avail.end_day
        ) {
          const startDay = new Date(avail.start_day)
            .toISOString()
            .split('T')[0];
          const endDay = new Date(avail.end_day).toISOString().split('T')[0];
          if (dataString >= startDay && dataString <= endDay) {
            const horarios = gerarHorariosDisponiveis(
              avail.start_time,
              avail.end_time,
            );
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

const gerarHorariosDisponiveis = (
  startTime: string,
  endTime: string,
): string[] => {
  const horarios: string[] = [];
  const start = parseInt(startTime.split(':')[0]);
  const end = parseInt(endTime.split(':')[0]);

  for (let i = start; i < end; i++) {
    horarios.push(`${i.toString().padStart(2, '0')}:00`);
  }

  return horarios;
};
=======
import { useProfessionalStore } from '@stores/Professional';
import { useColors } from '@theme/ThemeProvider';
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c

function PartnerProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
<<<<<<< HEAD

  const { user } = useUserStore();

  const clientIdFromContext = user?.id ? user.id.toString() : undefined;



  const { id } = route.params as { id: string };
=======
  const { id } = route.params as { id: number };
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c

  const [activeTab, setActiveTab] = useState<
    'sobre' | 'servicos' | 'galeria' | 'avaliacoes'
  >('sobre');

  const { selectedProfessional, fetchProfessionalById } =
    useProfessionalStore();
  const [isLoading, setIsLoading] = useState(true);

  const colors = useColors();
  const styles = createStyles(colors);

  const partnerIdFromContext = professional?.user_id.toString();

  useEffect(() => {
    const loadProfessional = async () => {
      setIsLoading(true);
      await fetchProfessionalById(id);
      setIsLoading(false);
    };
    loadProfessional();
  }, [id, fetchProfessionalById]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!selectedProfessional) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Profissional não encontrado.</Text>
        <TouchableOpacity
          style={styles.backButtonError}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonTextError}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const parceiro = selectedProfessional;

  const renderContent = () => {
    switch (activeTab) {
      case 'sobre':
        return (
          <SobreContent
            nome={parceiro.User.name}
            descricao={parceiro.description}
            endereco={parceiro.MainAddress}
          />
        );
      case 'servicos':
        return <ServicosContent servicos={parceiro.Services} />;
      case 'galeria':
        return (
<<<<<<< HEAD
          <ServicosContent
            servicos={parceiro.servicos}
            disponibilidades={parceiro.disponibilidades}
            professionalId={parceiro.id}
            clientId={clientIdFromContext}
            userId={partnerIdFromContext}
=======
          <GaleriaContent
            imagens={[
              parceiro.User.banner_uri,
              parceiro.User.avatar_uri,
              ...parceiro.Services.map((s) => s.banner_uri),
            ]
              .filter(Boolean)
              .map((url, index) => ({
                id: String(index),
                url: url as string,
              }))}
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c
          />
        );
      case 'avaliacoes':
        return <AvaliacoesContent avaliacoes={parceiro.Appointments} />;
      default:
        return (
          <SobreContent
            nome={parceiro.User.name}
            descricao={parceiro.description}
            endereco={parceiro.MainAddress}
          />
        );
    }
  };

  const coverImageUri =
    parceiro.User.banner_uri ||
    parceiro.Services[0]?.banner_uri ||
    `https://picsum.photos/seed/${parceiro.id}/800/400`;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: coverImageUri }}
        style={styles.headerImage}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{parceiro.User.name}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={12}
                readonly
                startingValue={parceiro.rating || 0}
                fractions={1}
                tintColor="black"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.ratingText}>
                {(parceiro.rating || 0).toFixed(1)} (
                {parceiro.ratings_count || 0} avaliações)
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      {parceiro.MainAddress && (
        <View style={styles.addressContainer}>
          <MaterialCommunityIcons
            name="map-marker"
            size={16}
            color={colors.primaryBlack}
          />
          <Text style={styles.addressText}>
            {`${parceiro.MainAddress.street}, ${parceiro.MainAddress.number} - ${parceiro.MainAddress.neighborhood} - ${parceiro.MainAddress.city} / ${parceiro.MainAddress.state}`}
          </Text>
        </View>
      )}

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

      <ScrollView style={styles.contentContainer}>{renderContent()}</ScrollView>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryGray,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryWhite,
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: colors.primaryBlack,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.primaryWhite,
    },
    errorText: {
      fontSize: 18,
      color: colors.primaryBlack,
      marginBottom: 20,
      textAlign: 'center',
    },
    backButtonError: {
      backgroundColor: colors.primaryOrange,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    backButtonTextError: {
      color: colors.primaryWhite,
      fontSize: 16,
      fontWeight: '600',
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
      borderBottomColor: colors.secondaryBeige,
    },
    tab: {
      fontSize: 17,
      color: colors.primaryBlack,
    },
    activeTab: {
      color: colors.primaryOrange,
      fontWeight: 'bold',
    },
    contentContainer: {
      flex: 1,
    },
  });

export default PartnerProfileScreen;
