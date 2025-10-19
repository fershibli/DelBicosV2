import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import CategoryList from '@components/CategoryList';
import ListProfessionals from '@components/ListProfessionals';

const FeedScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleTestPDF = () => {
    navigation.navigate('PaymentCompletion' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.testButton}
        onPress={handleTestPDF}
        testID="test-pdf-button">
        <Text style={styles.testButtonText}>🧪 Testar Geração de PDF</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Selecione por Categorias</Text>
      <CategoryList />
      <Text style={styles.title}>Profissionais próximos a você</Text>
      <ListProfessionals />
    </View>
  );
};

export default FeedScreen;
