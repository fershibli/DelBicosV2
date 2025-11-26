import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { Service } from '@stores/Professional/types';

type ServicosContentProps = {
  servicos: Service[];
};

export function ServicosContent({ servicos }: ServicosContentProps) {
  const colors = useColors();
  const styles = createStyles(colors);
  const formatarPreco = (preco: string) => {
    const valor = parseFloat(preco);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarDuracao = (minutos: number) => {
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
    // TODO: Navegar para tela de agendamento
    console.log('Agendar serviço:', servico);
  };

  const renderItem = ({ item }: { item: Service }) => (
    <View style={styles.servicoCard}>
      {item.banner_uri && (
        <Image source={{ uri: item.banner_uri }} style={styles.servicoImagem} />
      )}
      <View style={styles.servicoInfo}>
        <Text style={styles.servicoNome}>{item.title}</Text>
        {item.description && (
          <Text style={styles.servicoDescricao} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.servicoDetalhes}>
          <View style={styles.detalhesRow}>
            <Text style={styles.servicoPreco}>{formatarPreco(item.price)}</Text>
            <Text style={styles.servicoDuracao}>
              {formatarDuracao(item.duration)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.agendarButton}
          onPress={() => handleAgendar(item)}>
          <Text style={styles.agendarButtonText}>Agendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const servicosAtivos = servicos.filter((s) => s.active);

  return (
    <View style={styles.container}>
      {servicosAtivos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhum serviço disponível no momento
          </Text>
        </View>
      ) : (
        <FlatList
          data={servicosAtivos}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
        />
      )}
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.secondaryGray,
    },
    listContainer: {
      paddingBottom: 16,
    },
    servicoCard: {
      backgroundColor: 'white',
      borderRadius: 12,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
        web: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
    servicoImagem: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
    },
    servicoInfo: {
      padding: 16,
    },
    servicoNome: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    servicoDescricao: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
      lineHeight: 20,
    },
    servicoDetalhes: {
      marginBottom: 12,
    },
    detalhesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    servicoPreco: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primaryOrange,
    },
    servicoDuracao: {
      fontSize: 14,
      color: '#666',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    agendarButton: {
      backgroundColor: colors.primaryOrange,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    agendarButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    separador: {
      height: 16,
    },
    emptyContainer: {
      padding: 32,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
  });
