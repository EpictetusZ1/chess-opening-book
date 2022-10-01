import * as S from "./ThemeSwitcher.styles"
import {DefaultDark, DefaultLight} from "../../../styles/Theme";
import { DefaultTheme } from "styled-components";
import Image from "next/image";
import a11YSettingsIcon from "/public/icons/a11ySettingsIcon.svg";
import closeIcon from "/public/icons/closeIcon.svg"
import paletteIcon from "/public/icons/paletteIcon.svg"
import {ReactNode, useState} from "react";

type TProps = {
    setTheme: (theme: DefaultTheme) => void
}

// TODO: Remember, theme switching might be computationally expensive,
// so I should only do it on "SAVE" click of this modal.

const ThemeSwitcher = ({setTheme}: TProps) => {
    const initThemePreferences = {
        colorTheme: "DEFAULT_DARK"
    }

    const [themePreferences, setThemePreferences] = useState(initThemePreferences)
    const [showThemeSwitcher, setShowThemeSwitcher] = useState<boolean>(false)
    // TODO: Define the normal init theme state, then later add a function to
    // check if the user has a stored theme preference
    // Every prefGroup should have a header, and a small description below it explaining the option

    type TPrefGroupProps = {
        header: string
        description: string
        icon: any
        children: ReactNode
    }

    const PrefGroup = ({header, description, icon, children}: TPrefGroupProps) => {
        return (
            <S.PrefGroup>
                <p className={"prefHeader"}>{header}</p>
                <p className={"prefDesc"}>{description}</p>
                {children}
            </S.PrefGroup>
        )
    }

    const ColorThemePref = () => {
        return (
            <>
                <input type="radio"
                       id="defaultDark"
                       name="theme"
                       value="DEFAULT_DARK"
                       checked={themePreferences.colorTheme === "DEFAULT_DARK"}
                       onChange={(e) => setThemePreferences({
                           ...themePreferences,
                           colorTheme: e.target.value
                       })}
                />
                <label htmlFor="defaultDark">Default Dark</label>

                <input type="radio"
                       id="light"
                       name="theme"
                       value="LIGHT"
                       checked={themePreferences.colorTheme === "LIGHT"}
                       onChange={(e) => setThemePreferences({
                           ...themePreferences,
                           colorTheme: e.target.value
                       })}
                />
                <label htmlFor="light">Light</label>
            </>

        )
    }


    const ThemeController = () => {
        return (
            <S.ThemeControllerContainer>
                <S.ThemeController>
                    <div className="btnContainer">
                        <button className={"closeThemeSwitcher"}
                                onClick={() => setShowThemeSwitcher(false)}
                        >
                            <Image src={closeIcon} alt="Close theme switcher"/>
                        </button>
                    </div>

                    <h2>Customize your accessibility settings</h2>

                    <PrefGroup header={"Color Palette"}
                               description={"Choose a color palette that helps you see better"}
                               icon={paletteIcon}
                    >
                        {<ColorThemePref />}
                    </PrefGroup>


                </S.ThemeController>
            </S.ThemeControllerContainer>
        )
    }



    return (
        <S.ThemeSwitcherBtn>
            { showThemeSwitcher ?
                <ThemeController />
                :
                <div className={"a11yBtnContainer"}>
                    <S.OpenBtn>
                        <Image
                            alt={"accessibility options"}
                            src={a11YSettingsIcon}
                            layout={"responsive"}
                            width={95}
                            height={95}
                            onClick={() => setShowThemeSwitcher(true)}
                        />
                    </S.OpenBtn>
                </div>
            }
        </S.ThemeSwitcherBtn>
    );
};

export default ThemeSwitcher;