import type { AppProps } from 'next/app'
import { GlobalStyle } from "../styles/GlobalStyle";
import { DefaultTheme, ThemeProvider} from "styled-components";
import { DefaultDark, TypographyNormal  } from "../styles/Theme";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "../components/NavBar/NavBar";
import { useState, useReducer } from "react";
import ThemeSwitcher from "../components/Inputs/ThemeSwitcher/ThemeSwitcher";
import {IA11yContext, ITypographyContext} from "../types/Main.types";



function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState<DefaultTheme>(DefaultDark)

    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <ThemeSwitcher setTheme={setTheme} />
                <NavBar />
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    )
}

export default MyApp