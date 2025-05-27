import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const PaymentInfo = () => (
  <View style={styles.paymentContainer}>
    <Text style={styles.paymentTitle}>Pago pelo app</Text>
    <View style={styles.paymentMethod}>
      <Text style={styles.paymentMethodText}>- PIX</Text>
    </View>
  </View>
);

export default PaymentInfo;