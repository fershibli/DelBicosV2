import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { useSubCategoryStore } from '@stores/SubCategory';
import { SubCategory } from '@stores/SubCategory/types';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore, ThemeMode } from '@stores/Theme';

type SubCategoryRouteParams = {
  categoryId: number;
  categoryTitle: string;
  serviceId?: number;
};

// Configuração de Locale
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
  today: 'Hoje',
} as any;
LocaleConfig.defaultLocale = 'pt-br';

// Subcomponente Botão
const SubCategoryButton: React.FC<{
  item: SubCategory;
  onPress: () => void;
  isActive: boolean;
}> = ({ item, onPress, isActive }) => {
  const { theme } = useThemeStore();
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const [isHovered, setIsHovered] = useState(false);
  const colors = useColors();
  const styles = createStyles(colors);

  // Lógica de estilos memoizada
  const styleProps = useMemo(() => {
    let bg = colors.cardBackground;
    let border = colors.borderColor;
    let text = colors.primaryOrange;

    // Active State
    if (isActive) {
      bg = colors.primaryBlue;
      border = colors.primaryBlue;
      text = colors.primaryWhite;
    }
    // Hover State (Web)
    else if (isHovered) {
      bg = colors.backgroundElevated; // Leve destaque
      border = colors.primaryOrange;
    }

    // High Contrast Override
    if (isHighContrast) {
      border = colors.primaryBlack;
      if (isActive) {
        bg = colors.primaryBlack;
        text = colors.primaryWhite;
      }
    }

    return { bg, border, text };
  }, [isActive, isHovered, isHighContrast, colors]);

  return (
    <Pressable
      style={[
        styles.subCategoryButton,
        {
          backgroundColor: styleProps.bg,
          borderColor: styleProps.border,
          borderWidth: isHighContrast ? 2 : 1,
        },
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`Serviço ${item.title}`}>
      <Text style={[styles.subCategoryText, { color: styleProps.text }]}>
        {item.title}
      </Text>
    </Pressable>
  );
};

function SubCategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryTitle, serviceId } =
    route.params as SubCategoryRouteParams;
  const { width } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    serviceId || null,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const { subCategories, fetchSubCategoriesByCategoryId } =
    useSubCategoryStore();
  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    const loadSubCategories = async () => {
      setIsLoading(true);
      await fetchSubCategoriesByCategoryId(categoryId);
      setIsLoading(false);
    };

    loadSubCategories();

    // Cleanup (opcional se store for persistente)
    return () => {
      // useSubCategoryStore.setState({ subCategories: [] });
    };
  }, [categoryId, fetchSubCategoriesByCategoryId]);

  const handleContinue = () => {
    if (!selectedSubCategory || !selectedDate) {
      Alert.alert('Atenção', 'Por favor, selecione um serviço e uma data.');
      return;
    }
    // @ts-ignore
    navigation.navigate('SearchResult', {
      subCategoryId: selectedSubCategory,
      date: selectedDate,
    });
  };

  // Configuração de Datas Marcadas
  const markedDates = useMemo(
    () => ({
      [selectedDate || '']: {
        selected: true,
        selectedColor: colors.primaryBlue,
        disableTouchEvent: true,
        selectedTextColor: colors.primaryWhite,
      },
    }),
    [selectedDate, colors],
  );

  // Layout Responsivo
  const numColumns = width > 768 ? 2 : 1;
  const isButtonDisabled = !selectedSubCategory || !selectedDate;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContent}>
        {/* COLUNA DA ESQUERDA: SERVIÇOS */}
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>{categoryTitle || 'Serviços'}</Text>

          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primaryBlue} />
          ) : (
            <FlatList
              data={subCategories}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              key={`grid-${numColumns}`} // Força re-render
              scrollEnabled={false} // Rola junto com a ScrollView pai
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

        {/* COLUNA DA DIREITA: DATA */}
        <View style={styles.rightColumn}>
          <Text style={styles.pageTitle}>Qual Data?</Text>

          <View style={styles.calendarContainer}>
            <Calendar
              theme={{
                calendarBackground: 'transparent',
                monthTextColor: colors.primaryWhite,
                textMonthFontSize: 18,
                textMonthFontFamily: 'Afacad-Bold',
                arrowColor: colors.primaryWhite,
                textSectionTitleColor: 'rgba(255,255,255,0.8)',
                textDayHeaderFontFamily: 'Afacad-Regular',
                dayTextColor: colors.primaryWhite,
                todayTextColor: colors.primaryBlue, // Destaque "hoje"
                selectedDayBackgroundColor: colors.primaryBlue,
                selectedDayTextColor: colors.primaryWhite,
                textDisabledColor: 'rgba(255, 255, 255, 0.3)',
              }}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={markedDates}
              minDate={new Date().toISOString().split('T')[0]}
              enableSwipeMonths={true}
            />
          </View>

          <Pressable
            style={[
              styles.continueButton,
              isButtonDisabled && styles.continueButtonDisabled,
              // Efeito Hover
              isButtonHovered &&
                !isButtonDisabled && {
                  backgroundColor: colors.primaryOrangeHover || '#CC6800',
                },
            ]}
            onPress={handleContinue}
            disabled={isButtonDisabled}
            onHoverIn={() => setIsButtonHovered(true)}
            onHoverOut={() => setIsButtonHovered(false)}
            accessibilityRole="button"
            accessibilityState={{ disabled: isButtonDisabled }}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.footer}>
        © DelBicos - {new Date().getFullYear()} - Todos os direitos reservados.
      </Text>
    </ScrollView>
  );
}

export default SubCategoryScreen;
