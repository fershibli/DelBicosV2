import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import colors from '@theme/colors';

const CATEGORIES = [
  'Chaveiro',
  'Eletricista',
  'Encanador',
  'Gás & Água',
  'Limpeza pós Obra',
  'Marido de Aluguel',
  'Marceneiro',
  'Pedreiro',
  'Pintor',
  'Vidraceiro',
];

function SearchCategory() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { width } = useWindowDimensions();
  const isWide = width >= 900; // duas colunas em telas largas

  function handleContinue() {
    if (!selectedCategory || !selectedDate) {
      Alert.alert('Quase lá!', 'Selecione uma categoria e uma data.');
      return;
    }
    // navigation.navigate('Results', {
    //   category: selectedCategory,
    //   date: selectedDate,
    // });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 28 }}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>DelBicos</Text>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionLeft}>Reformas & Reparos</Text>
        <Text style={styles.sectionRight}>Qual Data?</Text>
      </View>

      <View style={[styles.row, { flexDirection: isWide ? 'row' : 'column' }]}>
        {/* ESQUERDA: Categorias */}
        <View style={[styles.leftCol]}>
          <View style={styles.grid}>
            {CATEGORIES.map((label) => {
              const active = selectedCategory === label;
              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.catBtn, active && styles.catBtnActive]}
                  onPress={() => setSelectedCategory(label)}
                  activeOpacity={0.9}>
                  <Text
                    style={[styles.catText, active && styles.catTextActive]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Divisor (apenas em wide) */}
        {isWide && <View style={styles.divider} />}

        {/* DIREITA: Calendário + CTA */}
        <View style={styles.rightCol}>
          <View style={styles.calendarCard}>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: colors.primaryBlue,
                      },
                    }
                  : {}
              }
              theme={{
                backgroundColor: colors.primaryOrange,
                calendarBackground: colors.primaryOrange,
                textSectionTitleColor: colors.primaryWhite,
                monthTextColor: colors.primaryWhite,
                dayTextColor: colors.primaryWhite,
                todayTextColor: colors.primaryWhite,
                arrowColor: colors.primaryWhite,
              }}
              hideExtraDays={false}
              enableSwipeMonths
            />
          </View>

          <TouchableOpacity
            style={styles.cta}
            onPress={handleContinue}
            activeOpacity={0.9}>
            <Text style={styles.ctaText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>
        © DelBicos · 2025 · Todos os direitos reservados.
      </Text>
    </ScrollView>
  );
}

export default SearchCategory;
