import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from 'react-native-chart-kit';
import colors from '@theme/colors';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDashboard } from '../../../../hooks/useDashboard';
import { useUserStore } from '@stores/User';
import DashboardDebugPanel from '@components/DashboardDebugPanel';
import type {
  ServiceByCategory,
  ServiceByMonth,
} from '@services/dashboardService';

const screenWidth = Dimensions.get('window').width;

// Configuração dos gráficos
const chartConfig = {
  backgroundColor: colors.primaryWhite,
  backgroundGradientFrom: colors.primaryWhite,
  backgroundGradientTo: colors.primaryWhite,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 90, 147, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '10',
    strokeWidth: '4',
    stroke: colors.primaryOrange,
  },
  strokeWidth: 5,
  barPercentage: 0.8,
  useShadowColorFromDataset: false,
  propsForLabels: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propsForVerticalLabels: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propsForHorizontalLabels: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: wp('3%'),
    paddingTop: hp('2%'),
  },
  headerContainer: {
    backgroundColor: colors.primaryWhite,
    padding: wp('6%'),
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    borderRadius: wp('4%'),
    elevation: 2,
    shadowColor: colors.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: wp('5%'),
    left: wp('5%'),
    zIndex: 1,
    backgroundColor: colors.primaryWhite,
    borderRadius: wp('6%'),
    width: wp('10%'),
    height: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: colors.primaryBlue,
    fontFamily: 'Afacad-Bold',
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('2.5%'),
    color: colors.primaryBlack,
    fontFamily: 'Afacad-Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
    gap: wp('2%'),
  },
  statCard: {
    width: wp('45%'),
    minHeight: hp('10%'),
    borderRadius: wp('4%'),
    elevation: 3,
    shadowColor: colors.primaryBlack,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    backgroundColor: colors.primaryWhite,
    marginBottom: hp('1.5%'),
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3%'),
    justifyContent: 'space-between',
  },
  statIconContainer: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: 'rgba(0, 90, 147, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTextContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  statNumber: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: colors.primaryBlue,
    fontFamily: 'Afacad-Bold',
    marginBottom: hp('0.5%'),
  },
  statLabel: {
    fontSize: wp('2.8%'),
    color: colors.primaryBlack,
    fontFamily: 'Afacad-Regular',
    opacity: 0.7,
    lineHeight: wp('3.2%'),
  },
  chartCard: {
    marginBottom: hp('2%'),
    borderRadius: wp('4%'),
    elevation: 3,
    shadowColor: colors.primaryBlack,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    backgroundColor: colors.primaryWhite,
    overflow: 'hidden',
  },
  chartTitle: {
    fontSize: wp('2.8%'),
    fontWeight: 'bold',
    color: colors.primaryBlue,
    fontFamily: 'Afacad-SemiBold',
    textAlign: 'center',
    padding: wp('1%'),
    paddingHorizontal: wp('1.5%'),
    paddingBottom: wp('0.5%'),
    backgroundColor: 'rgba(0, 90, 147, 0.05)',
  },
  chartContainer: {
    padding: wp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLabelsContainer: {
    padding: wp('4%'),
    backgroundColor: 'rgba(0, 90, 147, 0.05)',
  },
  progressLabel: {
    fontSize: wp('2.8%'),
    color: colors.primaryBlack,
    fontFamily: 'Afacad-Regular',
    textAlign: 'center',
    marginVertical: hp('0.2%'),
    padding: wp('1%'),
    backgroundColor: colors.primaryWhite,
    borderRadius: wp('2%'),
    marginBottom: hp('0.5%'),
  },
  bottomSpacing: {
    height: hp('10%'),
  },
});

