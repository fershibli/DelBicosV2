import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { useProfessionalStore } from '@stores/Professional';
import colors from '@theme/colors';
import { SobreContent } from './SobreContent';
import { ServicosContent } from './ServicosContent';
import { GaleriaContent } from './GaleriaContent';
import { AvaliacoesContent } from './AvaliacoesContent';

function ProfessionalProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  const [activeTab, setActiveTab] = useState<
    'sobre' | 'servicos' | 'galeria' | 'avaliacoes'
  >('sobre');

  const { selectedProfessional, fetchProfessionalById } =
    useProfessionalStore();
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados do profissional
  useEffect(() => {
    const loadProfessional = async () => {
      setIsLoading(true);
      await fetchProfessionalById(id);
      setIsLoading(false);
    };
    loadProfessional();
  }, [id, fetchProfessionalById]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  // Not found state
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

  const professional = selectedProfessional;

  const renderContent = () => {
    switch (activeTab) {
      case 'sobre':
        return <SobreContent professional={professional} />;
      case 'servicos':
        return <ServicosContent professional={professional} />;
      case 'galeria':
        return <GaleriaContent professional={professional} />;
      case 'avaliacoes':
        return <AvaliacoesContent professional={professional} />;
      default:
        return <SobreContent professional={professional} />;
    }
  };

  // Imagem de capa (prioridade: Service banner > Avatar > Placeholder)
  const coverImageUri =
    professional.Services?.[0]?.banner_uri ||
    professional.User.avatar_uri ||
    `https://picsum.photos/seed/${professional.id}/800/400`;

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
            <Text style={styles.profileName}>{professional.User.name}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={16}
                readonly
                startingValue={professional.rating || 0}
                fractions={1}
                tintColor="transparent"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.ratingText}>
                {(professional.rating || 0).toFixed(1)} (
                {professional.ratings_count || 0} avaliações)
              </Text>
            </View>
            {professional.Services?.[0]?.Subcategory?.name && (
              <Text style={styles.categoryText}>
                {professional.Services?.[0]?.Subcategory?.name}
              </Text>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>

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
    backgroundColor: colors.primaryWhite,
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
    height: 250,
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
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  profileInfo: {
    marginBottom: 12,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryBeige,
    backgroundColor: colors.primaryWhite,
  },
  tab: {
    fontSize: 16,
    color: colors.primaryBlack,
    paddingVertical: 4,
  },
  activeTab: {
    color: colors.primaryOrange,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryOrange,
  },
  contentContainer: {
    flex: 1,
  },
});

export default ProfessionalProfileScreen;
