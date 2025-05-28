import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>DelBicos Home Screen</Text>
      <Text>{"Open up 'src/App.tsx' to start working on your app!"}</Text>
      <Button
      //screen="replace-me"
      >
        Go to ???
      </Button>
      <Button
      //</View>screen="replace-me"
      >
        Go to ??
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
