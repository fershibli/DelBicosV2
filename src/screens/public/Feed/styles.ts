import colors from '@theme/colors';
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 10,
  },
  testButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.2)`,
      },
    }),
  },
  testButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  listSection: {
    marginBottom: 24,
  },
  carouselSection: {
    marginBottom: 24,
    position: 'relative',
  },
  carouselContainer: {
    width: '100%',
  },
  carouselListContainer: {
    paddingHorizontal: 0,
  },
  scrollButton: {
    position: 'absolute',
    top: 250 / 2 - 20,
    transform: 'translateY(-20px)',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    cursor: 'pointer',
  },
  scrollButtonLeft: {
    left: 24,
  },
  scrollButtonRight: {
    right: 24,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primaryWhite,
  },
});
