import * as S from "./ThemeSwitcher.styles"
import {DefaultDark, DefaultLight} from "../../../styles/Theme";
import { DefaultTheme } from "styled-components";
import Image from "next/image";
import a11yVisIcon from "/public/icons/a11yVis_01.svg";
import {useState} from "react";

type TProps = {
    setTheme: (theme: DefaultTheme) => void
}

const ThemeSwitcher = ({setTheme}: TProps) => {
    const [showThemeSwitcher, setShowThemeSwitcher] = useState<boolean>(false)

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


    const ThemeController = () => {
        return (
            <S.ThemeController>
                <div className="btnContainer">
                    <button className={"closeThemeSwitcher"}
                            onClick={() => setShowThemeSwitcher(false)}
                    >
                        X
                    </button>
                </div>
                <br/>
                <div className="inputGroup">
                    <input type="radio"
                           id="defaultDark"
                           name="theme"
                           value="DEFAULT_DARK"
                           onChange={(e) => toggleTheme(e.target.value)}
                    />

                    <label htmlFor="defaultDark">Default Dark</label>
                    <input type="radio"
                           id="light"
                           name="theme"
                           value="LIGHT"
                           onChange={(e) => toggleTheme(e.target.value)}
                    />
                    <label htmlFor="light">Light</label>

                </div>


            </S.ThemeController>
        )
    }

    return (
        <S.ThemeSwitcher>
            { showThemeSwitcher ?
                <ThemeController />
                :
                <div className={"a11yBtnContainer"}>
                    <S.OpenBtn>
                        <Image
                            alt={"accessibility options"}
                            src={a11yVisIcon}
                            layout={"responsive"}
                            width={95}
                            height={95}
                            onClick={() => setShowThemeSwitcher(true)}
                        />
                    </S.OpenBtn>
                </div>
            }
        </S.ThemeSwitcher>
    );
};

export default ThemeSwitcher;