import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useColors } from '@theme/ThemeProvider';
import { Button } from '@components/ui/Button';
import { ThemeToggle } from '@components/ui/ThemeToggle';
import { NavigationParams } from '@screens/types';

export const UnauthenticatedProfileView: React.FC = () => {
  const colors = useColors();
  const navigation = useNavigation();

  const handleNavigate = (screen: keyof NavigationParams) => {
    // @ts-ignore
    navigation.navigate(screen);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.cardBackground,
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    // Top Auth Card Component
    authCard: {
      backgroundColor: colors.primaryOrange,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      marginBottom: 24,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        android: { elevation: 6 },
        web: { boxShadow: '0px 4px 12px rgba(230, 81, 0, 0.25)' },
      }),
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    authTitle: {
      fontSize: 22,
      fontFamily: 'Afacad-Bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 8,
    },
    authSubtitle: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: '#FFFFFF',
      textAlign: 'center',
      opacity: 0.9,
      marginBottom: 20,
      lineHeight: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      width: '100%',
      justifyContent: 'center',
    },
    btnWrapper: {
      flex: 1,
    },

    // Options Section
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 12,
      marginTop: 8,
    },
    optionsCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
      overflow: 'hidden',
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
    },
    optionIcon: {
      width: 24,
      textAlign: 'center',
      marginRight: 16,
    },
    optionText: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Top Banner CTA Component */}
      <View style={styles.authCard}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user-circle" size={36} color="#FFFFFF" />
        </View>
        <Text style={styles.authTitle}>Acesse sua conta</Text>
        <Text style={styles.authSubtitle}>
          Faça login ou cadastre-se para solicitar serviços, acompanhar seus
          agendamentos e gerenciar seus dados no DelBicos.
        </Text>
        <View style={styles.buttonRow}>
          <View style={styles.btnWrapper}>
            <Button
              colorVariant="secondary"
              sizeVariant="default"
              fontVariant="AfacadBold16"
              onPress={() => handleNavigate('Login')}>
              Entrar
            </Button>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              colorVariant="secondary"
              variant="outlined"
              sizeVariant="default"
              fontVariant="AfacadBold16"
              onPress={() => handleNavigate('Register')}>
              Cadastrar
            </Button>
          </View>
        </View>
      </View>

      {/* Options Menu */}
      <Text style={styles.sectionTitle}>Mais Opções</Text>
      <View style={styles.optionsCard}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handleNavigate('Category')}
          activeOpacity={0.7}>
          <FontAwesome
            name="th-large"
            size={18}
            color={colors.primaryOrange}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Explorar Categorias</Text>
          <FontAwesome
            name="chevron-right"
            size={14}
            color={colors.textTertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handleNavigate('Help')}
          activeOpacity={0.7}>
          <FontAwesome
            name="question-circle-o"
            size={18}
            color={colors.primaryOrange}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Central de Ajuda (FAQ)</Text>
          <FontAwesome
            name="chevron-right"
            size={14}
            color={colors.textTertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handleNavigate('AboutUs')}
          activeOpacity={0.7}>
          <FontAwesome
            name="info-circle"
            size={18}
            color={colors.primaryOrange}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Sobre o DelBicos</Text>
          <FontAwesome
            name="chevron-right"
            size={14}
            color={colors.textTertiary}
          />
        </TouchableOpacity>

        <View style={[styles.optionItem, { borderBottomWidth: 0 }]}>
          <FontAwesome
            name="paint-brush"
            size={18}
            color={colors.primaryOrange}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Tema do Aplicativo</Text>
          <ThemeToggle />
        </View>
      </View>
    </ScrollView>
  );
};
