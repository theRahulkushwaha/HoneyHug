export const colors = {
  // Primary brand palette
  honey: '#F6B93B',
  honeyDark: '#DF9E1F',
  cocoa: '#6B4226',
  cocoaLight: '#A57451',
  cream: '#FFF4E0',
  blush: '#FF8FA3',
  moss: '#8DB580',
  night: '#2B2D52',

  // UI utility tones
  white: '#FFFFFF',
  cardBackground: '#FFFFFF',
  inputBorder: '#E6D7C3',
  inputBorderFocus: '#FF8FA3',
  error: '#E57373',
  textSecondary: '#8A6A52',
  overlay: 'rgba(107, 66, 38, 0.4)',

  // Bear Fur Tints
  fur: {
    chestnut: '#A0633B',
    caramel: '#D49B6A',
    polar: '#F2E8DC',
    espresso: '#4A3528',
  },
} as const;

export type ColorToken = keyof typeof colors;
