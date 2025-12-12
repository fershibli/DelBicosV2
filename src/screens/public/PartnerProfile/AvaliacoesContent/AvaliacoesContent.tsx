import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Review } from '@stores/Professional/types';
import { useColors } from '@theme/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import { createStyles } from './styles';

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
                tintColor={colors.cardBackground}
                style={{
                  alignItems: 'flex-start',
                  backgroundColor: 'transparent',
                }}
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
          <FontAwesome name="star-o" size={50} color={colors.textTertiary} />
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
