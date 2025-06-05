import { StyleSheet } from 'react-native';
import Alata from '@expo-google-fonts/alata';
import { Button, styled } from '@mui/material';

const NavItem = styled(Button)({
  fontSize: '20px',
  color: '#000000',
  marginRight: '7%',
  marginVertical: '5px',
  textTransform: 'none',
  borderRadius: '20px',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#FC8200',
    color: '#fff',
  },
});

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 25,
  },
  topSection: {
    height: 170,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  logo: {
    width: '60%',
    maxWidth: 476,
    height: 145,
  },
  divider: {
    height: 2,
    backgroundColor: 'black',
    marginTop: 10,
  },
  navbar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '27%',
  },
  registerText: {
    fontSize: 20,
    color: '#000000',
    marginRight: 20,
  },
  loginButton: {
    backgroundColor: '#FC8200',
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  blueBar: {
    height: 41,
    backgroundColor: '#005A93',
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 24,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '5%',
  },
  locationLabel: {
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FC8200',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.69)',
  },
  locationText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 4,
  },
  arrowIcon: {
    marginTop: 2,
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  userName: {
    marginTop: 4,
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  }, 
});

export default NavItem;
