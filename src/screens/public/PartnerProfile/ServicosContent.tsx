import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AddressSelectionModal } from '../../../components/AddressSelectionModal/AddressSelectionModal';

type Servico = {
  id: string | number;
  nome: string;
  titulo?: string;
  preco: string | number;
  duracao: string | number;
  descricao?: string;
  imagem?: string | null;
};

type Disponibilidade = {
  data: string;
  horarios: string[];
};

type Address = {
  id: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  lat: number;
  lng: number;
};

type ServicosContentProps = {
  servicos: Servico[];
  disponibilidades: Disponibilidade[];
  professionalId: string;
  clientId?: string;
  userId?: string;
};

export function ServicosContent({
  servicos,
  disponibilidades,
  professionalId,
  clientId = "1",
  userId = "1",
}: ServicosContentProps) {
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [agendamentoModalVisible, setAgendamentoModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedServicoRef = useRef<Servico | null>(null);

  const isButtonEnabled = Boolean(
    selectedDate && 
    selectedTime && 
    selectedServicoRef.current && 
    selectedAddress && 
    !loading
  );
  
  useEffect(() => {
    console.log('🔍 Estado atualizado - Botão:', {
      selectedDate: !!selectedDate,
      selectedTime: !!selectedTime,
      servico: !!selectedServicoRef.current,
      address: !!selectedAddress,
      loading,
      isButtonEnabled
    });
  }, [selectedDate, selectedTime, selectedAddress, loading]);

  const getServicoNome = (servico: Servico) => {
    return servico.nome || servico.titulo || 'Serviço sem nome';
  };

  const formatPreco = (preco: string | number) => {
    if (typeof preco === 'number') {
      return `R$ ${preco.toFixed(2)}`;
    }
    return preco.includes('R$') ? preco : `R$ ${preco}`;
  };

  const formatDuracao = (duracao: string | number) => {
    if (typeof duracao === 'number') {
      return `${duracao} min`;
    }
    return duracao.includes('min') ? duracao : `${duracao} min`;
  };

  const openAgendamento = (servico: Servico) => {
    console.log('🔧 Abrindo agendamento para serviço:', servico);
    selectedServicoRef.current = servico;
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedAddress(null);
    setAddressModalVisible(true);
  };

  const handleAddressSelect = (address: Address) => {
    console.log('📍 Endereço selecionado:', address);
    console.log('📦 Serviço no ref ANTES de fechar modal:', selectedServicoRef.current);
    setSelectedAddress(address);
    setAddressModalVisible(false);
    
    setTimeout(() => {
      setAgendamentoModalVisible(true);
      console.log('📦 Serviço no ref DEPOIS de abrir modal:', selectedServicoRef.current);
    }, 100);
  };

const handleConfirmAgendamento = async () => {
  const selectedServico = selectedServicoRef.current;
  
  console.log('🎯 Iniciando confirmação do agendamento');
  console.log('📋 Dados disponíveis:', {
    selectedServico: selectedServico,
    selectedAddress: !!selectedAddress,
    selectedDate: !!selectedDate,
    selectedTime: !!selectedTime
  });
  
  if (!selectedDate || !selectedTime || !selectedServico || !selectedAddress) {
    console.log('❌ Campos faltantes:', {
      selectedDate, 
      selectedTime, 
      selectedServico: selectedServico, 
      selectedAddress: !!selectedAddress 
    });
    Alert.alert('Atenção', 'Por favor, selecione data, horário e endereço');
    return;
  }

  setLoading(true);
  console.log('🔄 Iniciando processo de agendamento...');

  try {
    const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
    
    if (isNaN(startDateTime.getTime())) {
      throw new Error('Data ou horário inválido');
    }

    const duration = Number(selectedServico.duracao);
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    const appointmentData = {
      professional_id: parseInt(professionalId),
      service_id: Number(selectedServico.id),
      client_id: parseInt(clientId),
      address_id: selectedAddress.id,
      start_time: startDateTime.toISOString(), 
      end_time: endDateTime.toISOString(),
      status: 'pending',
      notes: `Agendamento via app - ${getServicoNome(selectedServico)}`
    };

    console.log('📤 Enviando dados do agendamento:', appointmentData);
    console.log('📅 Start time (ISO):', startDateTime.toISOString());
    console.log('📅 End time (ISO):', endDateTime.toISOString());

    const response = await fetch('http://localhost:3000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    console.log('📨 Resposta da API:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erro da API:', errorData);
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }

    const appointment = await response.json();
    console.log('✅ Agendamento criado com sucesso:', appointment);
    
    Alert.alert(
      'Sucesso!', 
      `Agendamento confirmado!\n\nServiço: ${getServicoNome(selectedServico)}\nData: ${formatDate(selectedDate)}\nHorário: ${selectedTime}\nEndereço: ${formatAddressLine(selectedAddress)}`,
      [{ 
        text: 'OK', 
        onPress: () => {
          console.log('🎉 Usuário confirmou o sucesso');
          resetSelection();
        }
      }]
    );
    
  } catch (error: any) {
    console.error('💥 Erro completo no agendamento:', error);
    Alert.alert(
      'Erro no Agendamento', 
      error.message || 'Não foi possível realizar o agendamento. Tente novamente.'
    );
  } finally {
    setLoading(false);
    console.log('🏁 Processo de agendamento finalizado');
  }
};

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const formatAddressLine = (address: Address) => {
    return `${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''}`;
  };

  const resetSelection = () => {
    console.log('🔄 Resetando seleções');
    selectedServicoRef.current = null;
    setSelectedAddress(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setAgendamentoModalVisible(false);
    setAddressModalVisible(false);
  };

  const handleCloseAddressModal = () => {
    console.log('❌ Fechando modal de endereço sem selecionar');
    setAddressModalVisible(false);
  };

  const handleCloseAgendamentoModal = () => {
    console.log('❌ Fechando modal de agendamento');
    if (!loading) {
      setAgendamentoModalVisible(false);
    }
  };

  const getCurrentServico = () => {
    return selectedServicoRef.current;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <View style={styles.serviceInfoContainer}>
              <Text style={styles.serviceName}>{getServicoNome(item)}</Text>
              {item.descricao && (
                <Text style={styles.serviceDescription}>{item.descricao}</Text>
              )}
              <Text style={styles.serviceDetails}>
                {formatPreco(item.preco)} • {formatDuracao(item.duracao)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => openAgendamento(item)}>
              <Text style={styles.bookButtonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal de Seleção de Endereço */}
      <AddressSelectionModal
        visible={addressModalVisible}
        onClose={handleCloseAddressModal}
        onAddressSelect={handleAddressSelect}
        userId={userId}
      />

      {/* Modal de Agendamento (Data/Horário) */}
      <Modal
        visible={agendamentoModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseAgendamentoModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Agendar {getCurrentServico() ? getServicoNome(getCurrentServico()!) : 'Serviço'}
            </Text>

            {/* Informações do endereço selecionado */}
            {selectedAddress && (
              <View style={styles.selectedAddressContainer}>
                <Text style={styles.selectedAddressLabel}>Endereço selecionado:</Text>
                <Text style={styles.selectedAddressText}>
                  {formatAddressLine(selectedAddress)}
                </Text>
                <Text style={styles.selectedAddressNeighborhood}>
                  {selectedAddress.neighborhood}, {selectedAddress.city} - {selectedAddress.state}
                </Text>
              </View>
            )}

            {/* Informações do serviço selecionado */}
            {getCurrentServico() && (
              <View style={styles.serviceInfoModal}>
                <Text style={styles.serviceInfoLabel}>Serviço selecionado:</Text>
                <Text style={styles.serviceInfoText}>
                  {getServicoNome(getCurrentServico()!)}
                </Text>
                <Text style={styles.serviceInfoDetails}>
                  {formatPreco(getCurrentServico()!.preco)} • {formatDuracao(getCurrentServico()!.duracao)}
                </Text>
              </View>
            )}

            {disponibilidades.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>Selecione a data:</Text>
                <View style={styles.datesContainer}>
                  {disponibilidades.map((day) => (
                    <Pressable
                      key={day.data}
                      style={[
                        styles.dateButton,
                        selectedDate === day.data && styles.selectedDateButton,
                      ]}
                      onPress={() => {
                        console.log('📅 Data selecionada:', day.data);
                        setSelectedDate(day.data);
                        setSelectedTime(null);
                      }}
                      disabled={loading}>
                      <Text
                        style={
                          selectedDate === day.data
                            ? styles.selectedDateText
                            : styles.dateText
                        }>
                        {formatDate(day.data)}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {selectedDate && (
                  <>
                    <Text style={styles.sectionTitle}>Horários disponíveis:</Text>
                    <View style={styles.timesContainer}>
                      {disponibilidades
                        .find((d) => d.data === selectedDate)
                        ?.horarios.map((time) => (
                          <Pressable
                            key={time}
                            style={[
                              styles.timeButton,
                              selectedTime === time && styles.selectedTimeButton,
                            ]}
                            onPress={() => {
                              console.log('⏰ Horário selecionado:', time);
                              setSelectedTime(time);
                            }}
                            disabled={loading}>
                            <Text
                              style={
                                selectedTime === time
                                  ? styles.selectedTimeText
                                  : styles.timeText
                              }>
                              {time}
                            </Text>
                          </Pressable>
                        ))}
                    </View>
                  </>
                )}
              </>
            ) : (
              <Text style={styles.noAvailability}>
                Nenhuma disponibilidade encontrada
              </Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  !isButtonEnabled && styles.disabledButton,
                ]}
                onPress={handleConfirmAgendamento}
                disabled={!isButtonEnabled}>
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.confirmButtonText}>
                    {isButtonEnabled ? 'Confirmar Agendamento' : 'Selecione todos os campos'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cancelButton, loading && styles.disabledButton]}
                onPress={resetSelection}
                disabled={loading}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceInfoContainer: {
    flex: 1,
    marginRight: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  serviceDetails: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#FC8200',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  selectedAddressContainer: {
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#005A93',
  },
  selectedAddressLabel: {
    fontSize: 12,
    color: '#005A93',
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedAddressText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 2,
  },
  selectedAddressNeighborhood: {
    fontSize: 12,
    color: '#666',
  },
  serviceInfoModal: {
    backgroundColor: '#FFF5E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FC8200',
  },
  serviceInfoLabel: {
    fontSize: 12,
    color: '#FC8200',
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceInfoText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 2,
  },
  serviceInfoDetails: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  datesContainer: {
    marginBottom: 20,
  },
  dateButton: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedDateButton: {
    backgroundColor: '#005A93',
    borderColor: '#005A93',
  },
  dateText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
  selectedDateText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  timeButton: {
    width: 80,
    padding: 12,
    margin: 4,
    borderRadius: 6,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedTimeButton: {
    backgroundColor: '#005A93',
    borderColor: '#005A93',
  },
  timeText: {
    color: '#333',
    fontSize: 14,
  },
  selectedTimeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  noAvailability: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginVertical: 20,
    fontStyle: 'italic',
  },
  modalButtons: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  confirmButton: {
    backgroundColor: '#FC8200',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 16,
  },
});