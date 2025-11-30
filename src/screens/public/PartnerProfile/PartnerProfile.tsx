import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';

// Componentes de Conteúdo das Abas
import { SobreContent } from './SobreContent';
import { ServicosContent } from './ServicosContent';
import { GaleriaContent } from './GaleriaContent';
import { AvaliacoesContent } from './AvaliacoesContent';

import { useProfessionalStore } from '@stores/Professional';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

type TabType = 'sobre' | 'servicos' | 'galeria' | 'avaliacoes';

function PartnerProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  const [activeTab, setActiveTab] = useState<TabType>('sobre');
  const { selectedProfessional, fetchProfessionalById } =
    useProfessionalStore();
  const [isLoading, setIsLoading] = useState(true);

  const colors = useColors();
  const styles = createStyles(colors);

  // 1. Effect para carregar dados
  useEffect(() => {
    const loadProfessional = async () => {
      setIsLoading(true);
      await fetchProfessionalById(id);
      setIsLoading(false);
    };
    loadProfessional();
  }, [id, fetchProfessionalById]);

  const parceiro = selectedProfessional;

  // 2. useMemo declarado ANTES de qualquer retorno condicional
  const galleryImages = useMemo(() => {
    // Se não tiver parceiro carregado ainda, retorna vazio
    if (!parceiro) return [];

    // Acessando Gallery via cast 'as any' para evitar erro de tipagem se a interface estiver desatualizada
    const galleryFromBackend = (parceiro as any).Gallery || [];

    const imgs = [
      parceiro.User.banner_uri,
      parceiro.User.avatar_uri,
      ...(parceiro.Services?.map((s) => s.banner_uri) || []),
      ...galleryFromBackend.map((g: any) => g.uri),
    ].filter(Boolean) as string[];

    return imgs.map((url, index) => ({ id: String(index), url }));
  }, [parceiro]);

  // 3. Early Returns (Loading e Erro) agora podem acontecer seguramente
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!parceiro) {
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

  // --- Variáveis de Renderização ---

  const coverImageUri =
    parceiro.User.banner_uri ||
    parceiro.User.avatar_uri ||
    `https://via.placeholder.com/800x600`;

  const avatarUri = parceiro.User.avatar_uri;

  const addressShort = parceiro.MainAddress
    ? `${parceiro.MainAddress.city}, ${parceiro.MainAddress.state}`
    : 'Localização não informada';

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
        return <ServicosContent servicos={parceiro.Services || []} />;
      case 'galeria':
        return <GaleriaContent imagens={galleryImages} />;
      case 'avaliacoes':
        return <AvaliacoesContent avaliacoes={parceiro.Appointments || []} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header Imersivo com Imagem de Capa */}
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={{ uri: coverImageUri }}
          style={styles.headerImage}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.4)']}
            style={styles.gradientOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>

        {/* Card Flutuante com Avatar e Informações */}
        <View style={styles.floatingInfoCard}>
          <View style={styles.floatingCardContentRow}>
            {/* Avatar do Profissional */}
            <View style={styles.avatarContainer}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
              ) : (
                <View style={[styles.avatarImage, styles.avatarFallback]}>
                  <FontAwesome
                    name="user"
                    size={32}
                    color={colors.textTertiary}
                  />
                </View>
              )}
            </View>

            {/* Coluna de Informações (Nome, Rating, Local) */}
            <View style={styles.infoColumn}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.profileName} numberOfLines={2}>
                  {parceiro.User.name}
                </Text>
                {/* Badge de Rating */}
                <View style={styles.ratingBadge}>
                  <FontAwesome name="star" size={14} color="#FFC107" />
                  <Text style={styles.ratingValue}>
                    {parceiro.rating?.toFixed(1) || '0.0'}
                  </Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <FontAwesome
                  name="map-marker"
                  size={14}
                  color={colors.textTertiary}
                />
                <Text style={styles.locationText}>{addressShort}</Text>
                {parceiro.ratings_count ? (
                  <Text style={styles.reviewCount}>
                    • {parceiro.ratings_count} avaliações
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Menu de Navegação (Tabs) */}
      <View style={styles.tabsContainer}>
        {(['sobre', 'servicos', 'galeria', 'avaliacoes'] as TabType[]).map(
          (tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                activeTab === tab && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === tab }}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      {/* Conteúdo da Aba */}
      <View style={styles.contentWrapper}>{renderContent()}</View>
    </View>
  );
}

export default PartnerProfileScreen;
