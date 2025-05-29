import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

type Servico = {
  nome: string;
  preco: string;
  duracao: string;
};

type ServicosContentProps = {
  servicos: Servico[];
};

type HorarioDisponivel = {
  data: Date;
  horarios: string[];
};

const AGENDA_MOCK: HorarioDisponivel[] = [
  {
    data: new Date('2025-06-01'),
    horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    data: new Date('2025-06-02'),
    horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  }
];

export function ServicosContent({ servicos }: ServicosContentProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);

  const openAgendamento = (servico: Servico) => {
    setSelectedServico(servico);
    setSelectedDate(null);
    setSelectedHorario(null);
    setModalVisible(true);
  };

  const onChangeDateTime = (_: any, pickedDate?: Date) => {
    setShowDatePicker(false);
    if (pickedDate) {
      const dateNormalized = new Date(pickedDate);
      dateNormalized.setHours(0, 0, 0, 0);
      setSelectedDate(dateNormalized);
      setSelectedHorario(null); 
    }
  };

  const showPicker = (pickerMode: 'date' | 'time') => {
    setMode(pickerMode);
    setShowDatePicker(true);
  };

  const horariosDisponiveis = (): string[] => {
    if (!selectedDate) return [];
    const agendaDia = AGENDA_MOCK.find(a =>
      a.data.getFullYear() === selectedDate.getFullYear() &&
      a.data.getMonth() === selectedDate.getMonth() &&
      a.data.getDate() === selectedDate.getDate()
    );
    return agendaDia ? agendaDia.horarios : [];
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Serviços</Text>

      {servicos.length === 0 ? (
        <Text style={styles.sectionText}>Nenhum serviço disponível.</Text>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item, index) => `${item.nome}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.servicoItem}>
              <Text style={styles.nomeServico}>{item.nome}</Text>
              <Text style={styles.infoServico}>{item.preco} • {item.duracao}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => openAgendamento(item)}
              >
                <Text style={styles.buttonText}>Agendar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agendar: {selectedServico?.nome}</Text>
            <TouchableOpacity onPress={() => showPicker('date')} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {selectedDate ? `Data: ${selectedDate.toLocaleDateString()}` : 'Selecionar Dia'}
              </Text>
            </TouchableOpacity>
            {selectedDate && (
              <>
                <Text style={{ marginVertical: 8 }}>Horários disponíveis:</Text>
                <ScrollView horizontal style={{ maxHeight: 60, marginBottom: 10 }}>
                  {horariosDisponiveis().length === 0 && (
                    <Text>Nenhum horário disponível para essa data.</Text>
                  )}
                  {horariosDisponiveis().map(horario => (
                    <TouchableOpacity
                      key={horario}
                      onPress={() => setSelectedHorario(horario)}
                      style={[
                        styles.horarioButton,
                        selectedHorario === horario && styles.horarioButtonSelected
                      ]}
                    >
                      <Text
                        style={[
                          styles.horarioText,
                          selectedHorario === horario && styles.horarioTextSelected
                        ]}
                      >
                        {horario}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            {selectedHorario && (
              <Text style={styles.selectedInfo}>
                Selecionado: {selectedDate?.toLocaleDateString()} às {selectedHorario}
              </Text>
            )}

            <Pressable
              style={[styles.confirmButton, (!selectedDate || !selectedHorario) && { backgroundColor: '#ccc' }]}
              onPress={() => {
                if (selectedDate && selectedHorario) {
                  setModalVisible(false);
                  alert(`Agendamento confirmado:\n${selectedServico?.nome}\nData: ${selectedDate.toLocaleDateString()} ${selectedHorario}`);
                }
              }}
              disabled={!selectedDate || !selectedHorario}
            >
              <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChangeDateTime}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
  },
  servicoItem: {
    marginBottom: 20,
  },
  nomeServico: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  infoServico: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FC8200',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#EEE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  modalButtonText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  selectedInfo: {
    marginTop: 12,
    fontSize: 14,
    color: '#444',
  },
  confirmButton: {
    backgroundColor: '#FC8200',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  cancelText: {
    color: '#999',
    marginTop: 12,
  },
  horarioButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  horarioButtonSelected: {
    backgroundColor: '#FC8200',
  },
  horarioText: {
    color: '#333',
  },
  horarioTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
});
