import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { Service } from '@stores/Professional/types';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';

type ServicosContentProps = {
  servicos: Service[];
};

export function ServicosContent({ servicos }: ServicosContentProps) {
  const colors = useColors();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  const formatarPreco = (preco: string) => {
    const valor = parseFloat(preco);
    if (isNaN(valor)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarDuracao = (minutos: number) => {
    if (!minutos) return '-';
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;

    if (horas > 0 && mins > 0) {
      return `${horas}h ${mins}min`;
    } else if (horas > 0) {
      return `${horas}h`;
    } else {
      return `${mins}min`;
    }
  };

  const handleAgendar = (servico: Service) => {
    // @ts-ignore
    navigation.navigate('SubCategoryScreen', {
      categoryId: servico.subcategory_id,
      categoryTitle: servico.title,
      serviceId: servico.id,
    });
  };

  const renderItem = ({ item }: { item: Service }) => (
    <View style={styles.servicoCard}>
      {item.banner_uri && (
        <Image
          source={{ uri: item.banner_uri }}
          style={styles.servicoImagem}
          resizeMode="cover"
        />
      )}

      <View style={styles.servicoInfo}>
        <View style={styles.servicoHeader}>
          <Text style={styles.servicoNome} numberOfLines={2}>
            {item.title}
          </Text>
          {item.description && (
            <Text style={styles.servicoDescricao} numberOfLines={3}>
              {item.description}
            </Text>
          )}
        </View>

        <View style={styles.detalhesRow}>
          <Text style={styles.servicoPreco}>{formatarPreco(item.price)}</Text>

          <View style={styles.duracaoBadge}>
            <Text style={styles.servicoDuracao}>
              {formatarDuracao(item.duration)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.agendarButton}
          onPress={() => handleAgendar(item)}
          activeOpacity={0.8}>
          <Text style={styles.agendarButtonText}>Agendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const servicosAtivos = servicos.filter((s) => s.active);

  return (
    <View style={styles.servicosContainer}>
      {servicosAtivos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhum serviço disponível no momento.
          </Text>
        </View>
      ) : (
        <FlatList
          data={servicosAtivos}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
