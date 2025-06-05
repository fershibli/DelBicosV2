import { StyleSheet } from 'react-native';

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
    flexWrap: 'wrap',
  },
  navItem: {
    fontSize: 20,
    color: '#000000',
    marginRight: 60,
    marginVertical: 5,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
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
  }
});
