import { ColorsType } from '@theme/types';

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
  },
};

export const buttonSizeVariants = {
  medium: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  large: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  xLarge: {
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  default: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  smallPill: {
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  largePill: {
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
};

export const createButtonColorVariants = (colors: ColorsType) => ({
  primary: {
    backgroundColor: colors.primaryBlue,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryOrange,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: colors.inputBackground,
      color: colors.textTertiary,
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
      backgroundColor: 'transparent',
      color: colors.textTertiary,
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
      backgroundColor: colors.inputBackground,
      color: colors.textTertiary,
    },
  },
  primaryOrange: {
    backgroundColor: colors.primaryOrange,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryOrangeHover,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: colors.inputBackground,
      color: colors.textTertiary,
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
      backgroundColor: 'transparent',
      color: colors.textTertiary,
    },
  },
  primaryGreen: {
    backgroundColor: colors.primaryGreen,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.successBackground,
      color: colors.primaryGreen,
    },
    disabled: {
      backgroundColor: colors.inputBackground,
      color: colors.textTertiary,
    },
  },
  modalPrimary: {
    backgroundColor: colors.primaryOrange,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryOrangeHover,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: colors.inputBackground,
      color: colors.textTertiary,
    },
  },
});

export type ButtonFontVariantsKeys = keyof typeof buttonFontVariants;
export type ButtonColorVariantsKeys = keyof ReturnType<
  typeof createButtonColorVariants
>;
export type ButtonSizeVariantsKeys = keyof typeof buttonSizeVariants;
