import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import AppTopBar from "../components/app-bar";
import { UserContextProvider } from "../context/userContext";
import { theme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Social Coding Experience</title>
        </Head>
        <Component {...pageProps} />
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
