import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.primaryWhite,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: colors.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 220, // Altura mínima do card
  },
  // --- Coluna Esquerda: Detalhes ---
  detailsContainer: {
    flex: 2.5, // Ocupa mais espaço
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 20,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryOrange,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Afacad-SemiBold',
    color: '#333',
  },
  ratingCount: {
    fontSize: 12,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
    marginLeft: 4,
  },

  // Horários
  timesContainer: {
    marginTop: 12,
  },
  timesTitle: {
    fontSize: 13,
    fontFamily: 'Afacad-SemiBold',
    color: colors.primaryBlue,
    marginBottom: 4,
  },
  timesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  timeSlot: {
    backgroundColor: colors.primaryWhite,
    borderWidth: 1,
    borderColor: colors.secondaryBeige,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  timeSlotActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Afacad-Regular',
    color: colors.primaryOrange,
  },
  timeTextActive: {
    color: colors.primaryWhite,
  },

  // Serviços Oferecidos
  servicesContainer: {
    marginTop: 12,
  },
  servicesTitle: {
    fontSize: 13,
    fontFamily: 'Afacad-SemiBold',
    color: '#6c757d',
    marginBottom: 4,
  },
  servicesText: {
    fontSize: 12,
    fontFamily: 'Afacad-Regular',
    color: '#333',
    lineHeight: 16,
  },

  // Rodapé do Card
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Afacad-Regular',
    color: colors.primaryBlue,
    flexShrink: 1,
  },
  profileButton: {
    backgroundColor: colors.primaryOrange,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  profileButtonText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
    fontSize: 12,
  },

  // --- Coluna Direita: Imagem e Tags ---
  imageContainer: {
    flex: 1.5, // Ocupa menos espaço
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  priceText: {
    color: colors.primaryWhite,
    fontSize: 14,
    fontFamily: 'Afacad-Bold',
  },
  tagRow: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  tagText: {
    color: colors.primaryWhite,
    fontSize: 11,
    fontFamily: 'Afacad-Regular',
  },
});
