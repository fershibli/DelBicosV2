import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function PartnerProfile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://www.shutterstock.com/image-photo/haircut-by-hairdresser-barbershop-barber-600nw-2484467169.jpg' }}
        style={styles.headerImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jefferson Santos</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>4,6 (13 avaliações)</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6F0',
  },
  headerImage: {
    height: 174,
    width: '100%',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 12,
    padding: 4,
  },
  profileInfo: {
    marginBottom: 8,
  },
  profileName: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  addressText: {
    fontSize: 11,
    fontWeight: '300',
    flexShrink: 1,
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    fontSize: 17,
    color: '#000',
  },
  activeTab: {
    color: '#FC8200',
    fontWeight: 'bold',
  },
});