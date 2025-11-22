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
import { useProfessionalStore } from '@stores/Professional';
import colors from '@theme/colors';

function PartnerProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  const [activeTab, setActiveTab] = useState<
    'sobre' | 'servicos' | 'galeria' | 'avaliacoes'
  >('sobre');

  const { selectedProfessional, fetchProfessionalById } =
    useProfessionalStore();
  const [isLoading, setIsLoading] = useState(true);

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

const styles = StyleSheet.create({
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