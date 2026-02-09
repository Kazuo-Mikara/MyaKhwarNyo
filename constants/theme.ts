export const Palette = {
  pink: "#F5B8DB",
  green: "#CADBB7",
  blue: "#B6CAEB",
  yellow: "#F5D867",
  pale_yellow:"#EBD7B6",
};

export const Colors = {
  light: {
    text_primary: '#1A1A1A',
    text_secondary: '#5F5F5F',
    text_tertiary: Palette.blue, // Main colorful background
    text_overpic: "#FFFFFF",
    input_bg: "#F9FAFB",
    input_bg_1: "#9BA1A6",
    text_form: Palette.green,
    
    bg_primary: Palette.green,
    bg_secondary: Palette.pale_yellow,
    form_text: Palette.green,
    bg_muted: "#F1F5F9",
    icon: Palette.green,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.green,
  },
  dark: {
    text_primary: '#F2F4F7',
    text_secondary: '#9BA1A6',
    text_tertiary: "#1E293B", // Deep Navy/Blue background for dark mode discovery
    text_overpic: "#1E2228",
    input_bg: "#1E2228",
    input_bg_1: "#2D333B",
    text_form: Palette.pink,
    
    bg_primary: Palette.green,
    bg_secondary: Palette.yellow,
    form_text: Palette.green,
    bg_muted: "#0F172A",
    icon: Palette.green,
    tabIconDefault: '#4B5563',
    tabIconSelected: Palette.green,

    // Old keys for downward compatibility
    primary: Palette.green,
    secondary: Palette.blue,
    background: '#0F1113',
  },
};
