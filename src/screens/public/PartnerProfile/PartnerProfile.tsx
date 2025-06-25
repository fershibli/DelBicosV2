import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SobreContent } from './SobreContent';
import { ServicosContent } from './ServicosContent';
import { GaleriaContent } from './GaleriaContent';
import { AvaliacoesContent } from './AvaliacoesContent';
import { Rating } from 'react-native-ratings';

import { parceiros } from './parceiros.mock';
import { comodidades } from './comodidades';
import VLibrasComponent from '@components/Vlibras/VLibrasComponent';

function PartnerProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [activeTab, setActiveTab] = useState<
    'sobre' | 'servicos' | 'galeria' | 'avaliacoes'
  >('sobre');

  const parceiro = parceiros.find((p) => p.id === id);

  if (!parceiro) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 20, fontSize: 16 }}>
          Parceiro não encontrado.
        </Text>
      </View>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'sobre':
        return (
          <SobreContent
            detalhes={parceiro.descricao}
            comodidadesIds={parceiro.comodidadesIds}
            todasComodidades={comodidades}
          />
        );
      case 'servicos':
        return (
          <ServicosContent
            servicos={parceiro.servicos}
            disponibilidades={parceiro.agenda}
          />
        );
      case 'galeria':
        return <GaleriaContent imagens={parceiro.galeria} />;
      case 'avaliacoes':
        return <AvaliacoesContent avaliacoes={parceiro.avaliacoes} />;
      default:
        return (
          <SobreContent
            detalhes={parceiro.descricao}
            comodidadesIds={parceiro.comodidadesIds}
            todasComodidades={comodidades}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: parceiro.imagemCapa }}
        style={styles.headerImage}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{parceiro.nome}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={12}
                readonly
                startingValue={parceiro.avaliacaoMedia}
                fractions={1}
                tintColor="black"
                style={{ marginRight: 4 }}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.addressContainer}>
        <MaterialCommunityIcons name="map-marker" size={16} color="#000" />
        <Text style={styles.addressText}>
          {`${parceiro.endereco.rua} - ${parceiro.endereco.cep} - ${parceiro.endereco.bairro} - ${parceiro.endereco.cidade} / ${parceiro.endereco.estado}`}
        </Text>
      </View>

      <View style={styles.navTabs}>
        <TouchableOpacity onPress={() => setActiveTab('sobre')}>
          <Text style={[styles.tab, activeTab === 'sobre' && styles.activeTab]}>
            Sobre
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('servicos')}>
          <Text
            style={[styles.tab, activeTab === 'servicos' && styles.activeTab]}>
            Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('galeria')}>
          <Text
            style={[styles.tab, activeTab === 'galeria' && styles.activeTab]}>
            Galeria
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('avaliacoes')}>
          <Text
            style={[
              styles.tab,
              activeTab === 'avaliacoes' && styles.activeTab,
            ]}>
            Avaliações
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
      <VLibrasComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6F0',
  },
  headerImage: {
    height: 174,
    width: '100%',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 12,
    padding: 4,
  },
  profileInfo: {
    marginBottom: 8,
  },
  profileName: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  ratingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  addressText: {
    fontSize: 11,
    fontWeight: '300',
    flexShrink: 1,
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    fontSize: 17,
    color: '#000',
  },
  activeTab: {
    color: '#FC8200',
    fontWeight: 'bold',
  },
});

export default PartnerProfileScreen;
