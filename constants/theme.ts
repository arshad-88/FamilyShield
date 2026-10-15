export const theme = {
  colors: {
    primary: '#9D72FF',
    secondary: '#201938',
    tertiary: '#181427',
    neutral: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#9D72FF',
    textPrimary: '#FFFFFF',
    textSecondary: '#181427',
    border: '#FFFFFF',
    accent: '#9D72FF',
    safe: '#22C55E',
    suspicious: '#F59E0B',
    scam: '#EF4444',
  },
  spacing: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    section: 32,
  },
  radii: {
    md: 16,
    lg: 25.6,
    xl: 40.8,
    xxl: 48,
    full: 9999,
  },
  typography: {
    display: {
      fontSize: 60,
      fontWeight: '400' as const,
      lineHeight: 60,
      letterSpacing: -1.5,
    },
    body: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
  },
};

/**
 * Get the color for a given verdict type.
 */
export function getVerdictColor(verdict: 'safe' | 'suspicious' | 'scam'): string {
  const map = {
    safe: theme.colors.safe,
    suspicious: theme.colors.suspicious,
    scam: theme.colors.scam,
  };
  return map[verdict];
}
