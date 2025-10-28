import colors from '@theme/colors';

export const buttonFontVariants = {
  AfacadRegular32: {
    fontFamily: 'Afacad-Regular',
    fontSize: 32,
  },
  AfacadRegular20: {
    fontFamily: 'Afacad-Regular',
    fontSize: 20,
  },
  AfacadRegular15: {
    fontFamily: 'Afacad-Regular',
    fontSize: 15,
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
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  largePill: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
};

export const buttonColorVariants = {
  primary: {
    backgroundColor: colors.primaryBlue,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryOrange,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  secondary: {
    backgroundColor: colors.primaryOrange,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryBlue,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  primaryWhite: {
    backgroundColor: colors.primaryWhite,
    color: colors.primaryBlack,
    hover: {
      backgroundColor: colors.primaryOrange,
      color: colors.primaryBlack,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  primaryGreen: {
    backgroundColor: colors.primaryGreen,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryWhite,
      color: colors.primaryGreen,
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
