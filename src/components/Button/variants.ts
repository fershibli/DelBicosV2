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
  AfacadSemiBold14: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 14,
  },
  AfacadBold16: {
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  }
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
  default: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
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
  modalButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
};

export const buttonColorVariants = {
  primary: {
    backgroundColor: colors.primaryBlue,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryGreen,
      color: colors.primaryWhiteHover,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
    primaryBlue: {
    backgroundColor: 'transparent',
    color: colors.primaryBlue,
    hover: {
      backgroundColor: colors.primaryWhiteHover,
      color: colors.primaryBlue,
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
  primaryOrange: {
    backgroundColor: colors.primaryOrange,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryOrangeHover,
      color: colors.primaryWhiteHover,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  primaryWhite: {
    backgroundColor: 'transparent',
    color: colors.primaryBlue,
    hover: {
      backgroundColor: colors.primaryWhiteHover,
      color: colors.primaryBlue,
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
  modalPrimary: {
    backgroundColor: colors.primaryOrange,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: '#ca6f00ff',
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: '#CCCCCC',
      color: '#A9A9A9',
    },
  },
};

export type ButtonFontVariantsKeys = keyof typeof buttonFontVariants;
export type ButtonColorVariantsKeys = keyof typeof buttonColorVariants;
export type ButtonSizeVariantsKeys = keyof typeof buttonSizeVariants;