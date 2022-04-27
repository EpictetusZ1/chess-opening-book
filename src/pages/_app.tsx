import type { AppProps } from 'next/app'
import {GlobalStyle} from "../styles/GlobalStyle";
import {ThemeProvider} from "styled-components";
import {mainTheme} from "../styles/MainTheme";


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <ThemeProvider theme={mainTheme}>
              <GlobalStyle />
              <Component {...pageProps} />
          </ThemeProvider>
      </>
  )
}

export default MyApp
