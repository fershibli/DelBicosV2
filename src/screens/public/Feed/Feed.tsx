import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocation } from '@lib/util/LocationContext';
import { styles } from './styles';

// Mock de dados para o feed de "bicos"
const bicos = [
  {
    id: 1,
    title: 'Entrega de Pacote',
    description: 'Entregar um pacote pequeno no centro da cidade.',
    location: 'São Paulo, SP',
  },
  {
    id: 2,
    title: 'Limpeza Residencial',
    description: 'Limpeza de apartamento de 2 quartos.',
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: 3,
    title: 'Montagem de Móveis',
    description: 'Montar uma estante IKEA na casa do cliente.',
    location: 'Curitiba, PR',
  },
];

function FeedScreen() {
  const { city, state } = useLocation();

  const handleBicoDetails = (bicoId: number) => {
    console.log(`Navegando para detalhes do bico ${bicoId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          📍 {city && state ? `${city}, ${state}` : 'Localização não definida'}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Feed de Bicos</Text>

        {bicos.map((bico) => (
          <View key={bico.id} style={styles.card}>
            <Text style={styles.cardTitle}>{bico.title}</Text>
            <Text style={styles.cardDescription}>{bico.description}</Text>
            <Text style={styles.cardLocation}>📍 {bico.location}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleBicoDetails(bico.id)}>
              <Text style={styles.buttonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default FeedScreen;
