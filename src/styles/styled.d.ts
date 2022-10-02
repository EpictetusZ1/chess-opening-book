import {} from 'styled-components';
import { ITheme } from "../types/Main.types";

declare module 'styled-components' {
    export interface DefaultTheme extends ITheme {} // extends the global DefaultTheme with our ThemeType.
}
