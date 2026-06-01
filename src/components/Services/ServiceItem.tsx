import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { formatBRL } from '@lib/helpers/formatCurrency';

type Props = {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
};

const ServiceItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        {item.date && <Text style={styles.meta}>Data: {item.date}</Text>}
        {item.price_cents ? (
          <Text style={styles.meta}>
            Preço: {formatBRL({ price_cents: item.price_cents })}
          </Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Text style={styles.actionEdit}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={styles.actionDelete}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceItem;
