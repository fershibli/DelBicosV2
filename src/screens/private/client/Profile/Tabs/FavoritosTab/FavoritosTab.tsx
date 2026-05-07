import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useFavoriteStore } from '@stores/Favorite';
import { useColors } from '@theme/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';

const FavoritosTab: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  const { favorites, removeFavorite, syncWithServer } = useFavoriteStore();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  const handleViewProfile = (professionalId: number) => {
    // @ts-ignore
    navigation.navigate('PartnerProfile', { id: professionalId });
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Meus Favoritos</Text>
        <View style={styles.emptyContainer}>
          <FontAwesome name="heart-o" size={64} color={colors.textTertiary} />
          <Text style={styles.emptyText}>
            Você ainda não tem profissionais favoritos.
          </Text>
          <Text style={styles.emptySubtext}>
            Adicione profissionais aos favoritos após um agendamento para
            encontrá-los facilmente aqui.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Meus Favoritos</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {favorites.map((favorite) => (
            <View
              key={favorite.professionalId}
              style={[styles.cardWrapper, isDesktop && { width: '48%' }]}>
              <View style={styles.favCard}>
                <View style={styles.favCardHeader}>
                  <Image
                    source={{
                      uri:
                        favorite.professionalAvatar ||
                        'https://via.placeholder.com/80',
                    }}
                    style={styles.favAvatar}
                  />

                  <View style={styles.favInfoContainer}>
                    <Text style={styles.favName} numberOfLines={1}>
                      {favorite.professionalName}
                    </Text>
                    {favorite.category && (
                      <Text style={styles.favCategory} numberOfLines={1}>
                        {favorite.category}
                      </Text>
                    )}
                    {favorite.serviceTitle && (
                      <Text style={styles.favServiceTitle} numberOfLines={1}>
                        {favorite.serviceTitle}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.favRemoveButton}
                    onPress={() => removeFavorite(favorite.professionalId)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={`Remover ${favorite.professionalName} dos favoritos`}>
                    <FontAwesome
                      name="heart"
                      size={20}
                      color={colors.primaryRed}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.favFooter}>
                  <TouchableOpacity
                    style={styles.favProfileButton}
                    onPress={() => handleViewProfile(favorite.professionalId)}
                    activeOpacity={0.8}>
                    <Text style={styles.favProfileButtonText}>Ver Perfil</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritosTab;