const Dashboard = () => {
  const navigation = useNavigation();
  const { user } = useUserStore();
  const { data, loading, error, refetch } = useDashboard(user?.id || 0);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View
          style={[
            styles.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}>
          <ActivityIndicator size="large" color={colors.primaryBlue} />
          <Text style={[styles.title, { marginTop: 20 }]}>
            Carregando dados...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View
          style={[
            styles.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}>
          <Text style={[styles.title, { color: 'red' }]}>
            Erro ao carregar dados
          </Text>
          <Text style={styles.subtitle}>{error}</Text>
          <TouchableOpacity
            onPress={refetch}
            style={{
              backgroundColor: colors.primaryBlue,
              padding: 15,
              borderRadius: 8,
              marginTop: 20,
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View
          style={[
            styles.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}>
          <Text style={styles.title}>Nenhum dado disponível</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Transformar dados para os gráficos
  const servicesOverTimeData = {
    labels: data.servicesByMonth.map((item: ServiceByMonth) => item.month),
    datasets: [
      {
        data: data.servicesByMonth.map((item: ServiceByMonth) => item.count),
        color: (opacity = 1) => `rgba(252, 130, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const revenueByCategory = {
    labels: data.servicesByCategory.map((item: ServiceByCategory) =>
      item.category.substring(0, 8),
    ),
    datasets: [
      {
        data: data.servicesByCategory.map(
          (item: ServiceByCategory) => item.revenue,
        ),
        backgroundColor: [
          colors.primaryOrange,
          colors.primaryBlue,
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
        ],
      },
    ],
  };

  const serviceDistribution = data.servicesByCategory.map(
    (item: ServiceByCategory, index: number) => ({
      name: item.category,
      population: item.count,
      color: [
        colors.primaryOrange,
        colors.primaryBlue,
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
      ][index % 6],
      legendFontColor: '#7F7F7F',
      legendFontSize: 18,
    }),
  );

  const totalServices = data.servicesByCategory.reduce(
    (sum: number, item: ServiceByCategory) => sum + item.count,
    0,
  );
  const progressData = {
    labels: ['Serviços', 'Clientes', 'Avaliação'],
    data: [
      Math.min(totalServices / 100, 1), // Normalizar para 0-1
      Math.min(data.stats.activeUsers / 100, 1), // Normalizar para 0-1
      data.stats.averageRating / 5, // Normalizar para 0-1
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
              <View style={styles.backButton}>
                <ArrowBackIcon
                  style={{ color: colors.primaryBlue, fontSize: 20 }}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>📊 Dashboard DelBicos</Text>
            <Text style={styles.subtitle}>
              Acompanhe as métricas e performance da plataforma
            </Text>
          </View>

          {/* Debug Panel - Temporário */}
          <DashboardDebugPanel userId={user?.id || 1} />

          {/* Cards de Estatísticas */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <TrendingUpIcon
                    style={{
                      fontSize: 28,
                      color: colors.primaryOrange,
                    }}
                  />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>
                    R$ {data.stats.totalRevenue.toLocaleString('pt-BR')}
                  </Text>
                  <Text style={styles.statLabel}>Receita Total</Text>
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <PersonIcon
                    style={{
                      fontSize: 28,
                      color: colors.primaryBlue,
                    }}
                  />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>
                    {data.stats.activeUsers}
                  </Text>
                  <Text style={styles.statLabel}>Usuários Ativos</Text>
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <WorkIcon
                    style={{
                      fontSize: 28,
                      color: colors.primaryGreen,
                    }}
                  />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>
                    {data.stats.completedServices}
                  </Text>
                  <Text style={styles.statLabel}>Serviços Realizados</Text>
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <StarIcon
                    style={{
                      fontSize: 28,
                      color: colors.primaryOrange,
                    }}
                  />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>
                    {data.stats.averageRating.toFixed(1)}
                  </Text>
                  <Text style={styles.statLabel}>Avaliação Média</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Gráfico de Linha - Serviços ao longo do tempo */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>📈 Serviços por Mês</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={servicesOverTimeData}
                width={screenWidth - 10}
                height={320}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
          {/* Gráfico de Barras - Receita por categoria */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>💰 Receita por Categoria</Text>
            <View style={styles.chartContainer}>
              <BarChart
                data={revenueByCategory}
                width={screenWidth - 10}
                height={320}
                yAxisLabel="R$ "
                yAxisSuffix=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
          {/* Gráfico de Pizza - Distribuição de serviços */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>🎯 Distribuição de Serviços</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={serviceDistribution}
                width={screenWidth - 10}
                height={320}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 50]}
                absolute
              />
            </View>
          </View>
          {/* Gráfico de Progresso */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>📊 Progresso das Metas</Text>
            <View style={styles.chartContainer}>
              <ProgressChart
                data={progressData}
                width={screenWidth - 10}
                height={320}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
              />
            </View>
            <View style={styles.progressLabelsContainer}>
              <Text style={styles.progressLabel}>
                🛠 Serviços: {totalServices} realizados
              </Text>
              <Text style={styles.progressLabel}>
                👥 Clientes: {data.stats.activeUsers} ativos
              </Text>
              <Text style={styles.progressLabel}>
                ⭐ Avaliação: {data.stats.averageRating.toFixed(1)}/5.0
              </Text>
            </View>
          </View>
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
