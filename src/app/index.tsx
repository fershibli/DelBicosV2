import { Text, View } from "react-native";
import styles from "../screens/public/ServicesStatus/styles"
import { TouchableOpacity} from "react-native-gesture-handler"
import ServiceStatusScreen from "../screens/public/ServicesStatus/ServiceStatusScreen ";

export default function Index() {
  return (
    <View style={styles.container}>
      <ServiceStatusScreen />
    </View>
  );
}
