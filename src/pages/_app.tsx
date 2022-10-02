import type { AppProps } from 'next/app'
import { GlobalStyle } from "../styles/GlobalStyle";
import { DefaultTheme, ThemeProvider} from "styled-components";
import { DefaultDark } from "../styles/Theme";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "../components/NavBar/NavBar";
import { useState } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";


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