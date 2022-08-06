import type {AppProps} from 'next/app'
import {GlobalStyle} from "../styles/GlobalStyle";
import {ThemeProvider} from "styled-components";
import {mainTheme} from "../styles/MainTheme";
import {SessionProvider} from "next-auth/react";
import { SideNav } from "../components/SideNav/SideNav";


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={mainTheme}>
                <GlobalStyle />
                <SideNav />
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    )
}

export default MyApp
