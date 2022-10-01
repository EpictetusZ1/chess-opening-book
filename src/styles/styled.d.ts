import {} from 'styled-components';
import { IA11yContext } from "../types/Main.types";

declare module 'styled-components' {
    export interface DefaultTheme extends IA11yContext {} // extends the global DefaultTheme with our ThemeType.
}
