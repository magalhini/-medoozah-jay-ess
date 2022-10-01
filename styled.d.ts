import "styled-components";

type Sizes = {
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: string;
      highlight: string;
      light: string;
      accent: string;
      medium: string;
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
}
