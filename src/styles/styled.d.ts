import {} from 'styled-components';
import { ThemeType, TypographyType } from './theme';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {} // extends the global DefaultTheme with our ThemeType.
}

declare module 'styled-components' {
    export interface DefaultTypography extends TypographyType {} // extends the global DefaultTheme with our TypographyType.
}