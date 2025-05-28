import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
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

export function ServicosContent({ servicos }: ServicosContentProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const openAgendamento = (servico: Servico) => {
    setSelectedServico(servico);
    setModalVisible(true);
  };

  const onChangeDateTime = (_: any, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  const showPicker = (pickerMode: 'date' | 'time') => {
    setMode(pickerMode);
    setShowDatePicker(true);
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
              <Text style={styles.modalButtonText}>Selecionar Dia</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showPicker('time')} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Selecionar Horário</Text>
            </TouchableOpacity>

            <Text style={styles.selectedInfo}>
              Data: {date.toLocaleDateString()} às {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            <Pressable style={styles.confirmButton} onPress={() => setModalVisible(false)}>
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
          value={date}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChangeDateTime}
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
});
