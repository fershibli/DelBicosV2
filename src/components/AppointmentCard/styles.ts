import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    boxShadow: '0px 2px 3.8px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  infoContainer: {
    flex: 2,
    paddingRight: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FC8200',
    marginBottom: 5,
  },
  categoryRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    color: '#005A93',
    marginRight: 10,
  },
  rating: {
    fontSize: 12,
    color: '#FFC107',
  },
  address: {
    fontSize: 10,
    color: '#005A93',
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 16,
    color: '#FC8200',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FC8200',
    padding: 5,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#005A93',
    borderRadius: 10,
    padding: 8,
    width: 120,
  },
  cancelButton: {
    backgroundColor: '#F30000',
    borderRadius: 10,
    padding: 8,
    width: 120,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  partnerImage: {
    width: 160,
    height: 200,
  },
  statusBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#005A93',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  profileButtonText: {
    color: '#DDE6F0',
    fontSize: 12,
  },
});

export default styles;