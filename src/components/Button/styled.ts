import { Button, styled } from '@mui/material';

interface ButtonProps {
  defaultColors: {
    backgroundColor: string;
    color: string;
  };
  defaultSize: {
    borderRadius: number;
    paddingVertical: number;
    paddingHorizontal: number;
    fontSize: number;
  };
  hoverColors?: {
    backgroundColor: string;
    color: string;
  };
  disabledColors?: {
    backgroundColor: string;
    color: string;
  };
}

export const Styled = {
  Button: styled(Button)<ButtonProps>(
    ({ defaultColors, defaultSize, hoverColors, disabledColors }) => ({
      backgroundColor: defaultColors.backgroundColor,
      color: defaultColors.color,
      borderRadius: defaultSize.borderRadius,
      padding: `${defaultSize.paddingVertical}px ${defaultSize.paddingHorizontal}px`,
      fontSize: defaultSize.fontSize,
      textTransform: 'none',
      '&:hover': {
        backgroundColor:
          hoverColors?.backgroundColor || defaultColors.backgroundColor,
        color: hoverColors?.color || defaultColors.color,
      },
      '&:disabled': {
        backgroundColor:
          disabledColors?.backgroundColor || defaultColors.backgroundColor,
        color: disabledColors?.color || defaultColors.color,
      },
    }),
  ),
};
