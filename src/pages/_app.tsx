import type { AppProps } from 'next/app'
import {GlobalStyle} from "../styles/GlobalStyle";
import {ThemeProvider} from "styled-components";
import {mainTheme} from "../styles/MainTheme";
import {SessionProvider} from "next-auth/react";


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <ThemeProvider theme={mainTheme}>
              <GlobalStyle />
              <SessionProvider>
                  <Component {...pageProps} />
              </SessionProvider>
          </ThemeProvider>
      </>
  )
}

export default MyApp
