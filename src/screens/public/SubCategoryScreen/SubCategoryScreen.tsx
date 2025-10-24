import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { useSubCategoryStore } from '@stores/SubCategory';
import { SubCategory } from '@stores/SubCategory/types';

type SubCategoryRouteParams = {
  categoryId: number;
  categoryTitle: string;
};

// Componente de botão reutilizável para a grade
const SubCategoryButton: React.FC<{
  item: SubCategory;
  onPress: () => void;
  isActive: boolean;
}> = ({ item, onPress, isActive }) => (
  <TouchableOpacity
    style={[
      styles.subCategoryButton,
      isActive && styles.subCategoryButtonActive,
    ]}
    onPress={onPress}>
    <Text
      style={[
        styles.subCategoryText,
        isActive && styles.subCategoryTextActive,
      ]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

function SubCategoryScreen() {
  const route = useRoute();
  const { categoryId, categoryTitle } = route.params as SubCategoryRouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { subCategories, fetchSubCategoriesByCategoryId } =
    useSubCategoryStore();

  useEffect(() => {
    const loadSubCategories = async () => {
      setIsLoading(true);

      // 3. Chame a função do store
      await fetchSubCategoriesByCategoryId(categoryId);

      setIsLoading(false);
    };

    loadSubCategories();
    // Limpa as subcategorias ao sair da tela (opcional mas recomendado)
    return () => {
      useSubCategoryStore.setState({ subCategories: [] });
    };
  }, [categoryId, fetchSubCategoriesByCategoryId]);

  const handleContinue = () => {
    if (!selectedSubCategory || !selectedDate) {
      alert('Por favor, selecione um serviço e uma data.');
      return;
    }
    // Navegar para a próxima tela (Lista de Profissionais ou Checkout)
    console.log('Navegando com:', {
      categoryId,
      subCategoryId: selectedSubCategory,
      date: selectedDate,
    });
  };

  const numColumns = Platform.OS === 'web' ? 2 : 1;
  const isButtonDisabled = !selectedSubCategory || !selectedDate;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContent}>
        {/* COLUNA DA ESQUERDA: SUB-CATEGORIAS */}
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>{categoryTitle || 'Serviços'}</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#003366" />
          ) : (
            <FlatList
              data={subCategories}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              key={numColumns}
              style={{ flex: 1 }}
              contentContainerStyle={styles.subCategoryListContainer}
              renderItem={({ item }) => (
                <SubCategoryButton
                  item={item}
                  isActive={selectedSubCategory === item.id}
                  onPress={() => setSelectedSubCategory(item.id)}
                />
              )}
            />
          )}
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.pageTitle}>Qual Data?</Text>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarPlaceholder}>
              <Text style={styles.calendarText}>
                [Componente Calendário - Ex: react-native-calendars]
              </Text>
              {/* Você pode adicionar um botão temporário para simular a seleção */}
              <TouchableOpacity onPress={() => setSelectedDate('2025-10-26')}>
                <Text
                  style={{
                    color: 'white',
                    padding: 10,
                    marginTop: 10,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }}>
                  (Simular Seleção de Data)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              isButtonDisabled && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={isButtonDisabled}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.footer}>
        © DelBicos - 2024 - Todos os direitos reservados.
      </Text>
    </ScrollView>
  );
}

export default SubCategoryScreen;
