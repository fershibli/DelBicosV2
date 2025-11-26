import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFavoriteStore } from '@stores/Favorite';
import { useColors } from '@theme/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FavoritosTab: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  const { favorites, removeFavorite, syncWithServer } = useFavoriteStore();
  const navigation = useNavigation();

  // Sincroniza com servidor ao abrir a tela
  useEffect(() => {
    syncWithServer();
  }, []);

  const handleViewProfile = (professionalId: number) => {
    (navigation as any).navigate('PartnerProfile', { id: professionalId });
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Favoritos</Text>
        <View style={styles.emptyContainer}>
          <FontAwesome name="heart-o" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>
            Você ainda não tem profissionais favoritos
          </Text>
          <Text style={styles.emptySubtext}>
            Adicione profissionais aos favoritos nos agendamentos realizados
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Favoritos</Text>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {favorites.map((favorite) => (
            <View key={favorite.professionalId} style={styles.card}>
              <View style={styles.cardHeader}>
                <Image 
                  source={{ 
                    uri: favorite.professionalAvatar || 'https://via.placeholder.com/80' 
                  }} 
                  style={styles.avatar} 
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFavorite(favorite.professionalId)}
                >
                  <FontAwesome name="heart" size={20} color={colors.primaryOrange} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.cardContent}>
                <Text style={styles.professionalName}>
                  {favorite.professionalName}
                </Text>
                {favorite.category && (
                  <Text style={styles.category}>
                    {favorite.category}
                  </Text>
                )}
                {favorite.serviceTitle && (
                  <Text style={styles.serviceTitle}>
                    {favorite.serviceTitle}
                  </Text>
                )}
                <TouchableOpacity 
                  style={styles.profileButton}
                  onPress={() => handleViewProfile(favorite.professionalId)}
                >
                  <Text style={styles.profileButtonText}>Ver Perfil</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'transparent',
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.primaryBlack,
      marginBottom: 24,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primaryBlack,
      textAlign: 'center',
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    card: {
      width: '31%',
      minWidth: 200,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      shadowColor: colors.primaryBlack,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    cardHeader: {
      position: 'relative',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.secondaryGray,
    },
    removeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 4,
    },
    cardContent: {
      alignItems: 'center',
    },
    professionalName: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.primaryBlack,
      textAlign: 'center',
      marginBottom: 4,
    },
    category: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    serviceTitle: {
      fontSize: 13,
      color: colors.primaryBlack,
      textAlign: 'center',
      marginBottom: 12,
      fontWeight: '500',
    },
    profileButton: {
      backgroundColor: colors.primaryBlue,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 6,
      width: '100%',
      alignItems: 'center',
    },
    profileButtonText: {
      color: colors.primaryWhite,
      fontSize: 13,
      fontWeight: '600',
    },
  });

export default FavoritosTab;
