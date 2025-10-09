import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { dashboardService } from '../../services/dashboardService';
import colors from '@theme/colors';

const DashboardDebugPanel = ({ userId }: { userId: number }) => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${result}`,
    ]);
  };

  const runDiagnostics = async () => {
    setTesting(true);
    setResults([]);

    try {
      // Teste 1: Conectividade básica
      addResult('🔍 Testando conectividade...');
      try {
        const healthResponse = await backendHttpClient.get('/api/health', {
          timeout: 5000,
        });
        addResult(`✅ Back-end respondeu: ${healthResponse.status}`);
      } catch (error: any) {
        addResult(`❌ Back-end não responde: ${error.message}`);

        // Teste alternativo - tentar qualquer endpoint
        try {
          const testResponse = await backendHttpClient.get('/', {
            timeout: 5000,
          });
          addResult(`⚠️ Back-end responde na raiz: ${testResponse.status}`);
        } catch (rootError: any) {
          addResult(
            `❌ Back-end totalmente indisponível: ${rootError.message}`,
          );
        }
      }

      // Teste 2: Endpoint de agendamentos
      addResult('📅 Testando endpoint de agendamentos...');
      try {
        const appointments = await dashboardService.getUserAppointments(userId);
        addResult(
          `✅ Agendamentos: ${JSON.stringify(appointments).substring(0, 100)}...`,
        );

        const totalAppointments =
          (appointments.asClient?.length || 0) +
          (appointments.asProfessional?.length || 0);
        addResult(`📊 Total de agendamentos: ${totalAppointments}`);

        if (totalAppointments === 0) {
          addResult(
            '⚠️ Nenhum agendamento encontrado - Dashboard usará dados mock',
          );
        }
      } catch (error: any) {
        addResult(`❌ Erro nos agendamentos: ${error.message}`);
      }

      // Teste 3: Verificar estrutura dos dados
      addResult('🔍 Verificando estrutura dos dados...');
      try {
        const stats = await dashboardService.getDashboardStats(userId);
        addResult(`✅ Estatísticas calculadas: ${JSON.stringify(stats)}`);
      } catch (error: any) {
        addResult(`❌ Erro nas estatísticas: ${error.message}`);
      }
    } catch (error: any) {
      addResult(`❌ Erro geral: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  const copyResults = () => {
    const resultsText = results.join('\n');
    Alert.alert('Resultados dos Testes', resultsText, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Debug Dashboard</Text>

      <TouchableOpacity
        style={[styles.button, testing && styles.buttonDisabled]}
        onPress={runDiagnostics}
        disabled={testing}>
        <Text style={styles.buttonText}>
          {testing ? 'Testando...' : 'Executar Diagnóstico'}
        </Text>
      </TouchableOpacity>

      {results.length > 0 && (
        <>
          <TouchableOpacity style={styles.copyButton} onPress={copyResults}>
            <Text style={styles.copyButtonText}>Ver Todos os Resultados</Text>
          </TouchableOpacity>

          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Últimos resultados:</Text>
            {results.slice(-3).map((result, index) => (
              <Text key={index} style={styles.resultText}>
                {result}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: colors.primaryBlue,
  },
  button: {
    backgroundColor: colors.primaryBlue,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: colors.primaryOrange,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  copyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  resultsContainer: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 6,
    maxHeight: 150,
  },
  resultsTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
});

export default DashboardDebugPanel;
