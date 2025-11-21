import { ColorsType } from './types';

const darkColors: ColorsType = {
  // Tonalidade principal (azul) para elementos interativos
  primaryBlue: '#545454', // Azul mais vibrante

  // Laranja mantido para consistência com tema claro
  primaryOrange: '#FB923C', // Laranja vibrante

  // Texto principal no tema escuro deve ser claro
  primaryBlack: '#E2E8F0', // Texto principal (cinza bem claro)

  // Verde de destaque
  primaryGreen: '#34D399', // Verde esmeralda claro

  // Fundo principal do app no modo escuro
  primaryWhite: '#323232', // Fundo principal (cinza escuro)

  // Tons secundários para header/cards
  secondaryGray: '#545454', // Fundo header/navbar/cards (cinza médio)
  secondaryBeige: '#334155', // Elementos terciários

  // Hovers / estados
  primaryWhiteHover: '#1E293B', // Hover
  primaryOrangeHover: '#FB923C', // Hover laranja

  // Novas cores para hierarquia
  cardBackground: '#545454', // Cards destacados (usar mesmo tom do header/navbar)
  borderColor: '#334155', // Bordas sutis
  textSecondary: '#94A3B8', // Texto secundário
  textTertiary: '#64748B', // Texto terciário/placeholders
  backgroundElevated: '#334155', // Elementos elevados (modais, dropdowns)
};

export default darkColors;
