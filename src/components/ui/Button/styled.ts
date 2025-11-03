import { Button, styled } from '@mui/material';

interface ButtonProps {
  defaultColors: {
    backgroundColor: string;
    color: string;
  };
  defaultFont: {
    fontSize: number;
    fontFamily: string;
  };
  defaultSize: {
    borderRadius: number;
    paddingVertical: number;
    paddingHorizontal: number;
  };
  hoverColors?: {
    backgroundColor: string;
    color: string;
  };
  disabledColors?: {
    backgroundColor: string;
    color: string;
  };
  noWrap?: boolean;
}

const customProps = [
  'defaultColors',
  'defaultSize',
  'defaultFont',
  'hoverColors',
  'disabledColors',
  'noWrap',
];

export const Styled = {
  Button: styled(Button, {
    shouldForwardProp: (prop) => !customProps.includes(prop as string),
  })<ButtonProps>(
    ({
      defaultColors,
      defaultSize,
      defaultFont,
      hoverColors,
      disabledColors,
      noWrap,
    }) => ({
      backgroundColor: defaultColors.backgroundColor,
      color: defaultColors.color,
      borderRadius: defaultSize.borderRadius,
      padding: `${defaultSize.paddingVertical}px ${defaultSize.paddingHorizontal}px`,
      fontSize: defaultFont.fontSize,
      fontFamily: defaultFont.fontFamily,
      textTransform: 'none',
      whiteSpace: noWrap ? 'nowrap' : 'normal',
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
