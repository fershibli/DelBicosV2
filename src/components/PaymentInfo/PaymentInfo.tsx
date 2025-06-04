import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

interface PaymentInfoProps {
  total: number;
  discount?: number;
  couponCode?: string;
  paymentMethod: 'PIX' | 'Cartão de Crédito' | 'Dinheiro';
  installments?: number;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  total,
  discount = 0,
  couponCode,
  paymentMethod,
  installments = 1
}) => {
  const finalAmount = total - discount;
  
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.paymentTitle}>Pagamento</Text>
      
      <View style={styles.paymentSummary}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Subtotal:</Text>
          <Text style={styles.paymentValue}>{formatCurrency(total)}</Text>
        </View>
        
        {discount > 0 && (
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Desconto:</Text>
            <Text style={[styles.paymentValue, styles.discountText]}>
              -{formatCurrency(discount)} {couponCode && `(Cupom: ${couponCode})`}
            </Text>
          </View>
        )}
        
        <View style={[styles.paymentRow, styles.totalRow]}>
          <Text style={[styles.paymentLabel, styles.totalLabel]}>Total:</Text>
          <Text style={[styles.paymentValue, styles.totalValue]}>{formatCurrency(finalAmount)}</Text>
        </View>
      </View>
      
      <View style={styles.paymentMethodContainer}>
        <Text style={styles.paymentMethodTitle}>Método de pagamento:</Text>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentMethodText}>
            {paymentMethod === 'Cartão de Crédito' 
              ? `- ${paymentMethod} (${installments}x de ${formatCurrency(finalAmount / installments)})`
              : `- ${paymentMethod}`}
          </Text>
        </View>
      </View>
      
      {paymentMethod === 'PIX' && (
        <Text style={styles.paymentNote}>Pagamento aprovado instantaneamente</Text>
      )}
    </View>
  );
};

export default PaymentInfo;