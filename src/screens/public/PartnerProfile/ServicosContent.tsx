import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Image
} from 'react-native';

type Servico = {
  id: number;
  title: string;
  description?: string;
  price: number;
  duration: number;
  bannerImg?: string;
};

type Disponibilidade = {
  date: string;
  times: string[];
};

type ServicosContentProps = {
  servicos: Servico[];
  disponibilidades: Disponibilidade[];
};

export function ServicosContent({
  servicos = [],
  disponibilidades = []
}: ServicosContentProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const openAgendamento = (servico: Servico) => {
    setSelectedServico(servico);
    setSelectedDate(null);
    setSelectedTime(null);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (!selectedServico || !selectedDate || !selectedTime) {
      alert('Por favor, selecione uma data e horário');
      return;
    }

    alert(
      `Agendado: ${selectedServico.title}\n` +
      `Preço: ${formatCurrency(selectedServico.price)}\n` +
      `Data: ${formatDate(selectedDate)}\n` +
      `Horário: ${selectedTime}`
    );
    setModalVisible(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <View style={styles.container}>
      {servicos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum serviço disponível</Text>
        </View>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.serviceCard}>
              {item.bannerImg && (
                <Image 
                  source={{ uri: item.bannerImg }}
                  style={styles.serviceImage}
                  resizeMode="cover"
                />
              )}
              <View style={styles.serviceInfoContainer}>
                <Text style={styles.serviceTitle}>{item.title}</Text>
                {item.description && (
                  <Text style={styles.serviceDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                )}
                <View style={styles.serviceMeta}>
                  <Text style={styles.servicePrice}>
                    {formatCurrency(item.price)}
                  </Text>
                  <Text style={styles.serviceDuration}>
                    {formatDuration(item.duration)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => openAgendamento(item)}>
                <Text style={styles.bookButtonText}>Agendar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Agendar {selectedServico?.title}
            </Text>

            <Text style={styles.sectionTitle}>Selecione a data:</Text>
            <FlatList
              horizontal
              data={disponibilidades}
              keyExtractor={(item) => item.date}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.dateButton,
                    selectedDate === item.date && styles.selectedDateButton,
                  ]}
                  onPress={() => {
                    setSelectedDate(item.date);
                    setSelectedTime(null);
                  }}>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === item.date && styles.selectedDateText,
                    ]}>
                    {formatDate(item.date)}
                  </Text>
                </Pressable>
              )}
              contentContainerStyle={styles.datesContainer}
            />

            {selectedDate && (
              <>
                <Text style={styles.sectionTitle}>Horários disponíveis:</Text>
                <View style={styles.timesContainer}>
                  {disponibilidades
                    .find((d) => d.date === selectedDate)
                    ?.times.map((time) => (
                      <Pressable
                        key={time}
                        style={[
                          styles.timeButton,
                          selectedTime === time && styles.selectedTimeButton,
                        ]}
                        onPress={() => setSelectedTime(time)}>
                        <Text
                          style={[
                            styles.timeText,
                            selectedTime === time && styles.selectedTimeText,
                          ]}>
                          {time}
                        </Text>
                      </Pressable>
                    ))}
                </View>
              </>
            )}

            <View style={styles.modalFooter}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Voltar</Text>
              </Pressable>
              
              <Pressable
                style={[
                  styles.confirmButton,
                  (!selectedDate || !selectedTime) && styles.disabledButton,
                ]}
                onPress={handleConfirm}
                disabled={!selectedDate || !selectedTime}>
                <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
              </Pressable>
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
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceInfoContainer: {
    padding: 16,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FC8200',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#FC8200',
    padding: 14,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  datesContainer: {
    paddingBottom: 8,
  },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    minWidth: 120,
  },
  selectedDateButton: {
    backgroundColor: '#005A93',
  },
  dateText: {
    textAlign: 'center',
    color: '#333',
  },
  selectedDateText: {
    color: 'white',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  timeButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    margin: 4,
    minWidth: 80,
  },
  selectedTimeButton: {
    backgroundColor: '#005A93',
  },
  timeText: {
    textAlign: 'center',
    color: '#333',
  },
  selectedTimeText: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FC8200',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
});
