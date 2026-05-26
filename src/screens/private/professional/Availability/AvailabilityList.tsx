import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AvailabilityList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Availability list (placeholder)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AvailabilityList;
