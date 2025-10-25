import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { styles } from './styles'; // Reutiliza os estilos da tela
import colors from '@theme/colors';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return; // Stripe não carregou

    setIsLoading(true);
    setMessage(null);

    // Usa a URL atual + /payment-success como exemplo de retorno
    // CRIE UMA ROTA E TELA SIMPLES PARA '/payment-success' no seu NavigationStack
    const returnUrl = `${window.location.origin}/payment-success`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    // Se confirmPayment retornar um erro IMEDIATO (raro para web, mais comum validação)
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'Erro nos dados de pagamento.');
      } else {
        setMessage('Ocorreu um erro inesperado.');
      }
      setIsLoading(false); // Permite tentar novamente
    } else {
      // Se não houve erro imediato, o usuário foi (ou será) redirecionado.
      // Mostramos "Processando" enquanto o redirecionamento acontece.
      setMessage('Processando pagamento...');
      // Não definimos setIsLoading(false) aqui, pois a página será recarregada ou redirecionada.
    }
  };

  return (
    <View>
      <PaymentElement id="payment-element" />

      {message && <Text style={styles.errorMessageText}>{message}</Text>}

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          isLoading && styles.checkoutButtonDisabled,
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
