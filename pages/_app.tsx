import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/Global";
import { theme } from "../styles/theme";
import ErrorBoundary from "../components/Error/ErrorBoundary";

// To do: Add a <StoreProvider> that will keep some global configuration settings to be consumed everywhere
// e.g., the region/currency to be used and displayed by the Product Page (and eventually, Cart, and so on)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ErrorBoundary
          // This is obviously a terrible error boundary
          FallbackComponent={<div>Something bad has happened!</div>}
        >
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}
