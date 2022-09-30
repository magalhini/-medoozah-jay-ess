import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/Global";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
