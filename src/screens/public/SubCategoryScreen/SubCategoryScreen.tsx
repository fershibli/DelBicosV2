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

// --- PLACEHOLDERS ---
// Vamos precisar criar/usar o seu store de subcategorias
// Por enquanto, usaremos dados mockados
// import { useSubCategoryStore } from '@stores/SubCategory';

// Interface para os parâmetros da rota
type SubCategoryRouteParams = {
  categoryId: number;
  categoryTitle: string;
};

// Interface para o item de Subcategoria
// (Idealmente, viria do seu store)
interface SubCategory {
  id: number;
  name: string;
}

// Dados Mockados (Substitua pelo fetch do seu store)
const MOCK_SUB_CATEGORIES: SubCategory[] = [
  { id: 1, name: 'Chaveiro' },
  { id: 2, name: 'Eletricista' },
  { id: 3, name: 'Encanador' },
  { id: 4, name: 'Gás & Água' },
  { id: 5, name: 'Limpeza pós Obra' },
  { id: 6, name: 'Marido de Aluguel' },
  { id: 7, name: 'Marceneiro' },
  { id: 8, name: 'Pedreiro' },
  { id: 9, name: 'Pintor' },
  { id: 10, name: 'Vidraceiro' },
];
// --- FIM DOS PLACEHOLDERS ---

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
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // const { fetchSubCategoriesByCategoryId } = useSubCategoryStore(); // (Quando você tiver)

  useEffect(() => {
    const loadSubCategories = async () => {
      setIsLoading(true);
      // --- LÓGICA DE BUSCA REAL (quando o store estiver pronto) ---
      // try {
      //   const data = await fetchSubCategoriesByCategoryId(categoryId);
      //   setSubCategories(data);
      // } catch (error) {
      //   console.error(error);
      // } finally {
      //   setIsLoading(false);
      // }

      // --- LÓGICA MOCKADA (para desenvolver o layout) ---
      setTimeout(() => {
        setSubCategories(MOCK_SUB_CATEGORIES);
        setIsLoading(false);
      }, 500);
    };

    loadSubCategories();
  }, [categoryId]);

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
              key={numColumns} // Força re-renderização ao mudar colunas
              style={{ flex: 1 }} // Pode deixar o style com 'flex: 1' ou vazio
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

        {/* COLUNA DA DIREITA: CALENDÁRIO */}
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
