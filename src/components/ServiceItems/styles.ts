import { StyleSheet } from 'react-native';

const FONT_FAMILY = 'System';
const BASE_FONT_SIZE = 14;
const SMALL_FONT_SIZE = 12;
const TITLE_FONT_SIZE = 16;
const HEADER_FONT_SIZE = 18;

export const styles = StyleSheet.create({
  itemsContainer: {
    borderWidth: 0.3,
    borderColor: '#000000',
    borderRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  itemsHeader: {
    backgroundColor: '#FC8200',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  itemsHeaderText: {
    fontFamily: FONT_FAMILY,
    fontWeight: '800',
    fontSize: TITLE_FONT_SIZE,
    lineHeight: TITLE_FONT_SIZE * 1.2,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  itemDetails: {
    backgroundColor: '#FFE092',
    padding: 12,
    marginBottom: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  itemName: {
    fontFamily: FONT_FAMILY,
    fontWeight: '700',
    fontSize: BASE_FONT_SIZE,
    lineHeight: BASE_FONT_SIZE * 1.2,
    color: '#000000',
  },
  itemDate: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: SMALL_FONT_SIZE,
    lineHeight: SMALL_FONT_SIZE * 1.2,
    color: '#000000',
  },
  itemTime: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: BASE_FONT_SIZE,
    lineHeight: BASE_FONT_SIZE * 1.2,
    color: '#000000',
  },
  itemPrice: {
    fontFamily: FONT_FAMILY,
    fontWeight: '700',
    fontSize: BASE_FONT_SIZE,
    lineHeight: BASE_FONT_SIZE * 1.2,
    color: '#000000',
  },
  professionalText: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: SMALL_FONT_SIZE,
    lineHeight: SMALL_FONT_SIZE * 1.2,
    color: '#000000',
    marginTop: 8,
  },
  serviceBanner: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: HEADER_FONT_SIZE,
    fontWeight: '700',
    lineHeight: HEADER_FONT_SIZE * 1.3,
    marginBottom: 8,
    color: '#000000',
  },
  itemDescription: {
    fontFamily: FONT_FAMILY,
    fontSize: BASE_FONT_SIZE,
    lineHeight: BASE_FONT_SIZE * 1.4,
    color: '#666',
    marginBottom: 12,
    fontWeight: '400',
  },
  itemDuration: {
    fontFamily: FONT_FAMILY,
    fontSize: SMALL_FONT_SIZE,
    lineHeight: SMALL_FONT_SIZE * 1.2,
    color: '#555',
    fontWeight: '500',
  },
});