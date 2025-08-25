import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    flexShrink: 1,
    backgroundColor: '#FFFFFF',
    padding: 0,
    margin: 0,
  },
  navContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  navButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  divider: {
    height: 2,
    backgroundColor: '#000000',
  },
  logoImage: {
    width: 476,
    height: 145,
    marginTop: 24,
    marginLeft: 32,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 43,
  },
  locationLabel: {
    fontFamily: 'Afacad-Regular',
    fontSize: 18,
    color: '#000',
    marginBottom: 0,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  userName: {
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
    color: '#000',
  },
  blueBar: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 42,
    backgroundColor: '#005A93',
    width: '100%',
  },
  welcomeUser: {
    fontFamily: 'Afacad-Bold',
    fontSize: 22,
    color: '#fff',
  },
});
