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
import { useRoute, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { useSubCategoryStore } from '@stores/SubCategory';
import { SubCategory } from '@stores/SubCategory/types';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import colors from '@theme/colors';

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
      {item.title}
    </Text>
  </TouchableOpacity>
);

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
};
LocaleConfig.defaultLocale = 'pt-br';

function SubCategoryScreen() {
  const navigation = useNavigation();
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
    // @ts-ignore
    navigation.navigate('SearchResult', {
      subCategoryId: selectedSubCategory,
      date: selectedDate,
    });
  };

  const markedDates = {
    [selectedDate || '']: {
      // Se a data for nula, ele não marca nada
      selected: true,
      selectedColor: colors.primaryBlue, // Cor azul para o dia selecionado
      disableTouchEvent: true,
      selectedTextColor: colors.primaryWhite,
    },
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
            <Calendar
              // Estilização principal (tema)
              theme={{
                calendarBackground: 'transparent', // O container já tem a cor

                // Texto do Mês (ex: "Outubro 2025")
                monthTextColor: colors.primaryWhite,
                textMonthFontSize: 18,
                textMonthFontFamily: 'Afacad-Bold',

                // Setas de navegação (< >)
                arrowColor: colors.primaryWhite,

                // Nomes dos dias (Dom, Seg, Ter...)
                textSectionTitleColor: colors.primaryWhite,
                textDayHeaderFontFamily: 'Afacad-Regular', // Fonte dos dias da semana

                // Números dos dias
                dayTextColor: colors.primaryWhite,
                todayTextColor: colors.primaryBlue, // Cor do dia "Hoje"
                textDisabledColor: 'rgba(255, 255, 255, 0.4)',

                // @ts-ignore: Esta é uma API de override não tipada da biblioteca
                // para estilizar o layout interno do cabeçalho.
                'stylesheet.calendar.header': {
                  header: {
                    // Este é o container SÓ do mês e das setas
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: 10,
                  },
                  week: {
                    // Este é o container SÓ dos dias da semana (Dom, Seg...)
                    marginTop: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  },
                },
              }}
              // Comportamento
              onDayPress={(day) => {
                setSelectedDate(day.dateString); // Atualiza o estado com a data selecionada
              }}
              markedDates={markedDates} // Aplica a marcação de seleção
              minDate={new Date().toISOString().split('T')[0]} // Impede seleção de datas passadas
            />
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
