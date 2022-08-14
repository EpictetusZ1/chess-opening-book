import type {AppProps} from 'next/app'
import {GlobalStyle} from "../styles/GlobalStyle";
import {ThemeProvider} from "styled-components";
import { DefaultHighVis } from "../styles/Theme";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "../components/NavBar/NavBar";


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={DefaultHighVis}>
                <GlobalStyle />
                <NavBar />
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    )
}

export default MyApp