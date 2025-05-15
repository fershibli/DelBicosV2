import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';

const ProfessionalInfo = () => (
  <View style={styles.professionalContainer}>
    <View style={styles.professionalInfoRow}>
      <Image
        source={{ uri: 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg' }}
        style={styles.partnerLogo}
      />
      <View style={styles.textContainer}>
        <Text style={styles.professionalName}>Jefferson Santos</Text>
        <Text style={styles.serviceInfo}>Serviço Nº 7522 | Solicitado em 15/11/2024 às 22:49</Text>
        <TouchableOpacity>
          <Text style={styles.viewProfessionalText}>Ver profissional</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default ProfessionalInfo;
