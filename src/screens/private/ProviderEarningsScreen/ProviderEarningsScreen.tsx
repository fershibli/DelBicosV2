import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { useDashboardStore } from '@stores/Dashboard';

const ProviderEarningsScreen: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  
  const { kpis, loading, fetchEarnings } = useDashboardStore();
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    // Busca ganhos do último mês para popular os dados
    const to = new Date().toISOString().slice(0, 10);
    const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);
    fetchEarnings(from, to);
  }, [fetchEarnings]);

  const toggleBalance = () => setShowBalance(!showBalance);

  // Mocked values - in a real scenario, this would come separated from the backend
  const todayEarnings = kpis ? kpis.totalEarnings : 0;
  const weekEarnings = todayEarnings * 2.5; // Just for mockup representation
  const monthEarnings = todayEarnings * 10; // Just for mockup representation
  const availableToWithdraw = weekEarnings * 0.8; 

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Header / Saldo Principal */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Disponível para saque</Text>
        <View style={styles.balanceRow}>
          {loading ? (
             <ActivityIndicator size="small" color="#FFF" />
          ) : showBalance ? (
            <Text style={styles.balanceText}>{formatCurrency(availableToWithdraw)}</Text>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <Text style={styles.currencyText}>R$</Text>
               <Text style={styles.balanceHidden}>••••</Text>
            </View>
          )}

          <TouchableOpacity onPress={toggleBalance} style={styles.eyeBtn}>
            <FontAwesome name={showBalance ? "eye-slash" : "eye"} size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnDisabled]} disabled={true} activeOpacity={0.8}>
            <FontAwesome name="money" size={16} color={colors.primaryWhite} />
            <Text style={styles.actionBtnText}>Solicitar Saque</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards de Resumo */}
      <View style={styles.cardsContainer}>
        <View style={styles.summaryCard}>
          <View style={styles.cardIcon}>
            <FontAwesome name="calendar-check-o" size={18} color={colors.primaryBlue} />
          </View>
          <Text style={styles.cardTitle}>Ganhos de Hoje</Text>
          <Text style={styles.cardValue}>{showBalance ? formatCurrency(todayEarnings) : 'R$ ••••'}</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.cardIcon}>
            <FontAwesome name="calendar" size={18} color={colors.primaryOrange} />
          </View>
          <Text style={styles.cardTitle}>Ganhos do Mês</Text>
          <Text style={styles.cardValue}>{showBalance ? formatCurrency(monthEarnings) : 'R$ ••••'}</Text>
        </View>
      </View>

      {/* Histórico */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Últimos Lançamentos</Text>
        
        {loading ? (
          <ActivityIndicator color={colors.primaryOrange} style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.emptyHistory}>
            <FontAwesome name="file-text-o" size={40} color={colors.textTertiary} />
            <Text style={styles.emptyHistoryText}>Você ainda não possui transações recentes.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProviderEarningsScreen;
