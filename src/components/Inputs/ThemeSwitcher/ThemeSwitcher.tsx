import * as S from "./ThemeSwitcher.styles"
import {DefaultDark, DefaultLight} from "../../../styles/Theme";
import {DefaultTheme} from "styled-components";

type TProps = {
    setTheme: (theme: DefaultTheme) => void
}

const ThemeSwitcher = ({setTheme}: TProps) => {
    const toggleTheme = (newTheme: string) => {
        switch (newTheme) {
            default:
            case "DEFAULT_DARK":
                setTheme(DefaultDark)
                break;
            case "LIGHT":
                setTheme(DefaultLight)
                break;
        }
    }
    return (
        <S.ThemeSwitcher>

        </S.ThemeSwitcher>
    );
};

export default ThemeSwitcher;