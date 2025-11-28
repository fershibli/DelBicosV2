import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { SobreContent } from './SobreContent';
import { ServicosContent } from './ServicosContent';
import { GaleriaContent } from './GaleriaContent';
import { AvaliacoesContent } from './AvaliacoesContent';
import { useProfessionalStore } from '@stores/Professional';
import { useColors } from '@theme/ThemeProvider';

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

  const coverImageUri =
    parceiro.User.banner_uri ||
    parceiro.User.avatar_uri ||
    `https://picsum.photos/seed/${parceiro.id}/800/600`;

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
        return <ServicosContent servicos={parceiro.Services} />;
      case 'galeria':
        const images = [
          parceiro.User.banner_uri,
          parceiro.User.avatar_uri,
          ...parceiro.Services.map((s) => s.banner_uri),
        ]
          .filter(Boolean)
          .map((url, index) => ({ id: String(index), url: url as string }));

        return <GaleriaContent imagens={images} />;
      case 'avaliacoes':
        return <AvaliacoesContent avaliacoes={parceiro.Appointments} />;
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
            colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.2)']}
            style={styles.gradientOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={28} color="white" />
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
                    size={36}
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
              onPress={() => setActiveTab(tab)}>
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
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 20,
    },
    backButtonError: {
      backgroundColor: colors.primaryOrange,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    backButtonTextError: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
    },

    // Header Styles
    headerWrapper: {
      position: 'relative',
      marginBottom: 70,
    },
    headerImage: {
      width: '100%',
      height: 220,
    },
    gradientOverlay: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 45 : 25,
      paddingHorizontal: 16,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.25)',
    },

    // Floating Card Styles
    floatingInfoCard: {
      position: 'absolute',
      bottom: -50,
      left: 16,
      right: 16,
      backgroundColor: colors.primaryWhite,
      borderRadius: 16,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
        web: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
    floatingCardContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },

    // Estilos do Avatar
    avatarContainer: {
      marginRight: 16,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: { elevation: 3 },
      }),
    },
    avatarImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: colors.primaryWhite,
    },
    avatarFallback: {
      backgroundColor: colors.secondaryGray,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Coluna de Informações (à direita do avatar)
    infoColumn: {
      flex: 1,
      justifyContent: 'center',
    },

    cardHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 6,
    },
    profileName: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      flex: 1,
      marginRight: 8,
      lineHeight: 24,
    },
    ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF8E1',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      gap: 4,
    },
    ratingValue: {
      fontSize: 14,
      fontFamily: 'Afacad-Bold',
      color: '#FFA000',
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    locationText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
    },
    reviewCount: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },

    // Tabs Styles
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.primaryWhite,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      paddingHorizontal: 16,
      paddingTop: 0,
      marginTop: 0,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    },
    tabItemActive: {
      borderBottomColor: colors.primaryOrange,
    },
    tabText: {
      fontSize: 15,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },
    tabTextActive: {
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
    },

    // Content Wrapper
    contentWrapper: {
      flex: 1,
    },
  });

export default PartnerProfileScreen;
