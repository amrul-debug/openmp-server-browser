// A dynamic color system that supports both light and dark modes

interface ColorShades {
  [key: number]: string;
}

interface ColorSystem {
  primary: ColorShades;
  secondary: ColorShades;
  gray: ColorShades;
  success: ColorShades;
  warning: ColorShades;
  error: ColorShades;
  text: string;
  background: string;
  cardBackground: string;
  inputBackground: string;
  white: string;
  black: string;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Purple shades (primary)
const purple = {
  300: '#a594d8',
  400: '#8a77cc',
  500: '#7c6bbc',
  600: '#6a5aab',
  700: '#5a4c94',
  800: '#4a3d7c',
};

// Orange shades (secondary) 
const orange = {
  300: '#ffb399',
  400: '#ffa080',
  500: '#ff7f50',
  600: '#ff6636',
  700: '#ff4d1c',
  800: '#ff3300',
};

// Dark mode gray shades
const darkGray = {
  100: '#e6e6e6',
  200: '#cccccc',
  300: '#b3b3b3',
  400: '#999999',
  500: '#808080',
  600: '#666666',
  700: '#4d4d4d',
  800: '#333333',
  900: '#262626',
  950: '#1a1a1a',
};

// Light mode gray shades
const lightGray = {
  100: '#f2f2f2',
  200: '#e6e6e6',
  300: '#cccccc',
  400: '#b3b3b3', 
  500: '#999999',
  600: '#808080',
  700: '#666666',
  800: '#d9d9d9',
  900: '#f5f5f5',
  950: '#fafafa',
};

// Success colors
const success = {
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
};

// Warning colors
const warning = {
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
};

// Error colors
const error = {
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
};

const Colors: ColorSystem = {
  primary: purple,
  secondary: orange,
  gray: darkGray,
  success,
  warning,
  error,
  text: darkGray[100],
  background: '#1a1a1a',
  cardBackground: '#262626',
  inputBackground: '#333333',
  white: '#ffffff',
  black: '#000000',
  
  setTheme: (theme: 'light' | 'dark') => {
    if (theme === 'light') {
      Colors.gray = lightGray;
      Colors.text = '#262626';
      Colors.background = '#f5f5f5';
      Colors.cardBackground = '#ffffff';
      Colors.inputBackground = '#f2f2f2';
    } else {
      Colors.gray = darkGray;
      Colors.text = darkGray[100];
      Colors.background = '#1a1a1a';
      Colors.cardBackground = '#262626';
      Colors.inputBackground = '#333333';
    }
  }
};

export default Colors;