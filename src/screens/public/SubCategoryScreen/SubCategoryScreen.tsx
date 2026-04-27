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
import { FontAwesome5 } from '@expo/vector-icons';

type SubCategoryRouteParams = {
  categoryId: number;
  categoryTitle: string;
  serviceId?: number;
};

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

const getIconForSubCategory = (title: string) => {
  const lower = title.toLowerCase();
  
  // Beleza & Estética
  if (lower.includes('cabelo') || lower.includes('barba')) return 'cut';
  if (lower.includes('depila')) return 'leaf';
  if (lower.includes('sobrancelha')) return 'eye';
  if (lower.includes('estetic') || lower.includes('massagem') || lower.includes('spa')) return 'spa';
  if (lower.includes('manicure') || lower.includes('pedicure')) return 'hand-sparkles';
  if (lower.includes('podologia')) return 'shoe-prints';
  if (lower.includes('maquiagem')) return 'magic';
  if (lower.includes('micropigmentação')) return 'pen-nib';
  if (lower.includes('unha')) return 'hand-paper';

  // Saúde & Bem Estar
  if (lower.includes('psicólog') || lower.includes('terapi') || lower.includes('mente')) return 'brain';
  if (lower.includes('fisioterap')) return 'crutch';
  if (lower.includes('nutri') || lower.includes('dieta')) return 'apple-alt';
  if (lower.includes('personal') || lower.includes('treino') || lower.includes('fit')) return 'dumbbell';
  if (lower.includes('enferm') || lower.includes('cuidador')) return 'user-nurse';
  if (lower.includes('fono')) return 'headset';
  if (lower.includes('médic') || lower.includes('consult')) return 'stethoscope';
  if (lower.includes('odonto') || lower.includes('dentis')) return 'tooth';
  if (lower.includes('acupuntura')) return 'map-pin';
  if (lower.includes('yoga') || lower.includes('medita')) return 'om';

  // Reformas & Manutenção
  if (lower.includes('eletric') || lower.includes('energia')) return 'bolt';
  if (lower.includes('encanador') || lower.includes('hidráulica')) return 'wrench';
  if (lower.includes('limpeza') || lower.includes('faxina')) return 'broom';
  if (lower.includes('pintura') || lower.includes('pintor')) return 'paint-roller';
  if (lower.includes('pedreiro') || lower.includes('construção')) return 'hard-hat';
  if (lower.includes('marcen') || lower.includes('móve') || lower.includes('madeira')) return 'hammer';
  if (lower.includes('vidro') || lower.includes('janela')) return 'border-all';
  if (lower.includes('ar-condicionado') || lower.includes('clima')) return 'snowflake';
  if (lower.includes('jardim') || lower.includes('paisag')) return 'seedling';
  
  // Pets
  if (lower.includes('banho') && lower.includes('tosa')) return 'bath';
  if (lower.includes('pet') || lower.includes('cachorro') || lower.includes('gato')) return 'paw';
  if (lower.includes('veterin')) return 'notes-medical';
  if (lower.includes('passeador') || lower.includes('dog walker')) return 'dog';
  
  // Tecnologia / Outros
  if (lower.includes('computador') || lower.includes('ti') || lower.includes('format')) return 'laptop';
  if (lower.includes('celular') || lower.includes('smartphone')) return 'mobile-alt';
  if (lower.includes('foto') || lower.includes('vídeo')) return 'camera';
  if (lower.includes('aula') || lower.includes('prof')) return 'chalkboard-teacher';
  if (lower.includes('motorista') || lower.includes('frete')) return 'truck';

  // Padrão fallback
  return 'star';
};

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

  const styleProps = useMemo(() => {
    let bg = colors.cardBackground;
    let border = colors.borderColor;
    let text = colors.primaryOrange;

    if (isActive) {
      bg = colors.primaryBlue;
      border = colors.primaryBlue;
      text = colors.primaryWhite;
    } else if (isHovered) {
      bg = colors.backgroundElevated;
      border = colors.primaryOrange;
    }

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
      accessibilityState={{ selected: isActive }}>
      <FontAwesome5 
        name={getIconForSubCategory(item.title)} 
        size={20} 
        color={styleProps.text} 
        style={styles.subCategoryIcon as any}
      />
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
  const { theme } = useThemeStore();

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
  const isDark = theme === ThemeMode.DARK;

  useEffect(() => {
    const loadSubCategories = async () => {
      setIsLoading(true);
      await fetchSubCategoriesByCategoryId(categoryId);
      setIsLoading(false);
    };
    loadSubCategories();
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

  const markedDates = useMemo(
    () => ({
      [selectedDate || '']: {
        selected: true,
        disableTouchEvent: true,
      },
    }),
    [selectedDate],
  );

  const numColumns = width > 768 ? 2 : 1;
  const isButtonDisabled = !selectedSubCategory || !selectedDate;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContent}>
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>{categoryTitle || 'Serviços'}</Text>

          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primaryBlue} />
          ) : (
            <FlatList
              data={subCategories}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              key={`grid-${numColumns}`}
              scrollEnabled={false}
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
              key={isDark ? 'dark-cal' : 'light-cal'}
              theme={{
                // --- FUNDO ---
                calendarBackground: 'transparent',

                // --- TEXTOS ---
                textDayFontFamily: 'Afacad-Regular',
                textMonthFontFamily: 'Afacad-Bold',
                textDayHeaderFontFamily: 'Afacad-SemiBold',

                monthTextColor: '#ffffff',
                textSectionTitleColor: '#ffffff',
                dayTextColor: '#ffffff',
                textDisabledColor: 'rgba(255, 255, 255, 0.4)',

                // --- SETAS ---
                arrowColor: '#ffffff',
                disabledArrowColor: 'rgba(255, 255, 255, 0.4)',

                // --- HOJE ---
                todayTextColor: '#ffffff',
                todayDotColor: '#ffffff',

                // --- SELEÇÃO ---
                selectedDayBackgroundColor: '#ffffff',
                selectedDayTextColor: colors.primaryOrange,
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
              isButtonHovered &&
                !isButtonDisabled && {
                  backgroundColor: colors.primaryOrangeHover || '#CC6800',
                },
            ]}
            onPress={handleContinue}
            disabled={isButtonDisabled}
            onHoverIn={() => setIsButtonHovered(true)}
            onHoverOut={() => setIsButtonHovered(false)}>
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
