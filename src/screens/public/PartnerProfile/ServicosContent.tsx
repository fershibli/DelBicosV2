import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
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
  data: string;
  horarios: string[];
};

type ServicosContentProps = {
  servicos: Servico[];
  disponibilidades: Disponibilidade[];
};

export function ServicosContent({
  servicos,
  disponibilidades,
}: ServicosContentProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const openAgendamento = (servico: Servico) => {
    setSelectedServico(servico);
    setSelectedDate(null);
    setSelectedTime(null);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor, selecione uma data e horário');
      return;
    }

    alert(
      `Agendado: ${selectedServico?.nome}\nData: ${formatDate(selectedDate)}\nHorário: ${selectedTime}`,
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
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <View>
              <Text style={styles.serviceName}>{item.nome}</Text>
              <Text style={styles.serviceInfo}>
                {item.preco} • {item.duracao}
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Agendar {selectedServico?.nome}
            </Text>

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
                    setSelectedDate(day.data);
                    setSelectedTime(null);
                  }}>
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
                        onPress={() => setSelectedTime(time)}>
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

            <View style={styles.modalButtons}>
              <Pressable
                style={[
                  styles.confirmButton,
                  (!selectedDate || !selectedTime) && styles.disabledButton,
                ]}
                onPress={handleConfirm}
                disabled={!selectedDate || !selectedTime}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
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
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  serviceInfo: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#FC8200',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  datesContainer: {
    marginBottom: 20,
  },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  selectedDateButton: {
    backgroundColor: '#005A93',
  },
  dateText: {
    textAlign: 'center',
    color: '#333',
  },
  selectedDateText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  timeButton: {
    width: 80,
    padding: 10,
    margin: 4,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedTimeButton: {
    backgroundColor: '#005A93',
  },
  timeText: {
    color: '#333',
  },
  selectedTimeText: {
    color: 'white',
    fontWeight: '600',
  },
  modalButtons: {
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#FC8200',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  cancelButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#666',
  },
});
