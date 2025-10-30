import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Professional } from '@stores/Professional/types';
import { Rating } from 'react-native-ratings';
import colors from '@theme/colors';

interface AvaliacoesContentProps {
  professional: Professional;
}

// Tipo temporário para avaliações (aguardando backend)
interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export function AvaliacoesContent({ professional }: AvaliacoesContentProps) {
  const mockReviews: Review[] = [
    {
      id: '1',
      userName: 'João Silva',
      rating: 5,
      comment: 'Excelente profissional! Muito atencioso e trabalho bem feito.',
      date: '2024-10-15',
    },
    {
      id: '2',
      userName: 'Maria Santos',
      rating: 4,
      comment: 'Muito bom, recomendo!',
      date: '2024-10-10',
    },
    {
      id: '3',
      userName: 'Pedro Oliveira',
      rating: 5,
      comment: 'Serviço impecável, voltarei a contratar com certeza.',
      date: '2024-10-05',
    },
  ];

  // Se no futuro o backend retornar Reviews[], usar:
  // const reviews = professional.Reviews || mockReviews;
  const reviews = mockReviews;

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Ainda não há avaliações para este profissional.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.averageRating}>
          {(professional.rating || 0).toFixed(1)}
        </Text>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={20}
          readonly
          startingValue={professional.rating || 0}
          fractions={1}
          style={{ marginVertical: 8 }}
        />
        <Text style={styles.totalReviews}>
          {professional.ratings_count || 0} avaliações
        </Text>
      </View>

      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={14}
              readonly
              startingValue={item.rating}
              style={styles.rating}
            />
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: colors.primaryWhite,
    alignItems: 'center',
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primaryOrange,
  },
  totalReviews: {
    fontSize: 14,
    color: colors.primaryBlack,
    marginTop: 4,
  },
  reviewsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  reviewCard: {
    backgroundColor: colors.primaryWhite,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryBlack,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  rating: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.primaryBlack,
  },
});
