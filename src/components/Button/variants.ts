export const buttonFontVariants = {
  AfacadRegular32: {
    fontFamily: 'Afacad-Regular',
    fontSize: 32,
  },
  AfacadRegular20: {
    fontFamily: 'Afacad-Regular',
    fontSize: 20,
  },
};

export const buttonSizeVariants = {
  medium: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  large: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  xLarge: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  smallPill: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
};

export const buttonColorVariants = {
  primary: {
    backgroundColor: '#005A93',
    color: '#FFFFFF',
    hover: {
      backgroundColor: '#FC8200',
      color: '#FFFFFF',
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  secondary: {
    backgroundColor: '#FC8200',
    color: '#FFFFFF',
    hover: {
      backgroundColor: '#005A93',
      color: '#FFFFFF',
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  primaryWhite: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    hover: {
      backgroundColor: '#FC8200',
      color: '#000000',
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
};

export type ButtonFontVariantsType = typeof buttonFontVariants;
export type ButtonColorVariantsType = typeof buttonColorVariants;
export type ButtonSizeVariantsType = typeof buttonSizeVariants;
export type ButtonFontVariantsKeys = keyof ButtonFontVariantsType;
export type ButtonColorVariantsKeys = keyof ButtonColorVariantsType;
export type ButtonSizeVariantsKeys = keyof ButtonSizeVariantsType;
