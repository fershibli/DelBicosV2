import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const AddressInfo = () => (
  <View style={styles.addressContainer}>
    <Text style={styles.addressText}>
      Rua Mascarenhas Camelo, 571, 18080-692 Vila Santana - Sorocaba/SP
    </Text>
  </View>
);

export default AddressInfo;
