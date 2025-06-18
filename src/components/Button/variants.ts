export const buttonSizeVariants = {
  medium: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 10,
  },
  large: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  xLarge: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
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

export type ButtonColorVariantsType = typeof buttonColorVariants;
export type ButtonSizeVariantsType = typeof buttonSizeVariants;
export type ButtonColorVariantsKeys = keyof ButtonColorVariantsType;
export type ButtonSizeVariantsKeys = keyof ButtonSizeVariantsType;
