type Sizes = {
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
};

export interface DefaultTheme {
  colors: {
    text: string;
    highlight: string;
    light: string;
    accent: string;
    medium: string;
  };
  breakpoints: {
    small: string;
    medium: string;
    large: string;
  };
  spacing: {
    [key in keyof Sizes]: string;
  };
  borders: {
    faint: string;
  };
  fontSizes: {
    xs: string;
    s: string;
    m: string;
    l: string;
  };
}
