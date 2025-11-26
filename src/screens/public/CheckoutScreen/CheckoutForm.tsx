import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const colors = useColors();
  const styles = createStyles(colors);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    const returnUrl = `${window.location.origin}/payment-status`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'Erro nos dados de pagamento.');
      } else {
        setMessage('Ocorreu um erro inesperado.');
      }
      setIsLoading(false);
    } else {
      setMessage('Processando pagamento...');
    }
  };

  return (
    <View>
      <PaymentElement id="payment-element" />

      {message && <Text style={styles.errorMessageText}>{message}</Text>}

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          (isLoading || !stripe) && styles.checkoutButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={isLoading || !stripe || !elements}>
        {isLoading ? (
          <ActivityIndicator color={colors.primaryWhite} />
        ) : (
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutForm;
