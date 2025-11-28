import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Review } from '@stores/Professional/types';
import { useColors } from '@theme/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';

type AvaliacoesContentProps = {
  avaliacoes?: Review[];
};

export function AvaliacoesContent({ avaliacoes = [] }: AvaliacoesContentProps) {
  const colors = useColors();
  const styles = createStyles(colors);

  const formatarData = (dataString: string) => {
    if (!dataString) return '';
    const date = new Date(dataString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const renderItem = ({ item }: { item: Review }) => {
    const avatarUri = item.Client?.User?.avatar_uri;
    const userName = item.Client?.User?.name || 'Usuário do DelBicos';

    return (
      <View style={styles.reviewCard}>
        {/* Cabeçalho: Avatar + Nome + Data */}
        <View style={styles.headerRow}>
          <View style={styles.avatarContainer}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatarImage, styles.avatarFallback]}>
                <FontAwesome
                  name="user"
                  size={20}
                  color={colors.textTertiary}
                />
              </View>
            )}
          </View>

          <View style={styles.headerInfo}>
            <View style={styles.topLine}>
              <Text style={styles.userName} numberOfLines={1}>
                {userName}
              </Text>
              <Text style={styles.dateText}>
                {formatarData(item.start_time)}
              </Text>
            </View>

            <View style={styles.ratingWrapper}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={14}
                readonly
                startingValue={item.rating || 0}
                fractions={1}
                tintColor={colors.primaryWhite}
                style={{ alignItems: 'flex-start' }}
              />
            </View>
          </View>
        </View>

        {/* Comentário */}
        {item.review && (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.review}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {avaliacoes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="star-o" size={50} color={colors.secondaryBeige} />
          <Text style={styles.emptyText}>
            Este profissional ainda não possui avaliações.
          </Text>
          <Text style={styles.emptySubText}>
            Seja o primeiro a avaliar após contratar um serviço!
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>O que dizem os clientes</Text>
            <Text style={styles.summaryCount}>
              {avaliacoes.length} avaliações
            </Text>
          </View>

          <FlatList
            data={avaliacoes}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      padding: 16,
      paddingBottom: 40,
    },

    // Cabeçalho da Lista (Resumo)
    summaryContainer: {
      paddingHorizontal: 16,
      paddingTop: 16,
      marginBottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    summaryTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    summaryCount: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },

    // Card de Avaliação
    reviewCard: {
      backgroundColor: colors.primaryWhite,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      }),
    },

    // Header do Card
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    avatarContainer: {
      marginRight: 12,
    },
    avatarImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.secondaryGray,
    },
    avatarFallback: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },

    headerInfo: {
      flex: 1,
      justifyContent: 'center',
      height: 48,
    },
    topLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    userName: {
      fontSize: 16,
      fontFamily: 'Afacad-SemiBold',
      color: '#333',
      flex: 1,
      marginRight: 8,
    },
    dateText: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: '#999',
    },
    ratingWrapper: {
      alignItems: 'flex-start',
    },

    // Comentário
    commentContainer: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#F5F5F5',
    },
    commentText: {
      fontSize: 15,
      fontFamily: 'Afacad-Regular',
      color: '#555',
      lineHeight: 22,
    },

    // Estado Vazio
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      marginTop: 40,
    },
    emptyText: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.textSecondary,
      marginTop: 16,
      textAlign: 'center',
    },
    emptySubText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
      textAlign: 'center',
      marginTop: 8,
    },
  });
