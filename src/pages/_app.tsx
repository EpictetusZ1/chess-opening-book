import type { AppProps } from 'next/app'
import { GlobalStyle } from "../styles/GlobalStyle";
import {  ThemeProvider} from "styled-components";
import {DefaultDark, TypographyNormal} from "../styles/Theme";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "../components/NavBar/NavBar";
import {useReducer} from "react";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher"
import {ITheme} from "../types/Main.types";
import {themeReducer} from "../Theme/themeReducer";

const initialState: ITheme = {
    colors: DefaultDark,
    typography: TypographyNormal,
    fontFamily: "Tahoma, sans-serif"
}

function App({ Component, pageProps }: AppProps) {
    const [theme, dispatch] = useReducer(themeReducer, initialState)

    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <ThemeSwitcher dispatch={dispatch} theme={theme} />
                <NavBar />
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    )
}

export default App