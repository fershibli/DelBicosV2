import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocation } from '../lib/utils/LocationContext';

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

export function Home() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  header: {
    backgroundColor: '#003366',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50, // Espaço para o rodapé
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#003366',
    marginBottom: 10,
  },
  cardLocation: {
    fontSize: 12,
    color: '#003366',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff7f00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontSize: 12,
    color: '#003366',
  },
});
